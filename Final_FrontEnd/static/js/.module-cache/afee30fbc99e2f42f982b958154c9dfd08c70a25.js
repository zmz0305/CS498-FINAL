Repository = React.createClass({displayName: "Repository",
	handleClick : function(){
		window.actions.changeContent(this.props.name);
	},
	render : function(){
		return (React.createElement("li", null, React.createElement("a", {href: "#", onClick: this.handleClick}, this.props.name)))
	}
})