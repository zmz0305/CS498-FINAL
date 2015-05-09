Content = React.createClass({
	getInitialState: function() {
	    return {
	      showContent : false
	    };
	},
	toggle: function(event){
		if (!this.state.showContent){
			this.setState({showContent : true});
		}else{
			this.setState({showContent : false});
		}
	},
	deleteContent: function(event){
		var del = function(){
			console.log("deleted!");
		}
		var dom = (<ConfirmationModal execute={del}>Are you sure you want to delete it?</ConfirmationModal>);
		window.actions.changeModal(dom);
	},
	render: function(){
		var cx = React.addons.classSet;
		var open = this.state.showContent ? "open" : "close";
		return (
			<div>
				<li>
					<div className="collapsible-header">
						<div className="row">
							<div className="col s10" onClick={this.toggle}>
								<i className="fa fa-bookmark"></i>
								{this.props.name}
							</div>
							<div className="col s2 right-align">
								<a className="btn-flat" onClick={this.deleteContent}>
									<i className="fa fa-trash"></i>
								</a>

							</div>
						</div>
					</div>
					<div className={"collapsible-body "+open}><p>Lorem ipsum dolor sit amet.</p></div>
				</li>
			</div>
			);
	}
})