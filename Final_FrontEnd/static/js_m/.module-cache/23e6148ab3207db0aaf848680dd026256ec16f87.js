var Contents = React.createClass({displayName: "Contents",
	getInitialState: function() {
	    return {
	      contents: []
	    };
	},
	componentWillReceiveProps : function(nextProps) {
		var tmpdata= {
			"CS450": [{id: "", name: "Homework"}],
			"CS374": [{id: "", name: "Homework"}, {id: "", name: "Announcement"}],
			"PHYS326": [{id: "", name: "Announcement"}],
			"CS498": []
		};
		console.log(tmpdata[nextProps.content_id]);
		console.log(nextProps.content_id);
		this.setState({contents: tmpdata[nextProps.content_id]|| this.state.contents});
	},
	render : function(){
		var contents = this.state.contents.map(function(data){
			return (React.createElement(Content, {name: data.name}))
		});
		return (
			React.createElement("div", {className: "container"}, 
				React.createElement("h1", null, "Contents"), 
				React.createElement("ul", {className: "collapsible"}, 
				  contents, 
				  React.createElement("li", {className: "ctr"}, React.createElement("a", {className: "btn-flat waves-effect waves-light btn-flat expand"}, React.createElement("i", {class: "mdi-content-add"})))
				), 
				React.createElement("div", {className: "progress"}, 
				    React.createElement("div", {className: "indeterminate"})
				)
			)
		);
	}
})