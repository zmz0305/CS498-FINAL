var AddRepoModal = React.createClass({
	getInitialState : function(){
		return {};
	},
	handleCancel: function(){
		window.actions.closeModal();
	},
	handleConfirm : function(){
		$.post('/api/user/', 
			{
				action : "add_repo",
				data : {
					url : this.refs.repo_name.getValue(),
					name : this.refs.repo_name.getValue()
				}
			}, 
			function(data){
				window.actions.closeModal();
				window.actions.refreshRepositories();
			});
	},
	render : function(){
		return (
			<div className="modal-content">
				<div className="container">
					<h3>New Repository</h3>
					<Input value="" ref="repo_name" label="Repository Name"/>
					<Input value="" ref="repo_url" label="Your Repository Start URL" />
				</div>
				<div className="row">
					<div className="s12 right-align">
						<a className="waves-effect btn-flat" onClick={this.handleCancel}>Cancel <i className="fa fa-times"></i></a>
						<a className="waves-effect btn-flat" onClick={this.handleConfirm}>Confirm <i className="fa fa-check"></i></a>
					</div>
				</div>
			</div>
		)
	}
});