Repositories = React.createClass({displayName: "Repositories",
	getInitialState: function() {
		window.actions.changeRepoFocus = this.changeRepoFocus;
	    return {
	      repositories : [
	      {id: "", name: "CS450"},
	      {id: "", name: "CS498"},
	      {id: "", name: "CS374"},
	      {id: "", name: "PHYS326"},
	      {id: "", name: "PHYS435"}
	      ],
	      picture_src : "http://www.gravatar.com/avatar/f26103f436a1f8b884a1feb728001987?s=300",
	      focus_repo : undefined
	    };
	},
	changeRepoFocus : function(focus_repo){
		this.setState({focus_repo : focus_repo});
	},
	render : function(){
		var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
		var focus_repo = this.state.focus_repo;
		var repos = this.state.repositories.map(function(data){
			var focus = (data.name == focus_repo)? true : false;
			return (React.createElement(Repository, {name: data.name, focus: focus}))
		});
		return(
					React.createElement("div", {className: "side-nav fixed"}, 
						React.createElement("div", {className: "card"}, 
							React.createElement("div", {className: "card-image"}, 
								React.createElement("img", {src: this.state.picture_src, alt: ""})
							), 
							React.createElement("div", {className: "card-content ctr"}, React.createElement("p", null, "DarwinSenior@gmail.com"))
						), 
						React.createElement("ul", {className: "collection"}, 
							repos, 
							React.createElement("li", {className: "ctr"}, 
								React.createElement("a", {className: "btn-flat waves-effect waves-light btn-flat", onClick: this.addRepo}, 
									React.createElement("i", {className: "mdi-content-add"})
								)
							)
						)
					)
			);
	}
})