import React, { Component } from 'react';
import './Artists.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Artists extends Component {
    // CONSTRUCTOR
    constructor(props){
        super(props);
        this.state = {
            artistName: props.artistName,
            artistPlayCount: props.artistPlayCount,
            artistRanking: props.artistRanking
        }
        this.numberWithCommas = this.numberWithCommas.bind(this)
    }
    
    //RENDER
    render() {
    return (
        <div className = "row" id = "artist-div">
            <div className = "col-xl-1 col-lg-1 col-md-1" id = "ranking">{this.state.artistRanking}</div>
            <div className = "col-xl-11 col-lg-11 col-md-11">
                <p id = "artist-name">{this.state.artistName}</p>
                <p id = "playcount">Artist playcount: {this.numberWithCommas(this.state.artistPlayCount)}</p>
            </div>
        </div>
    );
    }
    //function to add commas to the playcount number
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

export default Artists;
