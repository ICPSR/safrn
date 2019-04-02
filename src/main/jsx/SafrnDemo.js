var SafrnDemo = React.createClass({
	
	getInitialState: function(){
		return ({incomeData:{}, loanData:{}, analysis:'mean', ip:'', port:'',
				s_row:'', loanComputeTime:"", incomeComputeTime:"", selfquery:'',options:[]});
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
	
	changeValue: function(event){
		var radioId = event.target.id;
		var value = "N";
		var selectedValue=event.target.value;
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
		this.setState({s_row:selectedValue})
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
		  incomequery += "&countonlymean=1";
		  this.loadIncomeData(incomequery);
		  var loanquery = "analysis="+this.state.analysis;
		  loanquery += "&dv=Max_Loan"; 
		  loanquery += "&iv="+this.state.s_row;
		  loanquery += "&countonlymean=0&loanlink=1";
		  this.loadLoanData(loanquery);
		} else {
			this.setState({incomeData:{},loanData:{}});
		}
	},
	
	loadIncomeData: function(query){
		var ip = this.state.ip;
		var port = this.state.port;
		var start_time = new Date().getTime();
		$("#pleaseWaitDialog").modal();
		$.ajax({
			url: 'http://'+ip+':8080/query?'+query,
			dataType: 'json', 
			type: 'GET',
			success: function(data) {
				$("#pleaseWaitDialog").modal('hide');
				var request_time = new Date().getTime() - start_time;
			  this.setState({incomeData:data, incomeComputeTime:"Total time to compute Income data: "+(request_time/1000).toFixed(2) + " seconds for "+this.state.s_row}, function stateUpdate(){
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
		var start_time = new Date().getTime();
		$("#pleaseWaitDialog").modal();
		$.ajax({
			url: 'http://'+ip+':8081/query?'+query,
			dataType: 'json', 
			type: 'GET',
			success: function(data) {
				$("#pleaseWaitDialog").modal('hide');
				var request_time = new Date().getTime() - start_time;
			  this.setState({loanData:data, loanComputeTime:"Total time to compute Loan data: "+(request_time/1000).toFixed(2)+ " seconds for "+this.state.s_row}, function stateUpdate(){
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
		var loanComputeTime = this.state.loanComputeTime;
		var incomeComputeTime = this.state.incomeComputeTime;
		return (
				<div className="container-fluid">
				<div className="page-header">
				 <h1 className="text-center"> Secure Analytics For Reticent Non-consolidated Databases (SAFRN)</h1>
				 <h1 className="row text-center"><small>Statistics computed without sharing private data.</small></h1>
				</div>
					<form className="form-horizontal">
					<legend>Please select type: </legend>
					 <div className="radio">
			          <label>
			            <input type="radio" name="radioOptions" id="None" value="" checked={this.state.s_row === ""} onChange={this.changeValue}/>
			            None
			          </label>
			        </div>
			        <div className="radio">
			          <label>
			            <input type="radio" name="radioOptions" id="School" value="School" onChange={this.changeValue}/>
			            School
			          </label>
			        </div>
			        <div className="radio">
			          <label>
			            <input type="radio" name="radioOptions" id="Degree" value="Degree" onChange={this.changeValue}/>
			            Degree
			          </label>
			        </div>
			        <div className="radio">
			          <label>
			            <input type="radio" name="radioOptions" id="DegreeSchool" value="School+Degree" onChange={this.changeValue}/>
			            Degree by School
			          </label>
			        </div>
						<hr/>
	
					 </form>
					<button id="b_q" onClick={this.makeQuery}>Submit</button><br/>
	
					<br/>
					<InfoTable incomeData={incomeData} loanData={loanData} />
					<hr/>
					<legend>Timings: </legend>
					{loanComputeTime}<br/>
					{incomeComputeTime}
					<hr/>
					<footer>
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
					
					</footer>
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