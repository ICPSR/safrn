var CreateTable = React.createClass({
	displayName: 'CreateTable',


	getInitialState: function () {
		return { data: {}, tableRowData: null, tableHeadData: null, tableHeading: '', columnHeading: '', originalData: {}, originalDataUse: false, labels: [] };
	},

	componentDidMount: function () {
		if (this.isMounted()) {
			this.loadLabels();
			this.setState({ data: this.props.data, originalData: this.props.originalData }, function stateUpdate() {
				var data = this.state.data;
				var originalData = this.state.originalData;
				if (typeof data !== "undefined" && typeof data.success !== "undefined") {
					if (data.success) {
						this.createTable(data.data);
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
			this.setState({ data: newProps.data, originalData: newProps.OriginalData, columnHeading: '' }, function stateUpdate() {
				var data = this.state.data;
				if (typeof data !== "undefined" && typeof data.success !== "undefined") {
					if (data.success) {
						this.createTable(data.data);
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

	loadLabels: function () {
		var labels = [{ "name": "Attrib_A", "value": "Sex", "options": { "1": "Female", "2": "Male", "*": "Total" } }, { "name": "Attrib_B", "value": "Major", "options": { "1": "Business", "2": "Music", "3": "English", "*": "Total" } }, { "name": "Group_X", "value": "School", "options": { "1": "Gryffindor", "2": "Ravenclaw", "3": "Hufflepuff", "*": "Total" } }];
		this.setState({ labels: labels });
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
			tableRowData.push(this.formatValue(data));
			tableHeadData.push(Data.analysis);
			this.setState({ tableRowData: tableRowData, tableHeadData: tableHeadData });
		}
	},

	formatData: function (data) {
		var formatData = [];
		var originalData = this.state.originalData;
		//	var tableHeading = originalData.iv[2] + ","+data[0][2];
		// Adding labels, if the output json contains the labels then use the above
		var labels = this.state.labels;
		var x = {},
		    y = {},
		    z = {};
		for (i = 0; i < labels.length; i++) {
			if (labels[i].name == originalData.iv[0]) {
				x = labels[i];
			} else if (labels[i].name == originalData.iv[1]) {
				y = labels[i];
			} else if (labels[i].name == originalData.iv[2]) {
				z = labels[i];
			}
		}
		var tableHeading = z.value + ", " + z.options[data[0][2]];
		//
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
		//tableHeadData.push(Data.iv[0]);
		// Adding labels, if the output json contains the labels then use the above
		var labels = this.state.labels;
		var y = {};
		for (i = 0; i < labels.length; i++) {
			if (labels[i].name == Data.iv[0]) {
				y = labels[i];
			}
		}
		tableHeadData.push(y.value);
		//
		tableHeadData.push(Data.analysis);
		for (i = 0; i < data.length; i++) {
			var x = data[i][0];
			data[i].splice(0, 1, y.options[x]);
			tableRowData.push(this.formatValue(data[i]));
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
		//	var columnHeading = Data.iv[1];
		// Adding labels, if the output json contains the labels then use the above
		var labels = this.state.labels;
		var x = {},
		    y = {};
		for (i = 0; i < labels.length; i++) {
			if (labels[i].name == Data.iv[0]) {
				x = labels[i];
			} else if (labels[i].name == Data.iv[1]) {
				y = labels[i];
			}
		}
		var columnHeading = y.value;
		var headerSet = new Set();
		//headerSet.add(Data.iv[0]);
		headerSet.add(x.value);
		for (i = 0; i < data.length; i++) {
			headerSet.add(y.options[data[i][1]]);
		}
		var rowSet = new Set();
		for (j = 0; j < data.length; j++) {
			rowSet.add(data[j][0]);
		}
		var tableRow = [...rowSet];
		for (z = 0; z < tableRow.length; z++) {
			var p = tableRow[z];
			var tableRowLine = [];
			//	tableRowLine.push(y)
			tableRowLine.push(x.options[p]);
			for (j = 0; j < data.length; j++) {
				if (p == data[j][0]) {
					tableRowLine.push(data[j][2]);
				}
			}
			tableRowData.push(this.formatValue(tableRowLine));
		}
		tableHeadData = [...headerSet];
		this.setState({ tableRowData: tableRowData, tableHeadData: tableHeadData, columnHeading: columnHeading });
	},

	formatValue: function (data) {
		var Data = '';
		if (this.state.originalDataUse) {
			Data = this.state.originalData;
		} else {
			Data = this.state.data;
		}
		if (Data.analysis == "mean") {
			if (typeof Data.iv !== "undefined") {
				if (Data.iv.length == 1) {
					data[1] = data[1].toFixed(2);
				} else if (Data.iv.length > 1) {
					for (i = 1; i < data.length; i++) {
						if (data[i] != null) {
							data[i] = data[i].toFixed(2);
						}
					}
				}
			} else {
				data[0] = data[0].toFixed(2);
			}
		}
		return data;
	},

	render: function () {
		var data = this.state.data;
		var tableHeadData = this.state.tableHeadData;
		var tableRowData = this.state.tableRowData;
		var tableHeading = this.state.tableHeading;
		var columnHeading = this.state.columnHeading;
		var theader = React.createElement('th', null);
		var tbody = React.createElement(
			'tr',
			null,
			React.createElement('td', null)
		);
		if (tableHeadData != null && tableHeadData.length > 0) {
			theader = this.state.tableHeadData.map(function (val, i) {
				return React.createElement(
					'th',
					{ key: i },
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
					React.createElement(
						'b',
						null,
						columnHeading
					)
				),
				React.createElement(
					'table',
					{ className: 'table table-bordered table-hover' },
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