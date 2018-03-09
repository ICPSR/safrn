var SafrnDemo = React.createClass({
	
	getInitialState: function(){
		return ({incomeData:{}, loanData:{}, analysis:'mean', ip:'', port:'',
				s_row:'', selfquery:'',options:[]});
	},
	
	componentDidMount: function(){
		if(this.isMounted()){
			this.loadOptions();
			this.setState({ip:this.props.ip, port:this.props.port});
		}
	},
	
	handleInputChange: function(event){
		const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({ [name]: value});
	},
	
	loadOptions: function(){
		var options = [{"name":"None","value":""},{"name":"School","value":"School"},{"name":"Degree", "value":"Degree"},
			{"name":"Degree by School", "value":"School+Degree"}];
		this.setState({options:options})
	},
	
	makeQuery: function(){
		if (this.state.s_row !== "") {
		  var incomequery = "analysis="+this.state.analysis;
		  incomequery += "&dv=Income2+Income3+Income10"; 
		  incomequery += "&iv="+this.state.s_row;
		  this.loadIncomeData(incomequery);
		  var loanquery = "analysis="+this.state.analysis;
		  loanquery += "&dv=Max_Loan"; 
		  loanquery += "&iv="+this.state.s_row;
		  this.loadLoanData(loanquery);
		} else {
			this.setState({incomeData:{},loanData:{}});
		}
	},
	
	loadIncomeData: function(query){
		var ip = this.state.ip;
		var port = this.state.port;
		$("#pleaseWaitDialog").modal();
		$.ajax({
			url: 'http://54.198.122.48:8080/query?'+query,
			dataType: 'json', 
			type: 'GET',
			success: function(data) {
				$("#pleaseWaitDialog").modal('hide');
			  this.setState({incomeData:data}, function stateUpdate(){
			  });
			}.bind(this),
			error: function(xhr, status, err) {
			  $("#pleaseWaitDialog").modal('hide');
			  console.error(xhr, status, err);
			}.bind(this)
		}); 
	},
	
	loadLoanData: function(query){
		var ip = this.state.ip;
		var port = this.state.port;
		$("#pleaseWaitDialog").modal();
		$.ajax({
			url: 'http://54.198.122.48:8081/query?'+query,
			dataType: 'json', 
			type: 'GET',
			success: function(data) {
				$("#pleaseWaitDialog").modal('hide');
			  this.setState({loanData:data}, function stateUpdate(){
			  });
			}.bind(this),
			error: function(xhr, status, err) {
			  $("#pleaseWaitDialog").modal('hide');
			  console.error(xhr, status, err);
			}.bind(this)
		}); 
	},
	
	render: function(){	
		var options = this.state.options.map(function(val, i){
			return (<option key={i} value={val.value}>{val.name}</option>);
		});
		var incomeData = this.state.incomeData;
		var loanData = this.state.loanData;
		return (
				<div className="container-fluid">
				<div className="page-header">
				 <h1 className="text-center"> Secure Analytics For Reticent Non-consolidated Databases (SAFRN)</h1>
				 <h1 className="row text-center"><small>Statistics computed without sharing private data.</small></h1>
				</div>
					<form className="form-horizontal">

						<fieldset>
							<legend>Please select: </legend>
							  <label>Type: <select name="s_row" id="s_row" onChange={this.handleInputChange}>
							    {options}
							  </select></label> 
						 </fieldset>
						<hr/>
	
					 </form>
					<button id="b_q" onClick={this.makeQuery}>Submit</button><br/>
	
					<br/>
					<InfoTable incomeData={incomeData} loanData={loanData} />
					<hr/>
	
					<hr/>
					<nav className="navbar navbar-default navbar-fixed-bottom">
						<div className="container-fluid row">
							<div className="pull-left">
								<img src="./resources/images/ICPSR_logo_transparent.gif" alt="ICPSR Icon" width="192" height="192"></img>
							</div>
							<div className="pull-left">
								<img src="./resources/images/StealthLogo.png" alt="Stealth Icon" width="192" height="192"></img>
							</div>
							<div className="pull-right">
								<p>SAFRN is supported by 
								<img src="./resources/images/ljaf_logo.gif" alt="Stealth Icon" width="192" height="192"></img></p>
							</div>
						</div>
					</nav>
					<div className="modal hide" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false">
			        <div className="modal-header">
			            <h1>Processing...</h1>
			        </div>
			        <div className="modal-body">
			            <div className="progress progress-striped active">
			                <div className="bar" style={{width: '100%'}}></div>
			            </div>
			        </div>
			    </div>
				
				</div>
		);
	}
});