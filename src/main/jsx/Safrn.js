var Safrn = React.createClass({
	
	getInitialState: function(){
		return ({data:{}, analysis:'freq', ip:'10.0.75.2', port:'9000', income:false,
				s_row:'',s_col:'',s_str:'', selfquery:'',options:[]});
	},
	
	componentDidMount: function(){
		if(this.isMounted()){
			this.loadOptions();
		}
	},
	
	handleInputChange: function(event){
		const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({ [name]: value});
	},
	
	loadOptions: function(){
		var options = [{"name":"None","value":""},{"name":"Attrib_A", "value":"Attrib_A"},
			{"name":"Attrib_B", "value":"Attrib_B"},{"name":"Group_X", "value":"Group_X"}];
		this.setState({options:options})
	},
	
	makeCustomQuery: function(){
		  var mainquery = this.state.selfquery;
		  this.loadData(mainquery);
	},
	
	makeQuery: function(){
		  var mainquery = "analysis="+this.state.analysis;
		  if(this.state.income){
			  mainquery += "&dv=Income"; 
		  }
		  if (this.state.s_row !== "") {
		    mainquery += "&iv="+this.state.s_row;
		    if (this.state.s_col !== "") {
		      mainquery += "+"+this.state.s_col;
		      if (this.state.s_str !== "") {
		        mainquery += "+"+this.state.s_str;
		      }
		    }
		  }
		  this.loadData(mainquery);
	},
	
	loadData: function(query){
		var ip = this.state.ip;
		var port = this.state.port;
		$.ajax({
			url: 'http://'+ip+':'+port+'/query?'+query,
			dataType: 'json', 
			type: 'GET',
			success: function(data) {
			  this.setState({data:data}, function stateUpdate(){
				 /* if(this.state.data.success){
					  document.getElementById("s_q").innerHTML =  "<pre>"+this.state.data.data+"</pre>" + document.getElementById("s_q").innerHTML;
				  } else {
					  document.getElementById("s_q").innerHTML =  "<pre>"+this.state.data.error+"</pre>" + document.getElementById("s_q").innerHTML;
				  }*/
			  });
			}.bind(this),
			error: function(xhr, status, err) {
			  console.error(xhr, status, err);
			  alert(err);
			}.bind(this)
		}); 
	},
	
	render: function(){	
		var options = this.state.options.map(function(val, i){
			return (<option key={i} value={val.value}>{val.name}</option>);
		});
		var data = this.state.data;
		return (
				<div className="container-fluid">
				<label htmlFor="rest_server">REST Server IP:</label><input type="text" id="rest_server" name="ip" placeholder = "0.0.0.0" onChange={this.handleInputChange}/> 
				<label htmlFor="rest_port">REST Server Port:</label><input type="text" id="rest_port" name="port" placeholder = "8080" onChange={this.handleInputChange}/> <br/>
					<hr/> 
					<form className="form-horizontal">
						<div className="form-group">
							<fieldset>
								<legend>Analysis: </legend>
								  <div className="radio">
								  	<label>Frequency
								  		<input type="radio" name="analysis" id="ro_freq" value="freq" checked={this.state.analysis === 'freq'} onChange={this.handleInputChange}/>
								  	</label>
								  </div>
								  <div className="radio">
								  	<label>Mean
								  		<input type="radio" name="analysis" id="ro_mean" value="mean" checked={this.state.analysis === 'mean'} onChange={this.handleInputChange}/>
								  	</label>
								  </div>
							 </fieldset>
						</div>
			
						<fieldset>
							<legend>Dependent Variables: </legend>
							<div className="checkbox">
								<label>Income
							  		<input type="checkbox" id="c_income" name="income" value="Income" onChange={this.handleInputChange}/>
								</label>
							</div>
						</fieldset>
							<br/>
						<fieldset>
							<legend>Independent Variables: </legend>
							  <label>Variable 1 (Row): <select name="s_row" id="s_row" onChange={this.handleInputChange}>
							    {options}
							  </select></label><br/>
							  <label>Variable 2 (Column): <select name="s_col" id="s_col" onChange={this.handleInputChange}>
							  {options}
							  </select></label><br/>
							 <label> Variable 3 (Stratum): <select name="s_str" id="s_str" onChange={this.handleInputChange}>
							 {options}
							  </select> </label><br/>
						 </fieldset>
						<hr/>
	
					 </form>
					<button id="b_q" onClick={this.makeQuery}>Submit</button><br/>
	
					<br/>
					<input type="text" id="selfquery" name="selfquery" placeholder="/query?" onChange={this.handleInputChange}/>
					<button id="b_s" onClick={this.makeCustomQuery}>Make custom query</button><br/>
					<br/>
					<SafrnResponse data={data}/>
					<span id="s_q"></span><br/>
					<hr/>
	
					<hr/>
					
				</div>
		);
	}
});