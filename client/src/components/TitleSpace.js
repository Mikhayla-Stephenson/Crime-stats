import 'react-table/react-table.css';
import React from 'react';
import MapGraph from './mapGraph';
import Table from './table';
import Selection from './selection';
import OffenceTable from './offenceList';

/**
 *  - Component to handle majority of program data flow
 *  - Parent to MapGraph, Selection, OffenceList and Table components
 *  - Child to App
 */

class TitleSpace extends React.Component {
	constructor(props) {
		super(props);
		this.updateData = this.updateData.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.LGASet = this.LGASet.bind(this);
		this.agesSet = this.agesSet.bind(this);
		this.gendersSet = this.gendersSet.bind(this);
		this.yearsSet = this.yearsSet.bind(this);
		this.fetchInfo = this.fetchInfo.bind(this);

		this.state = {
			data: [],
			query: null,
			offenceSet: [],

			//Data arrays to fill drop downs
			offencesList: [],
			lga: [],
			age: [],
			gender: [],
			year: [],

			//To store multichoice urls
			multiLGA: null,
			multiAges: null,
			multiGenders: null,
			multiYears: null,

			// MapGraph data
			areaArray: [],
			totalArray: [],
			locations: [],

			// Line graph data
			yearOne: [],
			yearTwo: [],
			yearThree: [],
			yearFour: [],
			yearFive: [],
			yearsArray: [ '2018', '2017', '2016', '2015', '2014' ],
			yearOffences: []
		};
	}

	/**
   * Used to query the helper endpoints and populate Selection arrays
   * @param  query
   * @param property
   */

