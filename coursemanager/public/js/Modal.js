var Modal=React.createClass({displayName: "Modal",
	getInitialState : function(){
		window.actions.changeModal = this.changeModal;
		window.actions.closeModal = this.closeModal;
		return {
	    	dom : undefined,
	    	visible : false,
	    	type : "",
	    	counter : 0
	    	}
	},
	changeModal : function(dom, type){
		// console.log(dom);
		this.setState({dom: dom});
		this.setState({visible: true});
		this.setState({type: type || ""});
		this.setState({counter : this.state.counter+1});
	},
	closeModal : function () {
		this.setState({visible: false});
		this.setState({dom: undefined});
	},
	render : function(){
		var modalStatus = this.state.visible ? "open " : "close ";
		var type = this.state.type;
		return (
			React.createElement("div", null, 
				React.createElement("div", {className: modalStatus, id: "lean-overlay", onClick: this.closeModal}), 
				React.createElement("div", {className: "modal modal-fixed-footer "+modalStatus+type, key: this.state.counter}, 
					this.state.dom
				)
			)
		);
	}
})