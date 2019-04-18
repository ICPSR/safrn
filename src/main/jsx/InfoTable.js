var InfoTable = React.createClass({
	
	getInitialState: function(){
		return ({incomeData2:{},incomeData3:{},incomeData10:{}, loanData:{}, labels:[], data:[]});
	},
	
	componentDidMount: function(){
		if(this.isMounted()){
			this.loadLabels();
			if(typeof this.props.incomeData2.data !== "undefined" || typeof this.props.incomeData3.data !== "undefined" || 
					typeof this.props.incomeData10.data !== "undefined" ||typeof this.props.loanData.data !== "undefined"){
				this.setState({loanData:this.props.loanData, incomeData2:this.props.incomeData2, 
					incomeData3:this.props.incomeData3, incomeData3:this.props.incomeData3}, function stateUpdate(){
					this.mergeData();
				});
			}
		}
	},
	
	componentWillReceiveProps: function(newProps){
		if(typeof newProps.incomeData2.data !== "undefined" && typeof newProps.loanData.data !== "undefined"){
			if( JSON.stringify(this.state.incomeData2) !== JSON.stringify(newProps.incomeData2) && JSON.stringify(this.state.incomeData3) !== JSON.stringify(newProps.incomeData3) &&
					JSON.stringify(this.state.incomeData10) !== JSON.stringify(newProps.incomeData10) && JSON.stringify(this.state.loanData) !== JSON.stringify(newProps.loanData)){
				this.setState({loanData:newProps.loanData, incomeData2:newProps.incomeData2, incomeData3:newProps.incomeData3, incomeData10:newProps.incomeData10}, function stateUpdate(){
					this.mergeData();
				});
			}
		} else {
			this.setState({data:[],incomeData2:{},incomeData3:{},incomeData10:{}, loanData:{}});
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
		var finalData=[];
		var formatData=[];
		var loanData = this.state.loanData.data;
		var incomeData2 = this.state.incomeData2.data;
		var incomeData3 = this.state.incomeData3.data;
		var incomeData10 = this.state.incomeData10.data;
		var iv = this.state.incomeData2.iv;
		var selectedVariable = "";
		if(iv.length == 1){
			selectedVariable = iv[0];
		} else if (iv.length == 2 ){
			
		}
		for(i=0; i< incomeData2.length; i++){
			if(selectedVariable != ""){
				var dataArray = [loanData[i][0], loanData[i][1][0], loanData[i][1][1], incomeData2[i][1], incomeData3[i][1], incomeData10[i][1][0], incomeData10[i][1][1] ];
			} else {
				var dataArray = [loanData[i][0], loanData[i][1],  loanData[i][2][0], loanData[i][2][1],incomeData2[i][2], incomeData3[i][2], incomeData10[i][2][0], incomeData10[i][2][1] ];
			}
			
			finalData.push(dataArray);
		}
		if(selectedVariable === "School"){
			for (i=0; i< finalData.length; i++){
				var x = finalData[i];
				x.splice(x.length-6,0,"*");
				formatData.push(x);
			}
		} else if (selectedVariable === "Degree"){
			for (i=0; i< finalData.length; i++){
				var x = finalData[i];
				x.splice(0,0,"*");
				formatData.push(x);
			}
		} else {
			formatData = finalData;
		}
		this.formatData(formatData);
	},
	
	formatData: function(data){
		var labels = this.state.labels;
		var incomeData = this.state.incomeData2;
		var schoolNames = labels[2];
		var degreeNames = labels[1];
		for (i=0; i< data.length; i++){
			var x = data[i][0];
			var y = data[i][1];
			var loan = data[i][2];
			var avgLoan = data[i][3];
			var income2 = data[i][4];
			var income3 = data[i][5];
			var income10 = data[i][6];
			var avgIncome = data[i][7];
			if(x == "*"){
				data[i].splice(0,1,schoolNames.options[x]);
			}
			if(y == "*"){
				data[i].splice(1,1,degreeNames.options[y]);
			}
			data[i].splice(2,1,loan.toFixed(2));
            data[i].splice(4,1,income2.toFixed(2));
            data[i].splice(5,1,income3.toFixed(2));
			data[i].splice(6,1,income10.toFixed(2));

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
	            { title: "N for Average loans" },
	            { title: "Average Income 2 years after graduation" },
	            { title: "Average Income 3 years after graduation" },
	            { title: "Average Income 10 years after graduation" },
	            { title: "N for average income" }
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
			<th scope="col">N for Average loans</th>
			<th scope="col">Average Income 2 years after graduation</th>
			<th scope="col">Average Income 3 years after graduation</th>
			<th scope="col">Average Income 10 years after graduation</th>
			<th scope="col">N for average income</th>
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