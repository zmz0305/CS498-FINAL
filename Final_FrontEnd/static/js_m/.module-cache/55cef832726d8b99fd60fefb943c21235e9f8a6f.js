Content = React.createClass({displayName: "Content",
	getInitialState: function() {
	    return {
	      showContent : false,
	      name : "",
	      html : undefined
	    };
	},
	componentDidMount: function(){
		$.get("/api/content", (function(data){

		}).bind(this));
	},
	toggle: function(event){
		if (!this.state.showContent){
			this.setState({showContent : true});
		}else{
			this.setState({showContent : false});
		}
	},
	deleteContent: function(event){
		var del = function(){
			console.log("deleted!");
		}
		var dom = (React.createElement(ConfirmationModal, {execute: del}, "Are you sure you want to delete it?"));
		window.actions.changeModal(dom);
	},
	render: function(){
		var cx = React.addons.classSet;
		var open = this.state.showContent ? "open" : "close";
		return (
			React.createElement("div", null, 
				React.createElement("li", null, 
					React.createElement("div", {className: "collapsible-header"}, 
						React.createElement("div", {className: "row"}, 
							React.createElement("div", {className: "col s10", onClick: this.toggle}, 
								React.createElement("i", {className: "fa fa-bookmark"}), 
								this.props.name
							), 
							React.createElement("div", {className: "col s2 right-align"}, 
								React.createElement("a", {className: "btn-flat", onClick: this.deleteContent}, 
									React.createElement("i", {className: "fa fa-trash"})
								)

							)
						)
					), 
					React.createElement("div", {className: "collapsible-body "+open}, React.createElement("p", null, "Lorem ipsum dolor sit amet."))
				)
			)
			);
	}
})