var CreateTable = React.createClass({
	displayName: "CreateTable",


	getInitialState: function () {
		return { data: {}, tableRowData: null, tableHeadData: null };
	},

	componentDidMount: function () {
		if (this.isMounted()) {
			this.setState({ data: this.props.data }, function stateUpdate() {
				var data = this.state.data;
				if (typeof data !== "undefined" && typeof data.success !== "undefined") {
					if (typeof data !== "undefined" && data.success) {
						if (data.iv.length > 0) {
							this.createTable(data);
						}
					}
				}
			});
		}
	},

	componentWillReceiveProps: function (newProps) {
		this.setState({ data: newProps.data }, function stateUpdate() {
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
					if (typeof data.iv !== "undefined" && data.iv.length > 0) {
						this.createTable(data);
					}
				}
			}
		});
	},

	createTable: function (data) {
		if (data.iv.length == 1) {
			this.formatData(data);
		} else if (data.iv.length == 2) {} else if (data.iv.length == 3) {}
	},

	formatData: function (data) {
		var tableRowData = [];
		var tableHeadData = [];
		tableHeadData.push(data.iv[0]);
		tableHeadData.push(data.analysis);
		for (i = 0; i < data.data.length; i++) {
			tableRowData.push(data.data[i]);
		}
		this.setState({ tableRowData: tableRowData, tableHeadData: tableHeadData });
	},

	render: function () {
		var data = this.state.data;
		var tableHeadData = this.state.tableHeadData;
		var tableRowData = this.state.tableRowData;
		var theader = React.createElement("th", null);
		var tbody = React.createElement("td", null);
		if (tableHeadData != null && tableHeadData.length > 0) {
			theader = this.state.tableHeadData.map(function (val, i) {
				return React.createElement(
					"th",
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
							"tr",
							{ key: i },
							React.createElement(
								"td",
								null,
								val[0]
							)
						);
					} else if (val.length == 2) {
						return React.createElement(
							"tr",
							{ key: i },
							React.createElement(
								"td",
								null,
								val[0]
							),
							React.createElement(
								"td",
								null,
								val[1]
							)
						);
					}
				}
			});
		}
		return React.createElement(
			"div",
			{ className: "container" },
			React.createElement(
				"div",
				{ className: "table-responsive" },
				React.createElement(
					"table",
					{ className: "table", id: "myTable" },
					React.createElement(
						"thead",
						null,
						React.createElement(
							"tr",
							null,
							theader
						)
					),
					React.createElement(
						"tbody",
						null,
						tbody
					)
				)
			),
			" "
		);
	}
});