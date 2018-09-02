import React, { Component, createContext } from "react";
import axios from "axios";

const Context = createContext();

export class Provider extends Component {
  state = {
    track_list: [
      { track: { track_name: "ABC" } },
      { track: { track_name: "EFG" } }
    ],
    heading: "Top 10 Tracks"
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/${
          process.env.REACT_APP_MM_URL
        }/chart.tracks.get?page=1&page_size=10&country=sl&f_has_lyrics=1&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        this.setState({ track_list: res.data.message.body.track_list });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
