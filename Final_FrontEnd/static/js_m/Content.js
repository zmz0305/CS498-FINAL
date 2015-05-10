Content = React.createClass({displayName: "Content",
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
	render: function(){
		var cx = React.addons.classSet;
		var open = this.state.showContent ? "open" : "close";
		return (
			React.createElement("div", null, 
				React.createElement("li", null, 
				  React.createElement("div", {className: "collapsible-header", onClick: this.toggle}, React.createElement("i", {className: "fa fa-bookmark"}), this.props.name), 
				  React.createElement("div", {className: "collapsible-body "+open}, React.createElement("p", null, "Lorem ipsum dolor sit amet."))
				)
			)
			);
	}
})