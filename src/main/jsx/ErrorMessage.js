var ErrorMessage = React.createClass({
	
	getInitialState: function(){
		return ({message:''});
	},
	
	componentDidMount: function(){
		if(this.isMounted()){
			this.setState({message:this.props.errorMsg}, function stateUpdate() {
				this.formatMsg();
			});
		}
	},

	componentWillReceiveProps: function(newProps){
		var message = this.state.message;
		if(message != newProps.errorMsg){
			this.setState({message: newProps.errorMsg}, function stateUpdate() {
				this.formatMsg();
			});
		}
	},
	
	formatMsg: function(){
		var message = this.state.message;
		message = message.replace("Attrib_A","Sex");
		message = message.replace("Attrib_B","Major");
		message = message.replace("Group_X","School");
		message = message.replace("iv","independent variable");
		message = message.replace("dv","dependent variable");
		message = message.replace("ERROR: Need dependent variable for mean analysis","ERROR: Please select a dependent variable for computing means");
		this.setState({message:message});
	},
	
	render: function(){
		var message = this.state.message;
		return (<div>
		<h3><p className="text-error"><b>{message}</b></p></h3>
		</div>);
	}
	
});