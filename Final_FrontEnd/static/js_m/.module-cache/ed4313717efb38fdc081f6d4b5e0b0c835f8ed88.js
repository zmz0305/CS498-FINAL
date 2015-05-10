var AddContentModal = React.createClass({displayName: "AddContentModal",
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
			React.createElement("div", null, 
				React.createElement("div", {className: "modal-content"}, 
					React.createElement("iframe", {seamless: true, src: "https://courses.engr.illinois.edu/cs498374/"})
				), 
				React.createElement("div", {className: "modal-footer"}, 
					React.createElement("a", {className: "waves-effect btn-flat", onClick: this.handleCancel}, "Cancel ", React.createElement("i", {className: "fa fa-times"})), 
					React.createElement("a", {className: "waves-effect btn-flat", onClick: this.handleConfirm}, "Confirm ", React.createElement("i", {className: "fa fa-check"}))
				)
			)
		)
	}
});