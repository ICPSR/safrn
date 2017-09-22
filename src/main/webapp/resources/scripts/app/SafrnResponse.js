var SafrnResponse = React.createClass({
	displayName: "SafrnResponse",


	getInitialState: function () {
		return { data: {} };
	},

	componentDidMount: function () {
		if (this.isMounted()) {
			this.setState({ data: this.props.data });
		}
	},

	componentWillReceiveProps: function (newProps) {
		var data = this.state.data;
		if (data != newProps.data) {
			this.setState({ data: newProps.data });
		}
	},

	render: function () {
		var data = this.state.data;
		var info = React.createElement("div", null);
		var table = React.createElement("div", null);
		if (typeof data.success !== "undefined") {
			if (data.success) {
				info = React.createElement("div", null);
				if (typeof data.iv !== "undefined") {
					if (data.iv.length > 0 && data.iv.length < 3) {
						table = React.createElement(CreateTable, { data: data });
					} else {
						table = React.createElement(MultipleTables, { data: data });
					}
				} else {
					table = React.createElement(CreateTable, { data: data });
				}
			} else {
				info = React.createElement(
					"div",
					null,
					React.createElement(
						"p",
						{ className: "text-danger" },
						data.error
					)
				);
			}
		}
		return React.createElement(
			"div",
			{ className: "container-fluid" },
			React.createElement(
				"legend",
				null,
				" Response: "
			),
			info,
			table
		);
	}
});