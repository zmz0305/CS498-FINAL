Repositories = React.createClass({
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
			return (<Repository name={data.name} />)
		});
		return(
				<div className="repositories">
					<div className="icon">
						<img src={this.state.picture_src} alt=""/>
						<p>darwinsenior</p>
					</div>
					<div className="repos">
						<ul>
							{repos}
						</ul>
					</div>
					<div className="add-repo">
						<a href="#">Add Repository</a>
					</div>
				</div>
		)
	}
})