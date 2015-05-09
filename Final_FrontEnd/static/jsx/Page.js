window.actions = {}
Page = React.createClass({
	getInitialState: function() {
		window.actions.changeContent = this.changeContent;
	    return {
	    	content_id : "CS374",

	    }
	},
	changeContent : function(content_id){
		console.log(content_id);
		this.setState({content_id : content_id});
	},
	render : function(){
		return(
		<div className="pure-g layout">
			<Repositories />
			<Contents content_id={this.state.content_id}/>
		</div>
		)
	}
})