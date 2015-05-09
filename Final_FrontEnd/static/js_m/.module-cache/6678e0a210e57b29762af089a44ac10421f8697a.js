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
	addRepo : function(){
		console.log("triggered");
		var dom = (
			React.createElement("div", {class: "modal-content"}, 
				React.createElement("div", {class: "container"}, 
					React.createElement("p", null, 
						"Welcome to use our management System!" 
					), 
				React.createElement("div", {class: "row ctr"}, 
					React.createElement("p", null, "Sign in with Google!!"), 
					React.createElement("a", {class: "waves-effect waves-light btn red expand"}, "Sign in with Google+ ", React.createElement("i", {class: "fa fa-google-plus"})), 
					React.createElement("p", null, "Or you can get an account from google to use"), 
					React.createElement("a", {class: "waves-effect waves-light btn blue expand"}, "Get an account from google! ", React.createElement("i", {class: "fa fa-google"}))
				)
				)
			)
		)
		window.action.changeModal({dom: dom, visible: true});
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