var Safrn = React.createClass({
	displayName: 'Safrn',


	getInitialState: function () {
		return { data: {}, analysis: 'freq', ip: '', port: '', income: false,
			s_row: '', s_col: '', s_str: '', selfquery: '', options: [], errorMsgCol: '', errorMsgStr: '' };
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
		var options = [{ "name": "None", "value": "" }, { "name": "Sex", "value": "Attrib_A" }, { "name": "Major", "value": "Attrib_B" }, { "name": "School", "value": "Group_X" }];
		this.setState({ options: options });
	},

	makeCustomQuery: function () {
		var mainquery = this.state.selfquery;
		this.loadData(mainquery);
	},

	makeQuery: function () {
		var mainquery = "analysis=" + this.state.analysis;
		if (this.state.income) {
			mainquery += "&dv=Income";
		}
		if (this.state.s_row !== "") {
			mainquery += "&iv=" + this.state.s_row;
			if (this.state.s_col !== "") {
				mainquery += "+" + this.state.s_col;
				if (this.state.s_str !== "") {
					mainquery += "+" + this.state.s_str;
				}
			}
		}
		this.loadData(mainquery);
	},

	validateRowColStr: function () {
		var s_row = this.state.s_row;
		var s_col = this.state.s_col;
		var s_str = this.state.s_str;
		var response = true;
		this.setState({ errorMsgCol: '', errorMsgStr: '' });
		if (s_col !== "" && s_row == "") {
			response = false;
			this.setState({ errorMsgCol: 'Please select the row value' });
		}
		if (s_str != "" && s_col == "" || s_str != "" && s_row == "") {
			response = false;
			this.setState({ errorMsgStr: 'Please select the row and column values ' });
		}
		if (response) {
			this.makeQuery();
		}
	},

	loadData: function (query) {
		var ip = this.state.ip;
		var port = this.state.port;
		$("#pleaseWaitDialog").modal();
		$.ajax({
			url: 'http://' + ip + ':' + port + '/query?' + query,
			dataType: 'json',
			type: 'GET',
			success: function (data) {
				$("#pleaseWaitDialog").modal('hide');
				this.setState({ data: data }, function stateUpdate() {
					/* if(this.state.data.success){
       document.getElementById("s_q").innerHTML =  "<pre>"+this.state.data.data+"</pre>" + document.getElementById("s_q").innerHTML;
      } else {
       document.getElementById("s_q").innerHTML =  "<pre>"+this.state.data.error+"</pre>" + document.getElementById("s_q").innerHTML;
      }*/
				});
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
		var data = this.state.data;
		var errorMsgCol = this.state.errorMsgCol;
		var errorMsgStr = this.state.errorMsgStr;
		/*<label htmlFor="rest_server">REST Server IP:</label><input type="text" id="rest_server" name="ip" placeholder = "0.0.0.0" onChange={this.handleInputChange}/> 
  <label htmlFor="rest_port">REST Server Port:</label><input type="text" id="rest_port" name="port" placeholder = "8080" onChange={this.handleInputChange}/> <br/>
  	<hr/> 
  			<input type="text" id="selfquery" name="selfquery" placeholder="/query?" onChange={this.handleInputChange}/>
  			<button id="b_s" onClick={this.makeCustomQuery}>Make custom query</button>
  			<br/>
  	*/
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
					'div',
					{ className: 'form-group' },
					React.createElement(
						'fieldset',
						null,
						React.createElement(
							'legend',
							null,
							'Analysis: '
						),
						React.createElement(
							'div',
							{ className: 'radio' },
							React.createElement(
								'label',
								null,
								'Frequency',
								React.createElement('input', { type: 'radio', name: 'analysis', id: 'ro_freq', value: 'freq', checked: this.state.analysis === 'freq', onChange: this.handleInputChange })
							)
						),
						React.createElement(
							'div',
							{ className: 'radio' },
							React.createElement(
								'label',
								null,
								'Mean',
								React.createElement('input', { type: 'radio', name: 'analysis', id: 'ro_mean', value: 'mean', checked: this.state.analysis === 'mean', onChange: this.handleInputChange })
							)
						)
					)
				),
				React.createElement(
					'fieldset',
					null,
					React.createElement(
						'legend',
						null,
						'Dependent Variables: '
					),
					React.createElement(
						'div',
						{ className: 'checkbox' },
						React.createElement(
							'label',
							null,
							'Income',
							React.createElement('input', { type: 'checkbox', id: 'c_income', name: 'income', value: 'Income', onChange: this.handleInputChange })
						)
					)
				),
				React.createElement(
					'fieldset',
					null,
					React.createElement(
						'legend',
						null,
						'Independent Variables: '
					),
					React.createElement(
						'label',
						null,
						'Variable 1 (Row): ',
						React.createElement(
							'select',
							{ name: 's_row', id: 's_row', onChange: this.handleInputChange },
							options
						)
					),
					React.createElement(
						'label',
						null,
						'Variable 2 (Column): ',
						React.createElement(
							'select',
							{ name: 's_col', id: 's_col', onChange: this.handleInputChange },
							options
						)
					),
					' ',
					React.createElement(
						'p',
						{ className: 'text-error' },
						errorMsgCol
					),
					React.createElement(
						'label',
						null,
						' Variable 3 (Stratum): ',
						React.createElement(
							'select',
							{ name: 's_str', id: 's_str', onChange: this.handleInputChange },
							options
						),
						' '
					),
					React.createElement(
						'p',
						{ className: 'text-error' },
						errorMsgStr
					)
				),
				React.createElement('hr', null)
			),
			React.createElement(
				'button',
				{ id: 'b_q', onClick: this.validateRowColStr },
				'Submit'
			),
			React.createElement('br', null),
			React.createElement('br', null),
			React.createElement(SafrnResponse, { data: data }),
			React.createElement('span', { id: 's_q' }),
			React.createElement('br', null),
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