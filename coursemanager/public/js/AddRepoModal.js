var AddRepoModal = React.createClass({displayName: "AddRepoModal",
	getInitialState : function(){
		return {};
	},
	handleCancel: function(){
		window.actions.closeModal();
	},
	handleConfirm : function(){
		window.actions.closeModal();
		window.actions.refreshRepositories();
	},
	render : function(){
		return (
			React.createElement("div", {className: "modal-content"}, 
				React.createElement("div", {className: "container"}, 
					React.createElement("h3", null, "New Repository"), 
					React.createElement(Input, {value: "", ref: "repo_name", label: "Repository Name"}), 
					React.createElement(Input, {value: "", ref: "repo_url", label: "Your Repository Start URL"})
				), 
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {className: "s12 right-align"}, 
						React.createElement("a", {className: "waves-effect btn-flat", onClick: this.handleCancel}, "Cancel ", React.createElement("i", {className: "fa fa-times"})), 
						React.createElement("a", {className: "waves-effect btn-flat", onClick: this.handleConfirm}, "Confirm ", React.createElement("i", {className: "fa fa-check"}))
					)
				)
			)
		)
	}
});