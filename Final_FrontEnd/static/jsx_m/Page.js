window.actions = {}
Page = React.createClass({
	getInitialState: function() {
		window.actions.changeContent = this.changeContent;
	    return {
	    	content_id : ""
	    }
	},
	changeContent : function(content_id){
		// console.log(content_id);
		this.setState({content_id : content_id});
	},
	render : function(){
		var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
		var content = <Contents content_id={this.state.content_id} key={this.state.content_id} />;
		return(
		<div>
			<header>
				<Repositories />
			</header>
			<main id="main">
				<ReactCSSTransitionGroup transitionName="content-change" transitionLeave={false}>
					{content}
				</ReactCSSTransitionGroup>
			</main>
			<Modal />
			<Toast />
		</div>
		);
	}
})