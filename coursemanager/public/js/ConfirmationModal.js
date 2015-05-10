var ConfirmationModal = React.createClass({displayName: "ConfirmationModal",
	getInitialState : function(){
		return {};
	},
	handleCancel: function(){
		window.actions.closeModal();
	},
	handleConfirm : function(){
		this.props.execute();
		window.actions.closeModal();
	},
	render : function(){
		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "modal-content"}, 
					React.createElement("div", {className: "container"}, 
						React.createElement("h3", null, this.props.children)
					)
				), 
				React.createElement("div", {className: "modal-footer"}, 
					React.createElement("div", {className: "s12 right-align"}, 
						React.createElement("a", {className: "waves-effect btn-flat grey-text", onClick: this.handleCancel}, "Cancel ", React.createElement("i", {className: "fa fa-times"})), 
						React.createElement("a", {className: "waves-effect btn-flat red-text", onClick: this.handleConfirm}, "Confirm ", React.createElement("i", {className: "fa fa-check"}))
					)
				)
			)
		)
	}
});