	fetchInfo(query, property) {
		//Creates url to fetch information
		// http://localhost:8000/
		let searchable = 'http://localhost:8000/' + query;
		fetch(searchable)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error('Network response was not ok.');
			})
			.then((result) => {
				let info = result;

				for (var unknown in info) {
					if (info.hasOwnProperty(unknown)) {
						var propValue = info[unknown];
					}
				}
				//Maps array into key:value pairs so they may be used in dropdown select
				info = propValue.map((opt) => ({ label: opt, value: opt }));
				this.setState({ [property]: info });
			})
			.catch((error) => {
				console.log('There has been a problem with your fetch operation: ');
			});
	}

	lineGraphInfo() {
		//Creates url to fetch information
		let getParam = { method: 'GET' };
		let head = { Authorization: `Bearer ${JWT}` };
		getParam.headers = head;
		// http://localhost:8000/search?
		const baseUrl = 'http://localhost:8000/search?';
		const query = 'offence=' + encodeURIComponent(myQuery);
		//url builders
		let array = [ '&year=2018', '&year=2017', '&year=2016', '&year=2015', '&year=2014' ];
		let property = [ 'yearOne', 'yearTwo', 'yearThree', 'yearFour', 'yearFive' ];
		for (let i = 0; i < 5; i++) {
			let searchable = baseUrl + query + array[i];
			console.log(searchable);
			fetch(searchable, getParam)
				.then((response) => {
					if (response.ok) {
						return response.json();
					}
					throw new Error('Network response was not ok.');
				})
				.then((response) => {
					for (let j = 0; j < response.result.length; j++) {
						if (response.result[j].LGA == 'Brisbane City Council') {
							this.setState({ [property[i]]: response.result[j] });
						}
					}
				})
				.catch((error) => {
					console.log('There has been a problem with your fetch operation: ', error.message);
				});
		}
	}

	/**
   * Updates and formats arrays to be used by MapGraph
   */
	updateLocations() {
		//Takes Search endpoint and creates arrays with <=5 elements
		let array = this.state.data.result;
		let locationsArray;
		let yearOffences = [
			this.state.yearFive.total,
			this.state.yearFour.total,
			this.state.yearThree.total,
			this.state.yearTwo.total,
			this.state.yearOne.total
		];

		// uses the size of result array to determine the number of locations
		//displayed on map.
		if (array.length > 5) {
			locationsArray = new Array(5);
		} else {
			locationsArray = new Array(array.length);
		}

		let namesArray = new Array(array.length);
		let totalsArray = new Array(array.length);

		//Populates arrays with relevant information
		for (let i = 0; i < locationsArray.length; i++) {
			let obj = array[i];
			locationsArray[i] = [ [ obj.lat, obj.lng ], obj.total ];
			namesArray[i] = [ obj.LGA ];
			totalsArray[i] = [ obj.total ];
		}
		//Maps Location array into an object
		locationsArray = locationsArray.map((opt) => ({
			total: opt[1],
			value: opt[0]
		}));

		this.setState({ yearOffences: yearOffences });
		this.setState({ locations: locationsArray });
		this.setState({ areaArray: namesArray });
		this.setState({ totalArray: totalsArray });
	}

	/**
   * Function to sort data
   */
	updateData() {
		search.result.sort((a, b) => parseFloat(b.total) - parseFloat(a.total));

		this.setState(
			{
				data: search
			},
			this.updateLocations
		);
	}

	/**
   * At the time of development the react-select multiselection
   * components has a bug that allows only one selection.
   * These functions are a hardcoded to fix this bug.
   */

	LGASet(multiValue) {
		let search = this.queryBuilder(multiValue, '&area=');
		this.setState({ multiLGA: search }, this.changeLogic);
	}

	agesSet(multiValue) {
		let search = this.queryBuilder(multiValue, '&age=');
		this.setState({ multiAges: search }, this.changeLogic);
	}
	gendersSet(multiValue) {
		let search = this.queryBuilder(multiValue, '&gender=');
		this.setState({ multiGenders: search }, this.changeLogic);
	}
	yearsSet(multiValue) {
		let search = this.queryBuilder(multiValue, '&year=');
		this.setState({ multiYears: search }, this.changeLogic);
	}

	/**
   * Function to dynamicaly build filter section of the search url
   * @param {*} subQuery
   * @param {*} identifier
   */
	queryBuilder(subQuery, identifier) {
		let query = '';
		for (let j = 0; j < subQuery.length; j++) {
			if (subQuery[j] != null) {
				let obj = subQuery[j];
				if (j !== subQuery.length - 1) {
					query = query + obj.value + ',';
				} else {
					query = query + obj.value;
				}
			}
		}
		if (query !== '') {
			query = identifier + encodeURIComponent(query);
			return query;
		} else {
			return null;
		}
	}

	/**
   * Function to be called when change is detected in a Select component
   * Combines filter urls with base offence url and fetches Search Endpoint
   */
	changeLogic() {
		//Handling JWT and authorization
		let getParam = { method: 'GET' };
		let head = { Authorization: `Bearer ${JWT}` };
		getParam.headers = head;

		//URL builder
		// http://localhost:8000/search?
		const baseUrl = 'http://localhost:8000/search?';
		const query = 'offence=' + encodeURIComponent(myQuery);
		let url = baseUrl + query;

		if (this.state.multiAges !== null) {
			url = url + this.state.multiAges;
		}
		if (this.state.multiGenders !== null) {
			url = url + this.state.multiGenders;
		}
		if (this.state.multiLGA !== null) {
			url = url + this.state.multiLGA;
		}
		if (this.state.multiYears !== null) {
			url = url + this.state.multiYears;
		}

		///contact server
		fetch(url, getParam)
			.then(function(response) {
				if (response.ok) {
					return response.json();
				}
				throw new Error('Oops! Something went wrong! Check the terminal for more info.');
			})
			.then(function(result) {
				search = result;
			})
			.catch(function(error) {
				console.log('There has been a problem with your fetch operation: ');
				window.alert('Oops! Something went wrong! Check the terminal for more info.');
			});
		this.lineGraphInfo();
	}

	// handles change of any Select component
	handleChange(e) {
		this.setState({
			query: e.value
		});
		myQuery = e.value;
		this.changeLogic();
	}

	render() {
		return (
			<div>
				<div className="data-container">
					<div className="left" style={{ height: '480px' }}>
						<Selection
							offencesList={this.state.offencesList}
							lga={this.state.lga}
							age={this.state.age}
							gender={this.state.gender}
							year={this.state.year}
							fetchInfo={this.fetchInfo.bind(this)}
							LGASet={this.LGASet.bind(this)}
							agesSet={this.agesSet.bind(this)}
							gendersSet={this.gendersSet.bind(this)}
							yearsSet={this.yearsSet.bind(this)}
							multiLGA={this.state.multiLGA}
							offenceList={this.state.offenceSet}
							data={this.state.data}
							updateData={this.updateData.bind(this)}
							query={this.state.query}
							handleChange={this.handleChange.bind(this)}
						/>
					</div>

					<div className="right">
						<MapGraph
							yearOffences={this.state.yearOffences}
							yearsArray={this.state.yearsArray}
							query={this.state.query}
							data={this.state.data}
							areaArray={this.state.areaArray}
							totalArray={this.state.totalArray}
							locations={this.state.locations}
						/>
					</div>
					<div className="center">
						{!this.props.logged && <OffenceTable data={this.state.offencesList} />}
						{this.props.logged && <Table data={this.state.data} title={this.state.query} />}
					</div>
				</div>
			</div>
		);
	}
}

export default TitleSpace;
