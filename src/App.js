import React, { Component } from 'react';
import './App.css';
import Artists from './Artists';
import Tracks from './Tracks';
import 'bootstrap/dist/css/bootstrap.min.css';
//var apiKey = "ed5da9b66fbbb3d6781c2dec474a1eb9"

// comments for grader: i changed my API from spotify to last.fm because it felt more applicable to what i wanted accomplish

class App extends Component {

  // CONSTRUCTOR
  constructor(props){
    super(props);
    this.state = {
      url: "http://ws.audioscrobbler.com/2.0/", 
      topArtists:[], 
      artistsGrabbed: false, 
      topTracks: [],
      tracksGrabbed: false,
      currentList: "artists",
      list: <p>list</p>
    };
    this.switchToTracks = this.switchToTracks.bind(this);
    this.switchToArtists= this.switchToArtists.bind(this);

  }

  // RENDER
  render() {
    let self = this;

    //checking if data has been grabbed before trying to render
    if (self.state.topArtists.length === undefined){
      self.state.artistsGrabbed = true;

      //sorting by playcount to be more intuitive
      self.state.topArtists.artists.artist.sort(function (a, b) {
        return parseFloat(b.playcount) - parseFloat(a.playcount);
      });
    }
    if (self.state.topTracks.length === undefined){
      self.state.tracksGrabbed = true;

      //sorting by playcount to be more intuitive
      self.state.topTracks.tracks.track.sort(function (a, b) {
        return parseFloat(b.playcount) - parseFloat(a.playcount);
      });
    }

    //rendering artist list
    if(self.state.currentList === "artists"){
      if (document.getElementById("track-toggle") != null){
        document.getElementById("artist-toggle").classList.add("selected");
        document.getElementById("track-toggle").classList.remove("selected");
      }
     
      this.state.list = self.state.artistsGrabbed
      ? self.state.topArtists.artists.artist.map((anArtist, index) =>
        <Artists 
        key={anArtist.mbid}
        id={anArtist.mbid}
        artistName={anArtist.name}
        artistPlayCount={anArtist.playcount}
        artistRanking={index+1}
        />) 
      : <p>Top artists data being fetched.</p>
    }

    //render tracks list
    else if(this.state.currentList === "tracks"){
      if (document.getElementById("track-toggle") != null){
        document.getElementById("track-toggle").classList.add("selected");
        document.getElementById("artist-toggle").classList.remove("selected");
      }
      this.state.list = self.state.tracksGrabbed
      ? this.state.topTracks.tracks.track.map((aTrack, index) =>
        <Tracks 
        key={aTrack.name}
        id={aTrack.name}
        trackName={aTrack.name}
        trackPlayCount={aTrack.playcount}
        trackRanking={index+1}
        trackArtist={aTrack.artist.name}
        />)
      : <p>Top tracks data being fetched.</p>
    }

    //RETURN
    return (
      <div id = "main-container">
        <p id = "heading" className = "row justify-content-center">Last.fm Music Charts</p>
        <div id = "buttons-div" className = "row justify-content-center"> 
          <button className = "toggle-button col-md-2 col-4" id = "artist-toggle" onClick = { event => this.switchToArtists(event)}>Top Artists</button>
          <button className = "toggle-button col-md-2 col-4" id = "track-toggle" onClick = { event => this.switchToTracks(event)}>Top Tracks</button>  
        </div>
        <div id = "list" className = "row justify-content-center">
          {this.state.list}
        </div>
      </div>
    );
  }

  componentDidMount() {
    //GET request using fetch
    fetch('https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=ed5da9b66fbbb3d6781c2dec474a1eb9&format=json&limit=10')
      .then(response => response.json())
      .then(data => this.setState({ topArtists: data}));
    
      fetch('https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=ed5da9b66fbbb3d6781c2dec474a1eb9&format=json&limit=10')
      .then(response => response.json())
      .then(data => this.setState({ topTracks: data}));
  }

  //switching functions for toggling buttons 
  switchToTracks(){
    this.setState({currentList: "tracks"});
  }

  switchToArtists(){
    this.setState({currentList: "artists"});
  }

}
export default App;


