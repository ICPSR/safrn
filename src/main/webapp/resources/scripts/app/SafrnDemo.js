var SafrnDemo = React.createClass({
	displayName: 'SafrnDemo',


	getInitialState: function () {
		return { incomeData: {}, loanData: {}, analysis: 'mean', ip: '', port: '',
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
		/*if(event.target.checked == true){
  	value = "Y";
  }
  if(radioId == "School" && value == "Y"){
  	selectedValue="School";
  } else if (radioId == "Degree" && value == "Y"){
  	selectedValue="Degree";
  } else if (radioId == "DegreeSchool" && value == "Y"){
  	selectedValue="School+Degree";
  } */
		this.setState({ s_row: selectedValue });
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
			incomequery += "&countonlymean=1";
			this.loadIncomeData(incomequery);
			var loanquery = "analysis=" + this.state.analysis;
			loanquery += "&dv=Max_Loan";
			loanquery += "&iv=" + this.state.s_row;
			loanquery += "&countonlymean=0&loanlink=1";
			this.loadLoanData(loanquery);
		} else {
			this.setState({ incomeData: {}, loanData: {} });
		}
	},

	loadIncomeData: function (query) {
		var ip = this.state.ip;
		var port = this.state.port;
		var start_time = new Date().getTime();
		$("#pleaseWaitDialog").modal();
		$.ajax({
			url: 'http://' + ip + ':8080/query?' + query,
			dataType: 'json',
			type: 'GET',
			success: function (data) {
				$("#pleaseWaitDialog").modal('hide');
				var request_time = new Date().getTime() - start_time;
				this.setState({ incomeData: data, incomeComputeTime: "Total time to compute Income data: " + (request_time / 1000).toFixed(2) + " seconds for " + this.state.s_row }, function stateUpdate() {});
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
			url: 'http://' + ip + ':8081/query?' + query,
			dataType: 'json',
			type: 'GET',
			success: function (data) {
				$("#pleaseWaitDialog").modal('hide');
				var request_time = new Date().getTime() - start_time;
				this.setState({ loanData: data, loanComputeTime: "Total time to compute Loan data: " + (request_time / 1000).toFixed(2) + " seconds for " + this.state.s_row }, function stateUpdate() {});
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
				'form',
				{ className: 'form-horizontal' },
				React.createElement(
					'legend',
					null,
					'Please select type: '
				),
				React.createElement(
					'div',
					{ className: 'radio' },
					React.createElement(
						'label',
						null,
						React.createElement('input', { type: 'radio', name: 'radioOptions', id: 'None', value: '', checked: this.state.s_row === "", onChange: this.changeValue }),
						'None'
					)
				),
				React.createElement(
					'div',
					{ className: 'radio' },
					React.createElement(
						'label',
						null,
						React.createElement('input', { type: 'radio', name: 'radioOptions', id: 'School', value: 'School', onChange: this.changeValue }),
						'School'
					)
				),
				React.createElement(
					'div',
					{ className: 'radio' },
					React.createElement(
						'label',
						null,
						React.createElement('input', { type: 'radio', name: 'radioOptions', id: 'Degree', value: 'Degree', onChange: this.changeValue }),
						'Degree'
					)
				),
				React.createElement(
					'div',
					{ className: 'radio' },
					React.createElement(
						'label',
						null,
						React.createElement('input', { type: 'radio', name: 'radioOptions', id: 'DegreeSchool', value: 'School+Degree', onChange: this.changeValue }),
						'Degree by School'
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