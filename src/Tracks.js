import React, { Component } from 'react';
import './Tracks.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class Tracks extends Component {
    // CONSTRUCTOR
    constructor(props){
        super(props);
        this.state = {
            trackName: props.trackName,
            trackPlayCount: props.trackPlayCount,
            trackArtist: props.trackArtist,
            trackRanking: props.trackRanking,
        }
        this.numberWithCommas = this.numberWithCommas.bind(this)
    }

    //RENDER
    render() {
    return (
        <div className = "row" id = "tracks-div">
            <div className = "col-xl-1 col-lg-1 col-md-1" id = "ranking">{this.state.trackRanking}</div>
            <div className = "col-xl-11 col-lg-11 col-md-11">
                <p id = "track-name">{this.state.trackName}</p>
                <p id = "artist">{this.state.trackArtist}</p>
                <p id = "playcount">Track playcount: {this.numberWithCommas(this.state.trackPlayCount)}</p>
            </div>
        </div>
    );
    }
    //function to add commas to the playcount
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

export default Tracks;
