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
		return (
			React.createElement("div", null, 
			React.createElement("li", null, 
			  React.createElement("div", {className: "collapsible-header", onClick: this.toggle}, React.createElement("i", {className: "fa fa-bookmark"}), this.prop.name), 
			  React.createElement("div", {className: "collapsible-body "}, React.createElement("p", null, "Lorem ipsum dolor sit amet."))
			)
			)
			);
	}
})