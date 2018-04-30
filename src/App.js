import React, { Component } from 'react';
import './App.css';
import MapContainer from "./containers/MapContainer";
import JourneySelect from "./components/JourneySelect";
import Spotify from "./components/Spotify";
import {Raiders} from "./config/Locations";

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
			journeys: {
				"raiders": Raiders,
				"temple": [],
				"crusade": []
      },
      nextPointIndex: 0,
      nextPoint: null,
      selectedFilm: null
		};

    this.handleJourneySelect = this.handleJourneySelect.bind(this);
    this.triggerNextPoint = this.triggerNextPoint.bind(this);
    this.triggerReset = this.triggerReset.bind(this);
  }

  handleJourneySelect(journey){
		this.setState({selectedFilm: journey});
	}

  triggerNextPoint(){
    let nextPoint = this.state.journeys[this.state.selectedFilm][this.state.nextPointIndex];
    this.setState({
      nextPoint: nextPoint,
      nextPointIndex: this.state.nextPointIndex + 1
    });
  }

  triggerReset(){
    this.setState({
      nextPointIndex: 0,
      nextPoint: null,
      selectedFilm: null
    });
  }

  render() {
    return (
      <React.Fragment>
        <MapContainer point={this.state.nextPoint} />
        <JourneySelect
          select={this.handleJourneySelect}
          selectedFilm={this.state.selectedFilm}
          onNextButtonClicked={this.triggerNextPoint}
          onResetButtonClicked={this.triggerReset}
        />
        <Spotify />
      </React.Fragment>
    );
  }
}

export default App;
