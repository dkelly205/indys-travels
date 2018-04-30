import React from "react";
import GoogleMapReact from "google-map-react";
import MapStyles from "../config/MapStyles";
import _ from "lodash";

class MapContainer extends React.Component {
	constructor(props){
		super(props);

		this.map = null;
		this.maps = null;

		this.state = {
			points: [],
			markers: [],
			lines: []
		};

		this.storeMaps = this.storeMaps.bind(this);
	}

	storeMaps({map, maps}){
		this.map = map;
		this.maps = maps;
	}

	componentDidUpdate(prevProps, prevState, snapshot){
		let point = this.props.point;
		if(point){
			if(!_.filter(this.state.points, {lat: point.lat, lng: point.lng}).length){
				this.setState({
					points: [...this.state.points, point]
				}, () => {
					this.renderPolylines();
				});
			}
		}else if(!point && this.state.markers.length){
			// clear the map
			for(let marker of this.state.markers){
				marker.setMap(null);
			}

			for(let line of this.state.lines){
				line.setMap(null);
			}

			this.setState({
				markers: [],
				lines: []
			});

			this.map.panTo(new this.maps.LatLng(0, 0));
			this.map.setZoom(4);
		}
	}

	renderPolylines(){
		let lineSymbol = {
			path: 'M 0,-1 0,1',
			strokeOpacity: 1,
			scale: 4
		};

		let line = new this.maps.Polyline({
			path: this.state.points,
			geodesic: true,
			strokeColor: '#ff0000',
			strokeOpacity: 0,
			icons: [{
				icon: lineSymbol,
				offset: '0',
				repeat: '20px'
			}]
		})
		
		line.setMap(this.map);

		this.setState({lines: [...this.state.lines, line]});

		let lastPoint = _.last(this.state.points);

		let infoWindow = new this.maps.InfoWindow({
			content: lastPoint.text
		});

		let marker = new this.maps.Marker({
			position: lastPoint,
			map: this.map
		});

		marker.addListener("click", (event) => {
			infoWindow.open(this.map, marker);
		});

		this.setState({markers: [...this.state.markers, marker]});

		this.map.panTo(lastPoint);
		this.maps.event.addListenerOnce(this.map, 'idle', () => {
			setTimeout(() => {
				this.map.setZoom(lastPoint.zoom);
			}, 250);
		});
	}

	render(){
		return (
			<div style={{height: "100vh", width: "100vw"}}>
				<GoogleMapReact
					center = {{lat: 0, lng: 0}}
					zoom = {4}
					options = {{styles: MapStyles}}
					onGoogleApiLoaded={this.storeMaps}
					yesIWantToUseGoogleMapApiInternals={true}
				/>
			</div>
		);
	}
}

export default MapContainer;
