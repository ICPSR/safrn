var InfoTable = React.createClass({
	displayName: "InfoTable",


	getInitialState: function () {
		return { data: {} };
	},

	componentDidMount: function () {
		if (this.isMounted()) {
			this.setState({ data: this.props.data });
		}
	},

	render: function () {
		return React.createElement("div", null);
	}

});