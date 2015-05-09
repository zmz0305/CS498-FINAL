Repository = React.createClass({
	handleClick : function(){
		window.actions.changeContent(this.props.name);
		window.actions.changeRepoFocus(this.props.name);
	},
	handleDelete : function(event){
		console.log("je");
		var del = function(){
			console.log("deleted!");
		}
		var dom = (<ConfirmationModal execute={del}>Are you sure you want to delete it?</ConfirmationModal>);
		window.actions.changeModal(dom);
		event.stopPropagation();
	},
	render : function(){
		var color = this.props.focus ? "light-blue lighten-4 white-text" : "";
		return (<li className={"collection-item "+color} onClick={this.handleClick}>
					<div className="secondary-content" onClick={this.handleDelete}>
						<i className="fa fa-times"></i>
					</div>
					{this.props.name}
				</li>)
	}
})