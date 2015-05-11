window.actions = {}
Page = React.createClass({
	getInitialState: function() {
		// window.actions.changeContent = this.changeContent;
	    return {
	    	// content_ids : [],
	    	// repo_name : ""
	    }
	},
	render : function(){
		
		var content = <Contents content_ids={this.state.content_ids} key={this.state.repo_id} repo_name={this.state.repo_name} />;
		return(
		<div>
			<header>
				<Repositories />
			</header>
			<main id="main">
				<Contents />
			</main>
			<Modal />
			<Toast />
		</div>
		);
	}
})