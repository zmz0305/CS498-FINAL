var Contents = React.createClass({displayName: "Contents",
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
			return (React.createElement(Content, {name: data.name}))
		});
		return (
				React.createElement("div", {className: "contents"}, 
					React.createElement("h1", null, this.props.content_id), 
					contents, 
					React.createElement("div", {className: "add-newContent"}, 
					React.createElement(Lightbox, null, 
						React.createElement(LightboxTrigger, null, 
						React.createElement("a", {href: "#"}, "Add new Content")
						), 
						React.createElement(LightboxModal, null, 
                    React.createElement("div", null, 
                        React.createElement("h1", null, "This is the basic usage!"), 
                        React.createElement("p", null, "Good luck :D")
                    )
                )
            ), 
            	"document.getElementById('react-canvas')"
					)
				)
		);
	}
})