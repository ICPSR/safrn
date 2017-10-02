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
		message = message.replace("iv","Independent Variable");
		message = message.replace("dv","Dependent Variable");
		this.setState({message:message});
	},
	
	render: function(){
		var message = this.state.message;
		return (<div>
		<p className="text-error">{message}</p>
		</div>);
	}
	
});