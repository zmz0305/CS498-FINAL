var ConfirmationModal = React.createClass({
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
			<div>
				<div className="modal-content">
					<div className="container">
						<h3>{this.props.children}</h3>
					</div>
				</div>
				<div className="modal-footer">
					<div className="s12 right-align">
						<a className="waves-effect btn-flat grey-text" onClick={this.handleCancel}>Cancel <i className="fa fa-times"></i></a>
						<a className="waves-effect btn-flat red-text" onClick={this.handleConfirm}>Confirm <i className="fa fa-check"></i></a>
					</div>
				</div>
			</div>
		)
	}
});