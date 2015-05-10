var AddContentModal = React.createClass({
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
			<div>
				<div className="modal-content">
					<iframe seamless src="https://courses.engr.illinois.edu/cs498374/" />
				</div>
				<div className="modal-footer">
					<a className="waves-effect btn-flat" onClick={this.handleCancel}>Cancel <i className="fa fa-times"></i></a>
					<a className="waves-effect btn-flat" onClick={this.handleConfirm}>Confirm <i className="fa fa-check"></i></a>
				</div>
			</div>
		)
	}
});