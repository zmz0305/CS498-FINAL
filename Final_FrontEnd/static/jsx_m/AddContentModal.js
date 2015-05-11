var AddContentModal = React.createClass({
	getInitialState : function(){
		return {
			innerHTML : ""
		};
	},
	addQueue : function(event){
		event.stopPropagation();
		var label = $(event.target).attr("label");
		$.post("/repositories/"+this.props.repo_id,
			{
				action : "add_content",
				data : {
					name : "",
					position : label
				}
			}, function(){
				window.actions.closeModal();
			});
		// this.setState({comps: this.getComponents(label)});
	},
	addClick : function(node){
		var addClick = this.addClick;
		$(node).unbind();
		$(node).click(this.addQueue);
		node.children().each(function(){
			addClick($(this));
		});
	},
	componentDidMount : function(){
		// var iframe_window = React.findDOMNode(this.refs.window).contentWindow;
		$.get("/html", (function(data){
			this.data = data;
			// var html = $.parseHTML(data);
			// iframe_window.document.open();
			// iframe_window.document.write(data);
			// iframe_window.document.close();
			$("#loadFrame").append(data);
			traversal($('#loadFrame'));
			this.addClick($("#loadFrame"));
		}).bind(this));
	},
	handleCancel: function(){
		window.actions.closeModal();
	},
	render : function(){
		return(
			<div>
				<div className="modal-content">
						<div>
							<div id="loadFrame" ></div>
						</div>
				</div>
				<div className="modal-footer">
					<a className="waves-effect btn-flat" onClick={this.handleCancel}>Cancel <i className="fa fa-times"></i></a>
				</div>
			</div>
			);
	}
});
// var AddContentModal2 = React.createClass({
// 	getInitialState: function(){
// 		return {
// 			compindex : 0,
// 			newhtml : ""
// 		}
// 	},
// 	handleConfirm : function(){
// 		window.actions.closeModal();
// 		window.actions.refreshRepositories();
// 	},
// 	getComponents : function(label, index){
// 		var newlabel = label.split('.').slice(0, index+1).join('.');
// 		newhtml = $('[label="'+ newlabel +'"]').html();
// 		return components;
// 	},
// 	handleChangeCallBack : function(val){
// 		this.setState({compindex : val});
// 	},
// 	render : function(){
// 		return (<div>
// 					<div id="original" style="display : none">
// 						<div dangerouslySetInnerHTML={{__html: this.props.data}} />
// 					</ div>
// 					<div className="modal-content">
// 						<div>
// 							<Slider changeCallBack={this.handleChangCallBack} min={0} max={this.state.comps-1} />
// 						</div>
// 					</div>
// 					<div className="modal-footer">
// 						<a className="waves-effect btn-flat" onClick={this.handleConfirm}>Confirm <i className="fa fa-check"></i></a>
// 					</div>
// 				</div>)

// 	}
// })

var traversal = function(node, label){
	label = label || "0"
	node.attr("label", label);
	var pattern = /^https?:\/\//i;
	if (pattern.test(node.attr('href'))){
		var newref = ("https://courses.engr.illinois.edu/cs461/sp2015/")+node.attr('href');
		node.attr('href', newref);
	}
	if (pattern.test(node.attr('src'))){
		var newref = ("https://courses.engr.illinois.edu/cs461/sp2015/")+node.attr('src');
		node.attr('src', newref);
	}
	if (node.is('a')) node.attr("href", "#");
	node.attr("src")
    node.children().each(function(){
        traversal($(this), label+"."+$(this).index());
    });
	if (node.is('img')) node.remove();
}