Repositories = React.createClass({
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
		var dom = (<AddRepoModal />)
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
			return (<Repository repo_id={data} focus={focus} key={data.id} ref={"rep"+data} />)
		});
		
		var picture_src = "http://www.gravatar.com/avatar/"+md5(this.state.email)+"?s=300";
		var actual_page = (
			<div>
			<div className="card">
					<div className="card-image">
						<img src={picture_src} alt=""/>
					</div>
					<div className="card-content ctr"><p>{this.state.name}</p></div>
				</div>
				<ul className="collection">
                    {repos}
					<li className="ctr collection-item">
						<a className="btn-flat waves-effect waves-light btn-flat" onClick={this.addRepo}>
							<i className="mdi-content-add"></i>
						</a>
					</li>

				</ul>
		</div>);
		var loader = (
				<div className="preloader-wrapper big active">
				      <div className="spinner-layer spinner-blue">
				        <div className="circle-clipper left">
				          <div className="circle"></div>
				        <div className="gap-patch"></div>
				          <div className="circle"></div>
				        <div className="circle-clipper right"></div>
				          <div className="circle"></div>
				        </div>
				      </div>
				      </div>
			)
		return (<div className="side-nav fixed">
				{this.state.loaded ? actual_page : loader}
			</div>
			);
	}
});