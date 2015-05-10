var Contents = React.createClass({displayName: "Contents",
	getInitialState: function() {
	    return {
	      contents: [
	      	{id: "", name: "Homework"},
	      	{id: "", name: "Announcement"}
	      ]
	    };
	},
	render : function(){
		var contents = this.state.contents.map(function(data){
			return (React.createElement(Content, {name: data.name}))
		});
		return (
				React.createElement("div", {className: "contents"}, 
					React.createElement("h1", null, "Contents"), 
					contents, 
					React.createElement("div", {className: "add-newContent"}, 
						React.createElement("a", null, "Add new Content")
					)
				)
		);
	}
})