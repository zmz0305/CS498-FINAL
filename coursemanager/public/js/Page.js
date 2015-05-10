window.actions = {}
Page = React.createClass({displayName: "Page",
	getInitialState: function() {
		// window.actions.changeContent = this.changeContent;
	    return {
	    	// content_ids : [],
	    	// repo_name : ""
	    }
	},
	render : function(){
		
		var content = React.createElement(Contents, {content_ids: this.state.content_ids, key: this.state.repo_id, repo_name: this.state.repo_name});
		return(
		React.createElement("div", null, 
			React.createElement("header", null, 
				React.createElement(Repositories, null)
			), 
			React.createElement("main", {id: "main"}, 
				React.createElement(Contents, null)
			), 
			React.createElement(Modal, null), 
			React.createElement(Toast, null)
		)
		);
	}
})