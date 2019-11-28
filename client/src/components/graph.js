import React from 'react';
import { Bar } from 'react-chartjs-2';

/*
  Component to render Graph 
  -Child of mapGraph component
  @params
  title- Name of the selected offence
  areaArray - Array of area names 
  totalArray - Array of totals corresponding with area 
*/

class Graph extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		//Organise data to be used by Graph component
		let totalArray = this.props.totalArray;
		let areaArray = this.props.areaArray;
		let data = {
			labels: [ areaArray[0], areaArray[1], areaArray[2], areaArray[3], areaArray[4] ],
			datasets: [
				{
					label: this.props.title,
					backgroundColor: 'rgba(255,99,132,0.2)',
					borderColor: 'rgba(255,99,132,1)',
					borderWidth: 1,
					hoverBackgroundColor: 'rgba(255,99,132,0.4)',
					hoverBorderColor: 'rgba(255,99,132,1)',
					data: [ totalArray[0], totalArray[1], totalArray[2], totalArray[3], totalArray[4] ]
				}
			]
		};
		return (
			<div>
				<Bar
					data={data}
					width={100}
					height={430}
					options={{
						maintainAspectRatio: false
					}}
				/>
			</div>
		);
	}
}
export default Graph;
