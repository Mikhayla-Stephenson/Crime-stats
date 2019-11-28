import React from 'react';
import Select from 'react-select';

/**
 * Component to create the drop down Selection panel
 *  - child to TitleSpace
 */

class Selection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			multiChoice: []
		};
	}
	// Re-renders once these promises are fullfilled and populates the drop downs
	componentDidMount() {
		this.props.fetchInfo('offences', 'offencesList');
		this.props.fetchInfo('areas', 'lga');
		this.props.fetchInfo('ages', 'age');
		this.props.fetchInfo('genders', 'gender');
		this.props.fetchInfo('years', 'year');
	}

	render() {
		return (
			<div>
				<center>
					<h4>Filter Options</h4>

					<div className="selection">
						<Select
							options={this.props.offencesList}
							placeholder="* Select Offence"
							onChange={this.props.handleChange}
						/>
					</div>

					<div className="selection">
						<Select
							options={this.props.lga}
							placeholder="Select Location"
							isMulti
							onChange={this.props.LGASet}
							value={this.props.multiChoice}
						/>
					</div>
					<div className="selection">
						<Select
							options={this.props.age}
							isMulti
							placeholder="Select Ages"
							onChange={this.props.agesSet}
							value={this.props.multiAges}
						/>
					</div>
					<div className="selection">
						<Select
							options={this.props.gender}
							placeholder="Select Genders"
							isMulti
							onChange={this.props.gendersSet}
							value={this.props.multiGenders}
						/>
					</div>
					<div className="selection">
						<Select
							options={this.props.year}
							placeholder="Select Years"
							isMulti
							onChange={this.props.yearsSet}
							value={this.props.multiYears}
						/>
					</div>
				</center>
				<center>
					<button className="log-btn2" style={{ width: 'auto' }} onClick={this.props.updateData}>
						Update Table
					</button>
				</center>
			</div>
		);
	}
}
export default Selection;
