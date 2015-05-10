var AddContentModal = React.createClass({displayName: "AddContentModal",
	getInitialState : function(){
		return {
			html : "",
			url : ""
		};
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
					React.createElement("iframe", {seamless: true, refs: "hello"})
				), 
				React.createElement("div", {className: "modal-footer"}, 
					React.createElement("a", {className: "waves-effect btn-flat", onClick: this.handleCancel}, "Cancel ", React.createElement("i", {className: "fa fa-times"})), 
					React.createElement("a", {className: "waves-effect btn-flat", onClick: this.handleConfirm}, "Confirm ", React.createElement("i", {className: "fa fa-check"}))
				)
			)
		)
	}
});
function traverse(node, label, queue){
	queue = queue;
	node.attr("label", label);
	$(this).unbind();
	$(this).click((function(){
		queue.push(this.html());
		if (this.attr("label")=="0"){
			console.log(queue);
		}
	}).bind(node))
}