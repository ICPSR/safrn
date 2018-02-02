var InfoTable = React.createClass({
	displayName: "InfoTable",


	getInitialState: function () {
		return { data: [] };
	},

	componentDidMount: function () {
		if (this.isMounted()) {
			var dataSet = [["HufflePuff", "Business", "50000", "25000", "35000", "35000"], ["All", "Art", "25000", "35000", "45000", "55000"], ["Griffindor", "Art", "20000", "45000", "25000", "65000"], ["Slytherin", "Business", "35000", "2250", "45000", "85000"], ["Ravenclaw", "Art", "45000", "45000", "25000", "22500"]];
			this.setState({ data: dataSet }, function stateUpdate() {
				this.createTable();
			});
		}
	},

	createTable: function () {
		var infoTable = $('#infoTable').DataTable({
			destroy: true,
			data: this.state.data,
			columns: [{ title: "Institution" }, { title: "Major" }, { title: "Average Loan" }, { title: "Average Income 2 years after graduation" }, { title: "Average Income 5 years after graduation" }, { title: "Average Income 10 years after graduation" }],
			buttons: ['copy', 'csv', 'print']
		});
		infoTable.buttons().container().insertBefore('#infoTable_filter');
	},

	render: function () {
		return React.createElement(
			"div",
			{ className: "container-fluid" },
			React.createElement("br", null),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"table",
					{ className: "table table-hover", id: "infoTable" },
					React.createElement(
						"thead",
						null,
						React.createElement(
							"tr",
							null,
							React.createElement(
								"th",
								{ scope: "col" },
								"Institution"
							),
							React.createElement(
								"th",
								{ scope: "col" },
								"Major"
							),
							React.createElement(
								"th",
								{ scope: "col" },
								"Average Loan"
							),
							React.createElement(
								"th",
								{ scope: "col" },
								"Average Income 2 years after graduation"
							),
							React.createElement(
								"th",
								{ scope: "col" },
								"Average Income 5 years after graduation"
							),
							React.createElement(
								"th",
								{ scope: "col" },
								"Average Income 10 years after graduation"
							)
						)
					),
					React.createElement("tbody", null)
				)
			)
		);
	}

});