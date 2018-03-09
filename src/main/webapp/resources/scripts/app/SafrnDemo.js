var SafrnDemo = React.createClass({
	displayName: 'SafrnDemo',


	getInitialState: function () {
		return { incomeData: {}, loanData: {}, analysis: 'mean', ip: '', port: '',
			s_row: '', selfquery: '', options: [] };
	},

	componentDidMount: function () {
		if (this.isMounted()) {
			this.loadOptions();
			this.setState({ ip: this.props.ip, port: this.props.port });
		}
	},

	handleInputChange: function (event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({ [name]: value });
	},

	loadOptions: function () {
		var options = [{ "name": "None", "value": "" }, { "name": "School", "value": "School" }, { "name": "Degree", "value": "Degree" }, { "name": "Degree by School", "value": "School+Degree" }];
		this.setState({ options: options });
	},

	makeQuery: function () {
		if (this.state.s_row !== "") {
			var incomequery = "analysis=" + this.state.analysis;
			incomequery += "&dv=Income2+Income3+Income10";
			incomequery += "&iv=" + this.state.s_row;
			this.loadIncomeData(incomequery);
			var loanquery = "analysis=" + this.state.analysis;
			loanquery += "&dv=Max_Loan";
			loanquery += "&iv=" + this.state.s_row;
			this.loadLoanData(loanquery);
		} else {
			this.setState({ incomeData: {}, loanData: {} });
		}
	},

	loadIncomeData: function (query) {
		var ip = this.state.ip;
		var port = this.state.port;
		$("#pleaseWaitDialog").modal();
		$.ajax({
			url: 'http://54.198.122.48:8080/query?' + query,
			dataType: 'json',
			type: 'GET',
			success: function (data) {
				$("#pleaseWaitDialog").modal('hide');
				this.setState({ incomeData: data }, function stateUpdate() {});
			}.bind(this),
			error: function (xhr, status, err) {
				$("#pleaseWaitDialog").modal('hide');
				console.error(xhr, status, err);
			}.bind(this)
		});
	},

	loadLoanData: function (query) {
		var ip = this.state.ip;
		var port = this.state.port;
		$("#pleaseWaitDialog").modal();
		$.ajax({
			url: 'http://54.198.122.48:8081/query?' + query,
			dataType: 'json',
			type: 'GET',
			success: function (data) {
				$("#pleaseWaitDialog").modal('hide');
				this.setState({ loanData: data }, function stateUpdate() {});
			}.bind(this),
			error: function (xhr, status, err) {
				$("#pleaseWaitDialog").modal('hide');
				console.error(xhr, status, err);
			}.bind(this)
		});
	},

	render: function () {
		var options = this.state.options.map(function (val, i) {
			return React.createElement(
				'option',
				{ key: i, value: val.value },
				val.name
			);
		});
		var incomeData = this.state.incomeData;
		var loanData = this.state.loanData;
		return React.createElement(
			'div',
			{ className: 'container-fluid' },
			React.createElement(
				'div',
				{ className: 'page-header' },
				React.createElement(
					'h1',
					{ className: 'text-center' },
					' Secure Analytics For Reticent Non-consolidated Databases (SAFRN)'
				),
				React.createElement(
					'h1',
					{ className: 'row text-center' },
					React.createElement(
						'small',
						null,
						'Statistics computed without sharing private data.'
					)
				)
			),
			React.createElement(
				'form',
				{ className: 'form-horizontal' },
				React.createElement(
					'fieldset',
					null,
					React.createElement(
						'legend',
						null,
						'Please select: '
					),
					React.createElement(
						'label',
						null,
						'Type: ',
						React.createElement(
							'select',
							{ name: 's_row', id: 's_row', onChange: this.handleInputChange },
							options
						)
					)
				),
				React.createElement('hr', null)
			),
			React.createElement(
				'button',
				{ id: 'b_q', onClick: this.makeQuery },
				'Submit'
			),
			React.createElement('br', null),
			React.createElement('br', null),
			React.createElement(InfoTable, { incomeData: incomeData, loanData: loanData }),
			React.createElement('hr', null),
			React.createElement('hr', null),
			React.createElement(
				'nav',
				{ className: 'navbar navbar-default navbar-fixed-bottom' },
				React.createElement(
					'div',
					{ className: 'container-fluid row' },
					React.createElement(
						'div',
						{ className: 'pull-left' },
						React.createElement('img', { src: './resources/images/ICPSR_logo_transparent.gif', alt: 'ICPSR Icon', width: '192', height: '192' })
					),
					React.createElement(
						'div',
						{ className: 'pull-left' },
						React.createElement('img', { src: './resources/images/StealthLogo.png', alt: 'Stealth Icon', width: '192', height: '192' })
					),
					React.createElement(
						'div',
						{ className: 'pull-right' },
						React.createElement(
							'p',
							null,
							'SAFRN is supported by',
							React.createElement('img', { src: './resources/images/ljaf_logo.gif', alt: 'Stealth Icon', width: '192', height: '192' })
						)
					)
				)
			),
			React.createElement(
				'div',
				{ className: 'modal hide', id: 'pleaseWaitDialog', 'data-backdrop': 'static', 'data-keyboard': 'false' },
				React.createElement(
					'div',
					{ className: 'modal-header' },
					React.createElement(
						'h1',
						null,
						'Processing...'
					)
				),
				React.createElement(
					'div',
					{ className: 'modal-body' },
					React.createElement(
						'div',
						{ className: 'progress progress-striped active' },
						React.createElement('div', { className: 'bar', style: { width: '100%' } })
					)
				)
			)
		);
	}
});