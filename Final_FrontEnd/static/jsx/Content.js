Content = React.createClass({
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
			<div className="content">
				<div className="header">
					<span>{this.props.name}</span>
					<a href="#" className={this.state.toggle} onClick={this.toggle}>click me</a>
				</div>
				<div className={cx({"visiable": !this.state.showContent})}>
					Helloworld
				</div>
			</div>
			)
	}
})
var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});