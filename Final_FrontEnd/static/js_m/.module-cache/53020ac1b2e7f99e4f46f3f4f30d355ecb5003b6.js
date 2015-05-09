window.actions = {}
Page = React.createClass({displayName: "Page",
	getInitialState: function() {
		window.actions.changeContent = this.changeContent;
	    window.actions.openModal = this.openModal;
	    return {
	    	content_id : "CS374",

	    }
	},
	changeContent : function(content_id){
		console.log(content_id);
		this.setState({content_id : content_id});
	},
	render : function(){
		var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
		var content = [React.createElement(Contents, {content_id: this.state.content_id, key: this.state.content_id})];
		return(
		React.createElement("div", null, 
			React.createElement("header", null, 
				React.createElement(Repositories, null)
			), 
			React.createElement("main", {id: "main"}, 
				React.createElement(ReactCSSTransitionGroup, {transitionName: "content-change", transitionLeave: false}, 
					content
				)
			)

		)
		)
	}
})