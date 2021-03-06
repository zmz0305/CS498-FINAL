Content = React.createClass({
	getInitialState: function() {
	    return {
	      showContent : false,
	      name : "",
	      position : "0",
	      html : ""
	    };
	},
	componentDidMount: function(){
		$.get("/api/contents/"+this.props.content_id, (function(data){
			if (data.status == "success"){
				this.setState({name: data.data.name});
				this.setState({position: data.data.position});
				//var component = $("#page_data").find('[label="'+this.state.position+'"]');
				//for (var x=1; x<content_data.length; x++){
				//	component = $(component.children()[content_data[x]]);
				//}
                //console.log(component);
				this.setState({html : data.data.position});
			}
		}).bind(this));
	},
	toggle: function(event){
		if (!this.state.showContent){
			this.setState({showContent : true});
		}else{
			this.setState({showContent : false});
		}
	},
	deleteContent: function(event){
		var del = (function(){
			$.post("/api/repositories/"+this.props.parent_id,
				{
					"action" : "delete_content",
					"data" : {
                        "id": this.props.content_id
                    }
				},
                (function(data){
					window.actions.refreshContent(this.props.parent_id);
				}).bind(this))
		}).bind(this)
		var dom = (<ConfirmationModal execute={del}>Are you sure you want to delete it?</ConfirmationModal>);
		window.actions.changeModal(dom);
	},
	render: function(){
		var cx = React.addons.classSet;
		var open = this.state.showContent ? "open" : "close";
        console.log(this.state);
		return (
			<div>
				<li>
					<div className="collapsible-header">
						<div className="row">
							<div className="col s10" onClick={this.toggle}>
								<i className="fa fa-bookmark"></i>
								{this.state.name}
							</div>
							<div className="col s2 right-align">
								<a className="btn-flat" onClick={this.deleteContent}>
									<i className="fa fa-trash"></i>
								</a>

							</div>
						</div>
					</div>
					<div className={"collapsible-body "+open}>
						<div dangerouslySetInnerHTML={{__html: this.state.html}} className="ctr" style={{overflow : "scroll", height : "300px"}}/>
					</div>
				</li>
			</div>
			);
	}
})