var SafrnDemo = React.createClass({
	
	getInitialState: function(){
		return ({incomeData2:{}, incomeData3:{}, incomeData10:{},  loanData:{}, analysis:'mean', ip:'', port:'',
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
		this.setState({s_row:selectedValue})
	},
	
	loadOptions: function(){
		var options = [{"name":"None","value":""},{"name":"School","value":"School"},{"name":"Degree", "value":"Degree"},
			{"name":"Degree by School", "value":"School+Degree"}];
		this.setState({options:options})
	},
	
	makeQuery: function(){
		if (this.state.s_row !== "") {
		  var loanquery = "analysis="+this.state.analysis;
		  loanquery += "&iv="+this.state.s_row;
		  loanquery += "&dv=Max_Loan"; 
		  loanquery += "&loanlink=1&countonlymean=2";
		  
		  var incomequery2 = "analysis="+this.state.analysis;
		  incomequery2 += "&iv="+this.state.s_row;
		  incomequery2 += "&dv=Income2&countonlymean=0"; 
		  
		  var incomequery3 = "analysis="+this.state.analysis;
		  incomequery3 += "&iv="+this.state.s_row;
		  incomequery3 += "&dv=Income3&countonlymean=0"; 
		  
		  var incomequery10 = "analysis="+this.state.analysis;
		  incomequery10 += "&iv="+this.state.s_row;
		  incomequery10 += "&dv=Income10&countonlymean=2"; 
		  
		  this.loadIncome2Data(incomequery2);
		  this.loadIncome3Data(incomequery3);
		  this.loadIncome10Data(incomequery10); 
		  this.loadLoanData(loanquery);
		} else {
			this.setState({incomeData2:{}, incomeData3:{}, incomeData10:{},loanData:{}});
		}
	},
	
	loadIncome2Data: function(query){
		var ip = this.state.ip;
		var port = this.state.port;
		var start_time = new Date().getTime();
		$("#pleaseWaitDialog").modal();
		$.ajax({
			url: 'http://'+ip+':8090/query?'+query,
			dataType: 'json', 
			type: 'GET',
			success: function(data) {
				this.setState({incomeData2:data});
			}.bind(this),
			error: function(xhr, status, err) {
			  $("#pleaseWaitDialog").modal('hide');
			  console.error(xhr, status, err);
			}.bind(this)
		}); 
	},
	
	loadIncome3Data: function(query){
		var ip = this.state.ip;
		var port = this.state.port;
		var start_time = new Date().getTime();
		$("#pleaseWaitDialog").modal();
		$.ajax({
			url: 'http://'+ip+':8090/query?'+query,
			dataType: 'json', 
			type: 'GET',
			success: function(data) {
				$("#pleaseWaitDialog").modal('hide');
				this.setState({incomeData3:data});
			}.bind(this),
			error: function(xhr, status, err) {
			  $("#pleaseWaitDialog").modal('hide');
			  console.error(xhr, status, err);
			}.bind(this)
		}); 
	},
	
	loadIncome10Data: function(query){
		var ip = this.state.ip;
		var port = this.state.port;
		var start_time = new Date().getTime();
		$("#pleaseWaitDialog").modal();
		$.ajax({
			url: 'http://'+ip+':8090/query?'+query,
			dataType: 'json', 
			type: 'GET',
			success: function(data) {
				$("#pleaseWaitDialog").modal('hide');
				var request_time = new Date().getTime() - start_time;
				this.setState({incomeData10:data, incomeComputeTime:"Total time to compute Income data: "+(request_time/1000).toFixed(2) + " seconds for "+this.state.s_row});

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
			url: 'http://'+ip+':8091/query?'+query,
			dataType: 'json', 
			type: 'GET',
			success: function(loanData) {
				var request_time = new Date().getTime() - start_time;
			  this.setState({loanData:loanData, loanComputeTime:"Total time to compute Loan data: "+(request_time/1000).toFixed(2)+ " seconds for "+this.state.s_row});
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
		var incomeData2 = this.state.incomeData2;
		var incomeData3 = this.state.incomeData3;
		var incomeData10 = this.state.incomeData10;
		var loanData = this.state.loanData;
		var loanComputeTime = this.state.loanComputeTime;
		var incomeComputeTime = this.state.incomeComputeTime;
		return (
				<div className="container-fluid">
				<div className="page-header">
				 <h1 className="text-center"> Secure Analytics For Reticent Non-consolidated Databases (SAFRN)</h1>
				 <h1 className="row text-center"><small>Statistics computed without sharing private data.</small></h1>
				</div>
					<legend>Please select type: </legend>
			          <label className="radio-inline control-label">
			            <input type="radio" name="radioOptions" id="None" value="" checked={this.state.s_row === ""} onChange={this.changeValue}/>
			            None
			          </label>
			          <label  className="radio-inline control-label">
			            <input type="radio" name="radioOptions" id="School" value="School" onChange={this.changeValue}/>
			            School
			          </label>
			          <label  className="radio-inline control-label">
			            <input type="radio" name="radioOptions" id="Degree" value="Degree" onChange={this.changeValue}/>
			            Degree
			          </label>
			          <label  className="radio-inline control-label">
			            <input type="radio" name="radioOptions" id="DegreeSchool" value="School+Degree" onChange={this.changeValue}/>
			            Degree by School
			          </label>
						<hr/>
	
					<button id="b_q" onClick={this.makeQuery}>Submit</button><br/>
	
					<br/>
					<InfoTable incomeData2={incomeData2} incomeData3={incomeData3} incomeData10={incomeData10} loanData={loanData} />
					<hr/>
					<legend>Timings: </legend>
					{loanComputeTime}<br/>
					{incomeComputeTime}
					<hr/>
					<footer>
						<div className="row">
							<div className="col-md-2">
								<img className="img-responsive" src="./resources/images/ICPSR_logo_transparent.gif" alt="ICPSR Icon"></img>
							</div>
							<div className="col-md-4">
								<img className="img-responsive" src="./resources/images/StealthLogo.png" alt="Stealth Icon" ></img>
							</div>
							<div className="col-md-6">
							<div className="span4 pull-right">
							<p>SAFRN is supported by</p>
								<img className="img-responsive img-right" src="./resources/images/ljaf_logo.gif" alt="Stealth Icon"></img>
							</div>
							</div>
						</div>
					
					</footer>
					<div className="modal" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false">
					<div className="modal-content"> 
				        <div className="modal-header">
				            <h1>Processing...</h1>
				        </div>
				        <div className="modal-body">
				            <div className="progress progress-striped active">
				                <div className="progress-bar" style={{width: '100%'}}></div>
				            </div>
				        </div>
			        </div>
			    </div>
				
				</div>
		);
	}
});