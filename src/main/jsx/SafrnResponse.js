var SafrnResponse = React.createClass({
	
	getInitialState: function(){
		return ({data:{}});
	},
	
	componentDidMount: function(){
		if(this.isMounted()){
			this.setState({data:this.props.data});
		}
	},

	componentWillReceiveProps: function(newProps){
		this.setState({data: newProps.data});
	},

	render: function(){	
		var data = this.state.data;
		var info = (<div></div>);
		if(typeof data.success !== "undefined"){
			if( data.success){
				info = (<div></div>);
			} else {
				info = (<div><p className="text-danger">{data.error}</p></div>);
			}
		}
		return (
				<div className="container-fluid">
				<legend> Response: </legend>
					{info}
					<CreateTable data={data}/>
				</div>
		);
	}
});