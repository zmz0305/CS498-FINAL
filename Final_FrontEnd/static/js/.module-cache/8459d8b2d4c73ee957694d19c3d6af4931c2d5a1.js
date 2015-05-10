var Contents = React.createClass({displayName: "Contents",
	getInitialState: function() {
	    return {
	      contents: [],
	      name:[]
	    };
	    React.createElement("script", null, 
		"var Ajax = require('react-ajax');"
		)
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
	responseHandler: function(err, data){
        this.setState({
            name: data.body.name
        })
    },
	render : function(){
		var contents = this.state.contents.map(function(data){
			return (React.createElement(Content, {name: data.name}))
		});
		return (
				React.createElement("div", {className: "contents"}, 
					React.createElement("h1", null, this.props.content_id), 
					contents, 
					 "Hello ", this.state.name, 
                	React.createElement(Ajax, {url: "http://localhost:4000/api/users", onResponse: this.responseHandler}), 
					React.createElement("div", {className: "add-newContent"}, 
						React.createElement("a", null, "Add new Content")
					)
				)
		);
	}
})