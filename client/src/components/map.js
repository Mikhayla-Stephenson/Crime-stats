import React from 'react';
import { Map, CircleMarker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

/* 
  Component to render a bubble map
  - Child of MapGraph component
*/
class BubbleMap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	/*
    Function to dynamically create 'bubbles' for map.
    @params
    Locations - Array of objects containing 'total' and [lng,lat]
    Title- Name of the selected offence
    areaArray - Array of area names corresponding with [lng,lat]
  */
	createBubbles() {
		let scale = 500;
		let colors = [ 'red', 'aqua', 'yellow', 'green', 'blue' ];
		let bubbles = [];

		// Creates CircleMarker with PopUp and adds to bubbles array
		for (let j = 0; j < this.props.locations.length; j++) {
			bubbles.push(
				<div key={j}>
					{/* Creates bubbles with size scaled to offence totals */}
					<CircleMarker
						center={this.props.locations[j].value}
						radius={20 * Math.log(this.props.locations[j].total / scale)}
						fillOpacity={0.3}
						stroke={true}
						color={colors[j]}
						fillColor={colors[j]}
					>
						<CircleMarker
							center={this.props.locations[j].value}
							radius={4}
							fillOpacity={1}
							stroke={false}
							fillColor={colors[j]}
						/>
						{/* Organises Popup information */}
						<Popup>
							Offence:{this.props.title}
							<br />
							Total:{this.props.locations[j].total}
							<br />
							Area:{this.props.areaArray[j]}
						</Popup>
					</CircleMarker>
				</div>
			);
		}

		return bubbles;
	}

	render() {
		return (
			<div>
				{/* Creates a non-zoomable map containing array of bubbles */}
				<Map
					style={{ height: '425px', width: '100%' }}
					zoom={4.5}
					zoomControl={false}
					touchZoom={false}
					scrollWheelZoom={false}
					doubleClickZoom={false}
					closePopupOnClick={false}
					dragging={false}
					zoomSnap={false}
					zoomDelta={false}
					center={[ -20.917574, 145.702789 ]}
				>
					<TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png" />

					{this.createBubbles()}
				</Map>
			</div>
		);
	}
}
export default BubbleMap;
