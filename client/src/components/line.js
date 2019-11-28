import React from 'react';
import { Line } from 'react-chartjs-2';

class LineGraph extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		//Organise data to be used by Graph component
		const data = {
			labels: [ 2014, 2015, 2016, 2017, 2018 ],
			datasets: [
				{
					backgroundColor: 'rgba(255,99,132,0.2)',
					borderColor: 'rgba(255,99,132,1)',
					borderWidth: 1,
					label: 'Brisbane: ' + this.props.title,
					data: this.props.yearOffences,
					fill: false // Don't fill area under the line
				}
			]
		};

		return (
			<div>
				<Line
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
export default LineGraph;
