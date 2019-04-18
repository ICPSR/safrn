var SafrnDemo = React.createClass({
	displayName: 'SafrnDemo',


	getInitialState: function () {
		return { incomeData2: {}, incomeData3: {}, incomeData10: {}, loanData: {}, analysis: 'mean', ip: '', port: '',
			s_row: '', loanComputeTime: "", incomeComputeTime: "", selfquery: '', options: [] };
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

	changeValue: function (event) {
		var radioId = event.target.id;
		var value = "N";
		var selectedValue = event.target.value;
		this.setState({ s_row: selectedValue });
	},

	loadOptions: function () {
		var options = [{ "name": "None", "value": "" }, { "name": "School", "value": "School" }, { "name": "Degree", "value": "Degree" }, { "name": "Degree by School", "value": "School+Degree" }];
		this.setState({ options: options });
	},

	makeQuery: function () {
		if (this.state.s_row !== "") {
			var loanquery = "analysis=" + this.state.analysis;
			loanquery += "&iv=" + this.state.s_row;
			loanquery += "&dv=Max_Loan";
			loanquery += "&loanlink=1&countonlymean=2";

			var incomequery2 = "analysis=" + this.state.analysis;
			incomequery2 += "&iv=" + this.state.s_row;
			incomequery2 += "&dv=Income2&countonlymean=0";

			var incomequery3 = "analysis=" + this.state.analysis;
			incomequery3 += "&iv=" + this.state.s_row;
			incomequery3 += "&dv=Income3&countonlymean=0";

			var incomequery10 = "analysis=" + this.state.analysis;
			incomequery10 += "&iv=" + this.state.s_row;
			incomequery10 += "&dv=Income10&countonlymean=2";

			this.loadIncome2Data(incomequery2);
			this.loadIncome3Data(incomequery3);
			this.loadIncome10Data(incomequery10);
			this.loadLoanData(loanquery);
		} else {
			this.setState({ incomeData2: {}, incomeData3: {}, incomeData10: {}, loanData: {} });
		}
	},

	loadIncome2Data: function (query) {
		var ip = this.state.ip;
		var port = this.state.port;
		var start_time = new Date().getTime();
		$("#pleaseWaitDialog").modal();
		$.ajax({
			url: 'http://' + ip + ':8090/query?' + query,
			dataType: 'json',
			type: 'GET',
			success: function (data) {
				this.setState({ incomeData2: data });
			}.bind(this),
			error: function (xhr, status, err) {
				$("#pleaseWaitDialog").modal('hide');
				console.error(xhr, status, err);
			}.bind(this)
		});
	},

	loadIncome3Data: function (query) {
		var ip = this.state.ip;
		var port = this.state.port;
		var start_time = new Date().getTime();
		$("#pleaseWaitDialog").modal();
		$.ajax({
			url: 'http://' + ip + ':8090/query?' + query,
			dataType: 'json',
			type: 'GET',
			success: function (data) {
				$("#pleaseWaitDialog").modal('hide');
				this.setState({ incomeData3: data });
			}.bind(this),
			error: function (xhr, status, err) {
				$("#pleaseWaitDialog").modal('hide');
				console.error(xhr, status, err);
			}.bind(this)
		});
	},

	loadIncome10Data: function (query) {
		var ip = this.state.ip;
		var port = this.state.port;
		var start_time = new Date().getTime();
		$("#pleaseWaitDialog").modal();
		$.ajax({
			url: 'http://' + ip + ':8090/query?' + query,
			dataType: 'json',
			type: 'GET',
			success: function (data) {
				$("#pleaseWaitDialog").modal('hide');
				var request_time = new Date().getTime() - start_time;
				this.setState({ incomeData10: data, incomeComputeTime: "Total time to compute Income data: " + (request_time / 1000).toFixed(2) + " seconds for " + this.state.s_row });
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
		var start_time = new Date().getTime();
		$("#pleaseWaitDialog").modal();
		$.ajax({
			url: 'http://' + ip + ':8091/query?' + query,
			dataType: 'json',
			type: 'GET',
			success: function (loanData) {
				var request_time = new Date().getTime() - start_time;
				this.setState({ loanData: loanData, loanComputeTime: "Total time to compute Loan data: " + (request_time / 1000).toFixed(2) + " seconds for " + this.state.s_row });
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
		var incomeData2 = this.state.incomeData2;
		var incomeData3 = this.state.incomeData3;
		var incomeData10 = this.state.incomeData10;
		var loanData = this.state.loanData;
		var loanComputeTime = this.state.loanComputeTime;
		var incomeComputeTime = this.state.incomeComputeTime;
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
				'legend',
				null,
				'Please select type: '
			),
			React.createElement(
				'label',
				{ className: 'radio-inline control-label' },
				React.createElement('input', { type: 'radio', name: 'radioOptions', id: 'None', value: '', checked: this.state.s_row === "", onChange: this.changeValue }),
				'None'
			),
			React.createElement(
				'label',
				{ className: 'radio-inline control-label' },
				React.createElement('input', { type: 'radio', name: 'radioOptions', id: 'School', value: 'School', onChange: this.changeValue }),
				'School'
			),
			React.createElement(
				'label',
				{ className: 'radio-inline control-label' },
				React.createElement('input', { type: 'radio', name: 'radioOptions', id: 'Degree', value: 'Degree', onChange: this.changeValue }),
				'Degree'
			),
			React.createElement(
				'label',
				{ className: 'radio-inline control-label' },
				React.createElement('input', { type: 'radio', name: 'radioOptions', id: 'DegreeSchool', value: 'School+Degree', onChange: this.changeValue }),
				'Degree by School'
			),
			React.createElement('hr', null),
			React.createElement(
				'button',
				{ id: 'b_q', onClick: this.makeQuery },
				'Submit'
			),
			React.createElement('br', null),
			React.createElement('br', null),
			React.createElement(InfoTable, { incomeData2: incomeData2, incomeData3: incomeData3, incomeData10: incomeData10, loanData: loanData }),
			React.createElement('hr', null),
			React.createElement(
				'legend',
				null,
				'Timings: '
			),
			loanComputeTime,
			React.createElement('br', null),
			incomeComputeTime,
			React.createElement('hr', null),
			React.createElement(
				'footer',
				null,
				React.createElement(
					'div',
					{ className: 'row' },
					React.createElement(
						'div',
						{ className: 'col-md-2' },
						React.createElement('img', { className: 'img-responsive', src: './resources/images/ICPSR_logo_transparent.gif', alt: 'ICPSR Icon' })
					),
					React.createElement(
						'div',
						{ className: 'col-md-4' },
						React.createElement('img', { className: 'img-responsive', src: './resources/images/StealthLogo.png', alt: 'Stealth Icon' })
					),
					React.createElement(
						'div',
						{ className: 'col-md-6' },
						React.createElement(
							'div',
							{ className: 'span4 pull-right' },
							React.createElement(
								'p',
								null,
								'SAFRN is supported by'
							),
							React.createElement('img', { className: 'img-responsive img-right', src: './resources/images/ljaf_logo.gif', alt: 'Stealth Icon' })
						)
					)
				)
			),
			React.createElement(
				'div',
				{ className: 'modal', id: 'pleaseWaitDialog', 'data-backdrop': 'static', 'data-keyboard': 'false' },
				React.createElement(
					'div',
					{ className: 'modal-content' },
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
							React.createElement('div', { className: 'progress-bar', style: { width: '100%' } })
						)
					)
				)
			)
		);
	}
});