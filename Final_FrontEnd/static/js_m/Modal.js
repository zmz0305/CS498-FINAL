var Modal=React.createClass({
	getInitialState : function(){
		window.actions.changeModal = this.changeModal;
		return {
	    	dom : undefined,
	    	visible : false
	    	}
	},
	changeModal : function(dom){
		if (dom) this.setState({dom: dom, visible: true});
		else this.setState({visible: false});
	},
	render : function(){
		<div className={modalStatus} id="lean-overlay" onClick={this.closeModal}></div>
		<div className = {"modal modal-fixed-footer "+modalStatus}>
			{this.state.modal.dom}
		</div>
	}
})