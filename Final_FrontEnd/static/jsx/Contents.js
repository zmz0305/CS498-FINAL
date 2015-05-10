var Contents = React.createClass({
	getInitialState: function() {
	    return {
	      contents: [],
	      data:[]
	    };
	},

	loadCommentsFromServer: function() {
    $.ajax({
      url: "http://localhost:4000/api/users",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
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

	componentDidMount: function() {
    this.loadCommentsFromServer();
  },
	render : function(){
		var contents = this.state.contents.map(function(data){
			return (<Content name={data.name}/>)
		});
		return (
				<div className="contents">
					<h1>{this.props.content_id}</h1>
					{contents}
					<h2>{this.state.data}</h2>
					<div className="add-newContent">
						<a>Add new Content</a>
					</div>
				</div>
		);
	}
})