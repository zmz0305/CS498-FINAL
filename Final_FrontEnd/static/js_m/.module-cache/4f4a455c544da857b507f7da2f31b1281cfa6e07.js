var Contents = React.createClass({displayName: "Contents",
	getInitialState: function() {
	    return {
	      contents: []
	    };
	},
	componentDidMount: function () {
		var tmpdata= {
			"CS450": [{id: "", name: "Homework"}],
			"CS374": [{id: "", name: "Homework"}, {id: "", name: "Announcement"}],
			"PHYS326": [{id: "", name: "Announcement"}],
			"CS498": []
		};
		this.setState({contents: tmpdata[this.props.content_id]|| this.state.contents});
	},
	componentWillReceiveProps : function(nextProps) {
		var tmpdata= {
			"CS450": [{id: "", name: "Homework"}],
			"CS374": [{id: "", name: "Homework"}, {id: "", name: "Announcement"}],
			"PHYS326": [{id: "", name: "Announcement"}],
			"CS498": []
		};
		this.setState({contents: tmpdata[nextProps.content_id]|| this.state.contents});
	},
	render : function(){
		console.log(this.state.contents);
		var contents = this.state.contents.map(function(data){
			return (React.createElement(Content, {name: data.name}))
		});
		return (
			React.createElement("div", {className: "container"}, 
				React.createElement("h1", null, "Class: ", this.props.content_id), 
				React.createElement("ul", {className: "collapsible"}, 
				  contents, 
				  React.createElement("li", {className: "ctr"}, React.createElement("a", {className: "btn-flat waves-effect waves-light btn-flat expand"}, React.createElement("i", {className: "mdi-content-add"})))
				), 
				React.createElement("div", {className: "progress"}, 
				    React.createElement("div", {className: "indeterminate"})
				)
			)
		);
	}
})