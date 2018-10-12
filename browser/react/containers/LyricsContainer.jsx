import React, {Component} from 'react';
import store from '../store';
import Lyrics from '../components/Lyrics';
import {setLyrics} from '../action-creators/lyrics';
import axios from 'axios';


export default class extends Component {
  constructor() {
    super();

    this.state = Object.assign({
      artistQuery: '',
      songQuery: ''
    }, store.getState());
    this.handleArtistInput = this.handleArtistInput.bind(this);
    this.handleSongInput = this.handleSongInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  handleArtistInput(artist) {
    this.setState({ artistQuery: artist });
  }
  handleSongInput(song) {
    this.setState({ songQuery: song });
  }

  handleSubmit(event) {
    event.preventDefault();
    // if (this.state.artistQuery && this.state.songQuery) {
      axios.get(`/api/lyrics/${this.state.artistQuery}/${this.state.songQuery}`)
        .then(response => store.dispatch(setLyrics(response.data.lyric)))
     
  }
  render() {
    return <Lyrics
      text={this.state.text}
      setArtist={this.handleArtistInput} // recibe las letras
      setSong={this.handleSongInput}
      artistQuery={this.state.artistQuery} // pasa la palabra
      songQuery={this.state.songQuery} 
      handleSubmit={this.handleSubmit}
    />
  }
}