var MultipleTables = React.createClass({
	
	getInitialState: function(){
		return ({data:{}, tableData:null,tableHeadingData:null, tableInfo:null});
	},
	
	componentDidMount: function(){
		if(this.isMounted()){
			this.setState({data:this.props.data}, function stateUpdate(){
				var data = this.state.data;
				if(typeof data !== "undefined" && typeof data.success !== "undefined"){
					if( typeof data !== "undefined" && data.success){
						 if (data.iv.length == 3){
							this.createTables(data.data);
						}
					}
				}
			});
		}
	},

	componentWillReceiveProps: function(newProps){ 
		if(this.state.data !== newProps.data){
			this.setState({data: newProps.data}, function stateUpdate(){
				var data = this.state.data;
				if(typeof data !== "undefined" && typeof data.success !== "undefined"){
					if( typeof data !== "undefined" && data.success){
						 if (data.iv.length == 3){
							this.createTables(data.data);
						}
					}
				}
			});
		}
	},
	
	createTables: function(data){
		var tableData = [], tableHeadingData = [];
		var tableNumbers = [];
		var tableNumbersSet = new Set();
		for (i=0; i< data.length; i++){
			tableNumbersSet.add(data[i][2]);
		}
		tableNumbersSet.delete("*");
		tableNumbers = [...tableNumbersSet];
		for (j=0; j< tableNumbers.length; j++){
			var tableDataForEach = [], y = tableNumbers[j];
			for (x=0; x <data.length ; x++){
				if(y == data[x][2]){
					tableDataForEach.push(data[x]);
				}
			}
			tableHeadingData.push(y)
			tableData.push(tableDataForEach);
		}
		this.setState({tableData:tableData, tableHeadingData:tableHeadingData});
	},

	

	render: function(){	
		var data = this.state.data;
		var tableData = this.state.tableData;
		var tableHeadingData = this.state.tableHeadingData;
		var tables = (<div></div>);
		if(tableData != null && tableData !== "undefined"){
			tables = this.state.tableData.map(function(val,i){
				return (<div key={i}><CreateTable data={tableData[i]} originalData={data}/> </div>);
			});
		}
		return (<div className="container">
			{tables}
		</div>);
	}
});