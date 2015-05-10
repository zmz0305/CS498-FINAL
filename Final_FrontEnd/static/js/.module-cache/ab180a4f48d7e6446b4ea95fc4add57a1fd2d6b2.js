Repositories = React.createClass({displayName: "Repositories",
	getInitialState: function() {
	    return {
	      repositories : [
	      {id: "", name: "CS450"},
	      {id: "", name: "CS498"},
	      {id: "", name: "CS374"},
	      {id: "", name: "PHYS326"},
	      {id: "", name: "PHYS435"}
	      ],
	      picture_src : "http://www.gravatar.com/avatar/f26103f436a1f8b884a1feb728001987?s=300"
	    };
	},
	render : function(){
		var repos = this.state.repositories.map(function(data){
			return React.createElement("li", null, React.createElement("a", {href: "#"}, data.name))
		});
		return(
				React.createElement("div", {className: "repositories"}, 
					React.createElement("div", {className: "icon"}, 
						React.createElement("img", {src: this.state.picture_src, alt: ""}), 
						React.createElement("p", null, "darwinsenior")
					), 
					React.createElement("div", {className: "repos"}, 
						React.createElement("ul", null, 
							repos
						)
					), 
					React.createElement("div", {className: "add-repo"}, 
						React.createElement("a", {href: "#"}, "Add Repository")
					)
				)
		)
	}
})