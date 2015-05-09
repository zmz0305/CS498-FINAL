Content = React.createClass({
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
			<div className="content">
				<div className="header">
					<span>{this.props.name}</span>
					<a href="#" onClick={this.toggle}>
						<i className={toggleClass}></i>
					</a>
				</div>
				<div className={panelClass}>
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