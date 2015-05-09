Repository = React.createClass({displayName: "Repository",
	handleClick : function(){
		window.actions.changeContent(this.props.name);
		window.actions.changeRepoFocus(this.props.name);
	},
	render : function(){
		return (React.createElement("li", null, 
					React.createElement("a", {href: "#", class: "waves-effect waves-light btn-flat", onClick: this.handleClick}, 
						this.props.name
					)
				))
	}
})