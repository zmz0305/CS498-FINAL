Repositories = React.createClass({
	getInitialState: function() {
		window.actions.changeRepoFocus = this.changeRepoFocus;
		window.actions.refreshRepositories = this.refresh;
	    return {
	      repositories : [],
	      picture_src : "http://www.gravatar.com/avatar/f26103f436a1f8b884a1feb728001987?s=300",
	      focus_repo : undefined
	    };
	},
	componentDidMount: function(){
		this.refresh();
	},
	changeRepoFocus : function(focus_repo){
		this.setState({focus_repo : focus_repo});
	},
	addRepo : function(){
		var dom = (<AddRepoModal />)
		window.actions.changeModal(dom);
	},
	refresh : function(){
		this.setState({
			repositories: [
			{id: "", name: "CS450"},
			{id: "", name: "CS498"},
			{id: "", name: "CS374"},
			{id: "", name: "PHYS326"},
			{id: "", name: "PHYS435"}
			]
		});
	},
	render : function(){
		var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
		var focus_repo = this.state.focus_repo;
		var repos = this.state.repositories.map(function(data){
			var focus = (data.name == focus_repo)? true : false;
			return (<Repository name={data.name} focus={focus} key={data.name}/>)
		});
		return(
					<div className="side-nav fixed">
						<div className="card">
							<div className="card-image">
								<img src={this.state.picture_src} alt=""/>
							</div>
							<div className="card-content ctr"><p>DarwinSenior@gmail.com</p></div>
						</div>
						<ul className="collection">
							<ReactCSSTransitionGroup transitionName="content-change" transitionLeave={false}>
							{repos}
							</ReactCSSTransitionGroup>
							<li className="ctr collection-item">
								<a className="btn-flat waves-effect waves-light btn-flat" onClick={this.addRepo}>
									<i className="mdi-content-add"></i>
								</a>
							</li>
						</ul>
					</div>
			);
	}
})