var Repositories = React.createClass({
	render : function(){
		<div className="repositories">
			<div className="icon">
				<img src="http://www.gravatar.com/avatar/f26103f436a1f8b884a1feb728001987?s=300" alt=""/>
				<p>darwinsenior</p>
			</div>
			<div className="repos">
				<ul>
					<li><a href="#">CS450</a></li>
					<li><a href="#">CS498</a></li>
					<li><a href="#">CS374</a></li>
					<li><a href="#">PHYS326</a></li>
					<li><a href="#">PHYS435</a></li>
				</ul>
			</div>
			<div className="add-repo">
				<a href="#">Add Repository</a>
			</div>
		</div>
	}
})