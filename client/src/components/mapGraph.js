import React from 'react';
import Graph from './graph';
import BubbleMap from './map';
import LineGraph from './line';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

/**
 * Component to render Map and Graph components
  - Parent to BubbleMap and Graph components
  - child to TitleSpace
  
  title- Name of the selected offence
  areaArray - Array of area names 
  totalArray - Array of total
  Locations - Array of objects containing 'total' and [lng,lat]
 */

class MapGraph extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<Tabs>
					<TabList>
						<Tab>Bar</Tab>
						<Tab>Line</Tab>
						<Tab>Map</Tab>
					</TabList>
					<TabPanel>
						<Graph
							title={this.props.query}
							areaArray={this.props.areaArray}
							totalArray={this.props.totalArray}
						/>
					</TabPanel>
					<TabPanel>
						<LineGraph
							title={this.props.query}
							title={this.props.query}
							yearArray={this.props.yearsArray}
							yearOffences={this.props.yearOffences}
						/>
					</TabPanel>
					<TabPanel>
						<BubbleMap
							title={this.props.query}
							data={this.props.data}
							locations={this.props.locations}
							areaArray={this.props.areaArray}
							totalArray={this.props.totalArray}
						/>
					</TabPanel>
				</Tabs>
			</div>
		);
	}
}
export default MapGraph;
