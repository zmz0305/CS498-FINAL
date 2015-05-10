var Toast=React.createClass({displayName: "Toast",
	getInitialState: function() {
		window.actions.toast = this.toast;
	    return {
	    	toasts : []
	    };
	},
	componentDidMount: function(){
		setInterval((function(){

			if (this.state.toasts.length){
				toasts = this.state.toasts.slice();
				toasts.pop();
				this.setState({toasts: toasts});
			}
		}).bind(this), 3000);
	},
	toast: function(message){
		var toasts = this.state.toasts.slice();
		toasts.unshift(message);
		this.setState({toasts: toasts});
	},
	render: function () {
		var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
		var toasts_div = this.state.toasts.map(function(data){
			return (React.createElement("div", {className: "toast"}, " ", data, " "));
		});
		return (
			React.createElement("div", {id: "toast-container"}, 
				React.createElement(ReactCSSTransitionGroup, {transitionName: "content-change"}, 
					toasts_div
				)
			));
	}
})