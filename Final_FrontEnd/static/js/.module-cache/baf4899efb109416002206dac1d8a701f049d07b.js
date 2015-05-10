Content = React.createClass({displayName: "Content",
	getInitialState: function() {
	    return {
	      toggle: "fa fa-angle-up",
	      showContent : false
	    };
	},
	toggle: function(event){
		if (!this.state.showContent){
			console.log(this.state.showContent);
			this.setState({toggle : "fa fa-angle-down"});
			this.setState({showContent : true});
		}else{
			console.log(this.state.showContent);
			this.setState({toggle : "fa fa-angle-up"});
			this.setState({showContent : false});
		}
	},
	render: function(){
		var cx = React.addons.classSet;
		var panelClass = cx({"invisiable": !this.state.showContent});
		var toggleClass = this.state.toggle;
		return (
			React.createElement("div", {className: "content"}, 
				React.createElement("div", {className: "header"}, 
					React.createElement("span", null, this.props.name), 
					React.createElement("a", {href: "#", onClick: this.toggle}, 
						React.createElement("i", {className: toggleClass})
					)
				), 
				React.createElement("div", {className: panelClass}, 
					"Helloworld"
				), 
				React.createElement("h1", null, "\"Hello\"")
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