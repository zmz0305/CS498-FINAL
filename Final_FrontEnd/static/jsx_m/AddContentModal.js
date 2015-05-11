var AddContentModal = React.createClass({
	getInitialState : function(){
		return {
			queue : []
		};
	},
	initQueue : function(){
		this.queue = [];
	},
	addQueue : function(event){
		var node = event.target;
		this.queue.push($(node).html());
		console.log(this.queue);
	},
	addClick : function(node){
		var addClick = this.addClick;
		$(node).unbind();
		$(node).click(this.addQueue);
		node.children().each(function(){
			addClick($(this));
		})
	},
	componentDidMount : function(){
		var iframe_window = React.findDOMNode(this.refs.window).contentWindow;
		$.get("/html", (function(data){
			iframe_window.document.open();
			iframe_window.document.write(data);
			iframe_window.document.close();
			var body = $("#loadFrame").contents().find("body");
			console.log(body);
			traversal(body);
			this.initQueue();
			this.addClick(body);
		}).bind(this));
	},
	handleCancel: function(){
		window.actions.closeModal();
	},
	handleConfirm : function(){
		window.actions.closeModal();
		window.actions.refreshRepositories();
	},
	render : function(){
		return (
			<div>
				<div className="modal-content">
					<iframe seamless ref="window" id="loadFrame"/>
				</div>
				<div className="modal-footer">
					<a className="waves-effect btn-flat" onClick={this.handleCancel}>Cancel <i className="fa fa-times"></i></a>
					<a className="waves-effect btn-flat" onClick={this.handleConfirm}>Confirm <i className="fa fa-check"></i></a>
				</div>
			</div>
		)
	}
});

var traversal = function(node, label){
	label = label || "0"
	node.attr("label", label);
	node.attr("href", "#");
    node.children().each(function(){
        traversal($(this), label+"."+$(this).index());
    });
}