import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  };

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
      (track === Object.keys(track).length) === 0 ||
      (lyrics === Object.keys(lyrics).length) === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go Back
          </Link>
        </Fragment>
      );
    }
  }
}

export default Lyrics;
