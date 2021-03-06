Repositories = React.createClass({displayName: "Repositories",
	getInitialState: function() {
		window.actions.refreshContent = (function(id){
            console.log(this.refs);
            console.log(this.refs["rep"+id]);
			if (this.refs["rep"+id]){
                this.refs["rep"+id].refresh();
			}
		}).bind(this);
		window.actions.changeRepoFocus = this.changeRepoFocus;
		window.actions.refreshRepositories = this.refresh;
	    return {
	      repositories : [],
	      email: "",
	      focus_repo : undefined,
	      loaded : false,
	      name: "visitor"
	    };
	},
	componentDidMount: function(){
		this.refresh();
	},
	changeRepoFocus : function(focus_repo){
		this.setState({focus_repo : focus_repo});
	},
	addRepo : function(){
		var dom = (React.createElement(AddRepoModal, null))
		window.actions.changeModal(dom);
	},
	refresh : function(){
		// repositories: [
		// {id: "", name: "CS450"},
		// {id: "", name: "CS498"},
		// {id: "", name: "CS374"},
		// {id: "", name: "PHYS326"},
		// {id: "", name: "PHYS435"}
		// ]
		this.setState({loaded: true});
		$.get("/api/user", (function(data){
			if (data.status="success"){
				this.setState({repositories: data.data.repo_ids});
				this.setState({name: data.data.name});
				this.setState({email: data.data.email});
			}
            console.log(this.state.repositories);

            this.setState({loaded: true});
			this.setState({focus_repo : undefined});
		}).bind(this));
	},
	render : function(){
		var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
		var focus_repo = this.state.focus_repo;
		var repos = this.state.repositories.map(function(data){
			var focus = (data == focus_repo)? true : false;
			return (React.createElement(Repository, {repo_id: data, focus: focus, key: data.id, ref: "rep"+data}))
		});
		
		var picture_src = "http://www.gravatar.com/avatar/"+md5(this.state.email)+"?s=300";
		var actual_page = (
			React.createElement("div", null, 
			React.createElement("div", {className: "card"}, 
					React.createElement("div", {className: "card-image"}, 
						React.createElement("img", {src: picture_src, alt: ""})
					), 
					React.createElement("div", {className: "card-content ctr"}, React.createElement("p", null, this.state.name))
				), 
				React.createElement("ul", {className: "collection"}, 
                    repos, 
					React.createElement("li", {className: "ctr collection-item"}, 
						React.createElement("a", {className: "btn-flat waves-effect waves-light btn-flat", onClick: this.addRepo}, 
							React.createElement("i", {className: "mdi-content-add"})
						)
					)

				)
		));
		var loader = (
				React.createElement("div", {className: "preloader-wrapper big active"}, 
				      React.createElement("div", {className: "spinner-layer spinner-blue"}, 
				        React.createElement("div", {className: "circle-clipper left"}, 
				          React.createElement("div", {className: "circle"}), 
				        React.createElement("div", {className: "gap-patch"}), 
				          React.createElement("div", {className: "circle"}), 
				        React.createElement("div", {className: "circle-clipper right"}), 
				          React.createElement("div", {className: "circle"})
				        )
				      )
				      )
			)
		return (React.createElement("div", {className: "side-nav fixed"}, 
				this.state.loaded ? actual_page : loader
			)
			);
	}
});