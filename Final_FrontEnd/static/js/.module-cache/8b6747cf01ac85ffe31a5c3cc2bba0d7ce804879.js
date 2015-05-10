Content = React.createClass({displayName: "Content",
	getInitialState: function() {
	    return {
	      toggle: "toggleup",
	      showContent : false
	    };
	},
	toggle: function(event){
		if (!this.state.showContent){
			console.log(this.state.showContent);
			this.setState({toggle : "toggledown"});
			this.setState({showContent : true});
		}else{
			console.log(this.state.showContent);
			this.setState({toggle : "toggleup"});
			this.setState({showContent : false});
		}
	},
	render: function(){
		var cx = React.addons.classSet;
		return (
			React.createElement("div", {className: "content"}, 
				React.createElement("div", {className: "header"}, 
					React.createElement("span", null, this.props.name), 
					React.createElement("a", {href: "#", className: this.state.toggle, onClick: this.toggle}, "click me")
				), 
				React.createElement("div", {className: cx({"visiable": !this.state.showContent})}, 
					"Helloworld"
				)
			)
			)
	}
})
var LikeButton = React.createClass({displayName: "LikeButton",
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      React.createElement("p", {onClick: this.handleClick}, 
        "You ", text, " this. Click to toggle."
      )
    );
  }
});