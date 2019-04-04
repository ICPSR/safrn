var InfoTable = React.createClass({
	
	getInitialState: function(){
		return ({incomeData:{}, loanData:{}, labels:[], data:[]});
	},
	
	componentDidMount: function(){
		if(this.isMounted()){
			this.loadLabels();
			if(typeof this.props.incomeData.data !== "undefined" || typeof this.props.loanData.data !== "undefined"){
				this.setState({loanData:this.props.loanData, incomeData:this.props.incomeData}, function stateUpdate(){
					this.mergeData();
				});
			}
		}
	},
	
	componentWillReceiveProps: function(newProps){
		if(typeof newProps.incomeData.data !== "undefined" && typeof newProps.loanData.data !== "undefined"){
			if( JSON.stringify(this.state.incomeData) !== JSON.stringify(newProps.incomeData) && JSON.stringify(this.state.loanData) !== JSON.stringify(newProps.loanData)){
				this.setState({loanData:newProps.loanData, incomeData:newProps.incomeData}, function stateUpdate(){
					this.mergeData();
				});
			}
		} else {
			this.setState({data:[],incomeData:{}, loanData:{}});
		}
	},
	
	loadLabels: function(){
		var labels = [{"name":"Sex", "value":"Sex", "options":{"1": "Female","2": "Male","*":"Total"}},
			{"name":"Degree", "value":"Degree","options":{"1": "None","2": "Associate","3": "Bachelor","4": "Graduate","5": "Other","*":"Total"}},
			{"name":"School", "value":"School","options":{"1": "Gryffindor","2": "Ravenclaw","3": "Hufflepuff","4":"Slytherin","*":"Total"}}];
		this.setState({labels:labels});
	},
	
	mergeData: function(){
		var data=[];
		var formatData=[];
		var loanData = this.state.loanData.data;
		var incomeData = this.state.incomeData.data;
		for (i=0; i< incomeData.length; i++){
			var x = incomeData[i];
			var y = loanData[i];
			x.splice(x.length-3,0,y[y.length-1]);
			data.push(x);
		}
		var iv = this.state.incomeData.iv;
		var selectedVariable = "";
		if(iv.length == 1){
			selectedVariable = iv[0];
		} else if (iv.length == 2 ){
			
		}
		if(selectedVariable === "School"){
			for (i=0; i< data.length; i++){
				var x = data[i];
				x.splice(x.length-4,0,"*");
				formatData.push(x);
			}
		} else if (selectedVariable === "Degree"){
			for (i=0; i< data.length; i++){
				var x = data[i];
				x.splice(0,0,"*");
				formatData.push(x);
			}
		} else {
			formatData = data;
		}
		this.formatData(formatData);
	},
	
	formatData: function(data){
		var labels = this.state.labels;
		var incomeData = this.state.incomeData;
		var schoolNames = labels[2];
		var degreeNames = labels[1];
		for (i=0; i< data.length; i++){
			var x = data[i][0];
			var y = data[i][1];
			var loan = data[i][2];
			var income2 = data[i][3];
			var income3 = data[i][4];
			var income10 = data[i][5];
			if(x == "*"){
				data[i].splice(0,1,schoolNames.options[x]);
			}
			if(y == "*"){
				data[i].splice(1,1,degreeNames.options[y]);
			}
			data[i].splice(2,1,loan.toFixed(2));
			data[i].splice(3,1,income2.toFixed(2));
			data[i].splice(4,1,income3.toFixed(2));
			data[i].splice(5,1,income10.toFixed(2));
		}
		this.setState({data:data}, function stateUpdate(){
			this.createTable();
		});
	},
	
	createTable: function(){
		var infoTable = $('#infoTable').DataTable({
			destroy: true,
			data: this.state.data,
			columns: [
	            { title: "Institution" },
	            { title: "Degree" },
	            { title: "Average Loan" },
	            { title: "Average Income 2 years after graduation" },
	            { title: "Average Income 3 years after graduation" },
	            { title: "Average Income 10 years after graduation" }
	        ],
			buttons: ['copy','csv', 'print']
		});
		infoTable.buttons().container().insertBefore( '#infoTable_filter' );
	},
	
	render: function(){
		var data = this.state.data;
		var table = (<div></div>);
		if (data.length > 0){
			table = (<div className="row">
			<table className="table table-hover" id="infoTable"  style={{width:"100%"}}>
			<thead>
			<tr>
			<th scope="col">Institution</th>
			<th scope="col">Degree</th>
			<th scope="col">Average Loan</th>
			<th scope="col">Average Income 2 years after graduation</th>
			<th scope="col">Average Income 3 years after graduation</th>
			<th scope="col">Average Income 10 years after graduation</th>
			</tr>
			</thead>
			<tbody></tbody></table>
			</div>);
		}
		return(
				<div className="container">
				<br/>
				{table}
		</div>
		);
	}
	
});