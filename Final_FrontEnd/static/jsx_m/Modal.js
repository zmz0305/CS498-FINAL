var Modal=React.createClass({
	getInitialState : function(){
		window.actions.changeModal = this.changeModal;
		window.actions.closeModal = this.closeModal;
		return {
	    	dom : undefined,
	    	visible : false,
	    	type : ""
	    	}
	},
	changeModal : function(dom, type){
		// console.log(dom);
		this.setState({dom: dom});
		this.setState({visible: true});
		this.setState({type: type || ""});
	},
	closeModal : function () {
		this.setState({visible: false});
		this.setState({dom: undefined});
	},
	render : function(){
		var modalStatus = this.state.visible ? "open " : "close ";
		var type = this.state.type;
		return (
			<div>
				<div className={modalStatus} id="lean-overlay" onClick={this.closeModal}></div>
				<div className = {"modal modal-fixed-footer "+modalStatus+type}>
					{this.state.dom}
				</div>
			</div>
		);
	}
})