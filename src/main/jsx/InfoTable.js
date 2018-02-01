var InfoTable = React.createClass({
	
	getInitialState: function(){
		return ({data:{}});
	},
	
	componentDidMount: function(){
		if(this.isMounted()){
			this.setState({data:this.props.data});
			this.createTable();
		}
	},
	
	createTable: function(){
		var datatable = $('#infoTable').DataTable({
			destroy: true,
			data: this.state.data
		});
	},
	
	render: function(){
		return(
		<div>
		<table className="table table-hover" id="infoTable">
		<thead><tr><th scope="col">Institution</th><th scope="col">Major</th><th scope="col">Average Loan</th><th scope="col">Average Income 2 years after graduation</th><th scope="col">Average Income 5 years after graduation</th><th scope="col">Average Income 10 years after graduation</th></tr></thead>
		<tbody></tbody></table>
		</div>
		);
	}
	
});