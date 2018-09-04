import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Moment from "react-moment";

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  };

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/${
          process.env.REACT_APP_MM_URL
        }/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        this.setState({ lyrics: res.data.message.body.lyrics });
        return axios.get(
          `https://cors-anywhere.herokuapp.com/${
            process.env.REACT_APP_MM_URL
          }/track.get?track_id=${this.props.match.params.id}&apikey=${
            process.env.REACT_APP_MM_KEY
          }`
        );
      })
      .then(res => {
        this.setState({ track: res.data.message.body.track });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { lyrics, track } = this.state;

    if (
      track === undefined ||
      lyrics === undefined ||
      track.primary_genres === undefined ||
      (track === Object.keys(track).length) === 0 ||
      (lyrics === Object.keys(lyrics).length) === 0 ||
      (track.primary_genres === Object.keys(track.primary_genres).length) === 0
    ) {
      return <Spinner />;
    } else {
      console.log(track.primary_genres);
      return (
        <Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go Back
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by {""}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>
          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album ID</strong>: {track.album_id}
            </li>
            <li className="list-group-item">
              <strong>Song Genre</strong>:{" "}
              {
                track.primary_genres.music_genre_list[0].music_genre
                  .music_genre_name
              }
            </li>
            <li className="list-group-item">
              <strong>Explicit Words</strong>:{" "}
              {track.explicit === 0 ? "No" : "Yes"}
            </li>
            <li className="list-group-item">
              <strong>Release Date</strong>:{" "}
              <Moment format="MM/DD/YYYY">{track.first_release_date}</Moment>
            </li>
          </ul>
        </Fragment>
      );
    }
  }
}

export default Lyrics;
