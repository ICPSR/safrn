var CreateTable = React.createClass({
	displayName: 'CreateTable',


	getInitialState: function () {
		return { data: {}, tableRowData: null, tableHeadData: null, tableHeading: '', columnHeading: '', originalData: {}, originalDataUse: false };
	},

	componentDidMount: function () {
		if (this.isMounted()) {
			this.setState({ data: this.props.data, originalData: this.props.originalData }, function stateUpdate() {
				var data = this.state.data;
				var originalData = this.state.originalData;
				if (typeof data !== "undefined" && typeof data.success !== "undefined") {
					if (data.success) {
						if (typeof data.iv !== "undefined") {
							if (data.iv.length > 0 && data.iv.length < 3) {
								this.createTable(data.data);
							}
						} else {
							this.createTable(data.data);
						}
					}
				}
				if (typeof originalData !== "undefined" && typeof originalData.success !== "undefined") {
					if (originalData.success) {
						this.formatData(data);
					}
				}
			});
		}
	},

	componentWillReceiveProps: function (newProps) {
		if (this.state.data !== newProps.data) {
			this.setState({ data: newProps.data, originalData: newProps.OriginalData }, function stateUpdate() {
				var data = this.state.data;
				var tableRowData = [];
				var tableHeadData = [];
				if (typeof data.iv === "undefined") {
					tableHeadData.push(data.analysis);
					tableRowData.push(data.data);
					this.setState({ tableHeadData: tableHeadData, tableRowData: tableRowData });
				}
				if (typeof data !== "undefined" && typeof data.success !== "undefined") {
					if (data.success) {
						if (typeof data.iv !== "undefined") {
							if (data.iv.length > 0 && data.iv.length < 3) {
								this.createTable(data.data);
							}
						} else {
							this.createTable(data.data);
						}
					}
				}
				if (typeof originalData !== "undefined" && typeof originalData.success !== "undefined") {
					if (originalData.success) {
						this.formatData(data);
					}
				}
			});
		}
	},

	createTable: function (data) {
		var Data = this.state.data;
		var tableRowData = [];
		var tableHeadData = [];
		if (typeof Data.iv !== "undefined") {
			if (Data.iv.length == 1) {
				this.formatDataRow(data);
			} else if (Data.iv.length == 2) {
				this.formatDataRowColumn(data);
			}
		} else {
			tableRowData.push(data);
			tableHeadData.push(Data.analysis);
			this.setState({ tableRowData: tableRowData, tableHeadData: tableHeadData });
		}
	},

	formatData: function (data) {
		var formatData = [];
		var originalData = this.state.originalData;
		var tableHeading = originalData.iv[2] + "," + data[0][2];
		for (i = 0; i < data.length; i++) {
			var x = data[i];
			x.splice(2, 1);
			formatData.push(x);
		}
		this.setState({ originalDataUse: true, tableHeading: tableHeading }, function stateUpdate() {
			this.formatDataRowColumn(formatData);
		});
	},

	formatDataRow: function (data) {
		var Data = this.state.data;
		var tableRowData = [];
		var tableHeadData = [];
		tableHeadData.push(Data.iv[0]);
		tableHeadData.push(Data.analysis);
		for (i = 0; i < data.length; i++) {
			tableRowData.push(data[i]);
		}
		this.setState({ tableRowData: tableRowData, tableHeadData: tableHeadData });
	},

	formatDataRowColumn: function (data) {
		var Data = '';
		if (this.state.originalDataUse) {
			Data = this.state.originalData;
		} else {
			Data = this.state.data;
		}
		var tableRowData = [];
		var tableHeadData = [];
		var columnHeading = Data.iv[1];

		var headerSet = new Set();
		headerSet.add(Data.iv[0]);
		for (i = 0; i < data.length; i++) {
			headerSet.add(data[i][1]);
		}
		var rowSet = new Set();
		for (j = 0; j < data.length; j++) {
			rowSet.add(data[j][0]);
		}
		var tableRow = [...rowSet];
		for (x = 0; x < tableRow.length; x++) {
			var y = tableRow[x];
			var tableRowLine = [];
			tableRowLine.push(y);
			for (j = 0; j < data.length; j++) {
				if (y == data[j][0]) {
					tableRowLine.push(data[j][2]);
				}
			}
			tableRowData.push(tableRowLine);
		}
		tableHeadData = [...headerSet];
		this.setState({ tableRowData: tableRowData, tableHeadData: tableHeadData, columnHeading: columnHeading });
	},

	render: function () {
		var data = this.state.data;
		var tableHeadData = this.state.tableHeadData;
		var tableRowData = this.state.tableRowData;
		var tableHeading = this.state.tableHeading;
		var columnHeading = this.state.columnHeading;
		var theader = React.createElement('th', null);
		var tbody = React.createElement('td', null);
		if (tableHeadData != null && tableHeadData.length > 0) {
			theader = this.state.tableHeadData.map(function (val, i) {
				return React.createElement(
					'th',
					null,
					val
				);
			});
		}
		if (tableRowData != null && tableRowData.length > 0) {
			tbody = this.state.tableRowData.map(function (val, i) {
				if (typeof val !== "undefined") {
					if (val.length == 1) {
						return React.createElement(
							'tr',
							{ key: i },
							React.createElement(
								'td',
								null,
								val[0]
							)
						);
					} else if (val.length == 2) {
						return React.createElement(
							'tr',
							{ key: i },
							React.createElement(
								'td',
								null,
								val[0]
							),
							React.createElement(
								'td',
								null,
								val[1]
							)
						);
					} else if (val.length > 2) {
						if (val.length == 4) {
							return React.createElement(
								'tr',
								{ key: i },
								React.createElement(
									'td',
									null,
									val[0]
								),
								React.createElement(
									'td',
									null,
									val[1]
								),
								React.createElement(
									'td',
									null,
									val[2]
								),
								React.createElement(
									'td',
									null,
									val[3]
								)
							);
						} else if (val.length == 5) {
							return React.createElement(
								'tr',
								{ key: i },
								React.createElement(
									'td',
									null,
									val[0]
								),
								React.createElement(
									'td',
									null,
									val[1]
								),
								React.createElement(
									'td',
									null,
									val[2]
								),
								React.createElement(
									'td',
									null,
									val[3]
								),
								React.createElement(
									'td',
									null,
									val[4]
								)
							);
						}
					}
				}
			});
		}
		return React.createElement(
			'div',
			{ className: 'container' },
			React.createElement(
				'div',
				{ className: 'table-responsive' },
				React.createElement(
					'p',
					{ className: 'text-center' },
					React.createElement(
						'b',
						null,
						tableHeading
					)
				),
				React.createElement(
					'p',
					{ className: 'text-center' },
					columnHeading
				),
				React.createElement(
					'table',
					{ className: 'table' },
					React.createElement(
						'thead',
						null,
						React.createElement(
							'tr',
							null,
							theader
						)
					),
					React.createElement(
						'tbody',
						null,
						tbody
					)
				)
			)
		);
	}
});