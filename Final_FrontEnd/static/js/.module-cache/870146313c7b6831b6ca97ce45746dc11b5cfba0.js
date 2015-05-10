window.actions = {}
Page = React.createClass({displayName: "Page",
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
		React.createElement("div", {className: "pure-g layout"}, 
			React.createElement(Repositories, null), 
			React.createElement(Contents, {content_id: this.state.content_id}), 
			React.createElement("h1", null, "\"Hello\"")
		)
		)
	}
})