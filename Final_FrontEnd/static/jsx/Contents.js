var Contents = React.createClass({
	getInitialState: function() {
	    return {
	      contents: []
	    };
	},
	componentWillReceiveProps : function(nextProps) {
		var tmpdata= {
			"CS450": [{id: "", name: "Homework"}],
			"CS374": [{id: "", name: "Homework"}, {id: "", name: "Announcement"}],
			"PHYS326": [{id: "", name: "Announcement"}],
			"CS498": []
		};
		
		console.log(tmpdata[nextProps.content_id]);
		console.log(nextProps.content_id);
		this.setState({contents: tmpdata[nextProps.content_id]|| this.state.contents});
	},
	render : function(){
		var contents = this.state.contents.map(function(data){
			return (<Content name={data.name}/>)
		});
		return (
				<div className="contents">
					<h1>{this.props.content_id}</h1>
					{contents}
					<div className="add-newContent">
						<a>Add new Content</a>
					</div>
				</div>
		);
	}
})