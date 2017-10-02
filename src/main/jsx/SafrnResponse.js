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
		var data = this.state.data;
		if(data != newProps.data){
			this.setState({data: newProps.data});
		}
	},

	render: function(){	
		var data = this.state.data;
		var info = (<div></div>);
		var table = (<div></div>);
		if(typeof data.success !== "undefined"){
			if( data.success){
				info = (<div></div>);
				if( typeof data.iv !== "undefined"){
					 if (data.iv.length > 0 && data.iv.length < 3){
						table = (<CreateTable data={data}/>);
					} else {
						table = (<MultipleTables data={data}/>);
					}
				} else {
					table = (<CreateTable data={data}/>);
				}
			} else {
				info = (<ErrorMessage errorMsg={data.error}/>);
			}
		}
		return (
				<div className="container-fluid">
				<legend> Response: </legend>
					{info}
					{table}
				</div>
		);
	}
});