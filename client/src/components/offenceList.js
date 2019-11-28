import React from 'react';
import ReactTable from 'react-table';

/**
 * Component to List all offences
 *  - child to TitleSpace
 */
class OffenceTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const columns = [
			{
				Header: 'Offences',
				accessor: 'label'
			}
		];

		return (
			<div>
				<ReactTable data={this.props.data} columns={columns} defaultPageSize={10} showPageSizeOptions={false} />
			</div>
		);
	}
}
export default OffenceTable;
