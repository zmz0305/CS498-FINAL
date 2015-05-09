var Contents = React.createClass({
	getInitialState: function() {
	    return {
	      contents: []
	    };
	},
	componentDidMount: function () {
		var tmpdata= {
			"CS450": [{id: "", name: "Homework"}],
			"CS374": [{id: "", name: "Homework"}, {id: "", name: "Announcement"}],
			"PHYS326": [{id: "", name: "Announcement"}],
			"CS498": []
		};
		this.setState({contents: tmpdata[this.props.content_id]|| this.state.contents});
	},
	componentWillReceiveProps : function(nextProps) {
		var tmpdata= {
			"CS450": [{id: "", name: "Homework"}],
			"CS374": [{id: "", name: "Homework"}, {id: "", name: "Announcement"}],
			"PHYS326": [{id: "", name: "Announcement"}],
			"CS498": []
		};
		this.setState({contents: tmpdata[nextProps.content_id]|| this.state.contents});
	},
	addContent : function(){
		var dom = <AddContentModal />
		window.actions.changeModal(dom, "large");
	},
	render : function(){
		// console.log(this.state.contents);
		var contents = this.state.contents.map(function(data){
			return (<Content name={data.name}/>)
		});
		return (
			<div className="container">
				<h1>Class: {this.props.content_id}</h1>
				<ul className="collapsible">
				  {contents}
				  <li className="ctr"><a onClick={this.addContent} className="btn-flat waves-effect waves-light btn-flat expand"><i className="mdi-content-add"></i></a></li>
				</ul>
				<div className="progress">
				    <div className="indeterminate"></div>
				</div>
			</div>
		);
	}
})