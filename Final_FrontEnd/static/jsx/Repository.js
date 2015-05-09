Repository = React.createClass({
	handleClick : function(){
		window.actions.changeContent(this.props.name);
	},
	render : function(){
		return (<li><a href="#" onClick={this.handleClick}>{this.props.name}</a></li>)
	}
})