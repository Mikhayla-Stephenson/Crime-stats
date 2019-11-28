import React from 'react';
import ReactTable from 'react-table';

/**
 * Component to display data in table
 * - child to TitleSpace
 */
class Table extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const columns = [
			{
				Header: this.props.title,
				columns: [
					{
						Header: 'Location',
						accessor: 'LGA'
					},
					{
						Header: 'Total',
						accessor: 'total'
					}
				]
			}
		];

		return (
			<div>
				<ReactTable
					data={this.props.data.result}
					columns={columns}
					defaultPageSize={10}
					showPageSizeOptions={false}
				/>
			</div>
		);
	}
}
export default Table;
