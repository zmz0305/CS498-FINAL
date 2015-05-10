var AddContentModal = React.createClass({
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
			<div>
				<div className="modal-content">
					<iframe seamless refs="hello" />
				</div>
				<div className="modal-footer">
					<a className="waves-effect btn-flat" onClick={this.handleCancel}>Cancel <i className="fa fa-times"></i></a>
					<a className="waves-effect btn-flat" onClick={this.handleConfirm}>Confirm <i className="fa fa-check"></i></a>
				</div>
			</div>
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