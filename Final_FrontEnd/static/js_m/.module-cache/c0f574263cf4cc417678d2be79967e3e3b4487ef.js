var Contents = React.createClass({displayName: "Contents",
	getInitialState: function() {
	    return {
	      contents: [],
	      loaded : false
	    };
	},
	componentDidMount: function () {
		// var tmpdata= {
		// 	"CS450": [{id: "", name: "Homework"}],
		// 	"CS374": [{id: "", name: "Homework"}, {id: "", name: "Announcement"}],
		// 	"PHYS326": [{id: "", name: "Announcement"}],
		// 	"CS498": []
		// };
		// this.setState({contents: tmpdata[this.props.content_id]|| this.state.contents});
		$.get("http://localhost:4000/api/repositories/"+this.props.content_id, (function (data){
			if (this.data.status = "success"){
				this.setState({contents: data.data.contents});
			}
			this.setState({loaded: true});
		}).bind(this));
	},
	componentWillReceiveProps : function(nextProps) {
		// var tmpdata= {
		// 	"CS450": [{id: "", name: "Homework"}],
		// 	"CS374": [{id: "", name: "Homework"}, {id: "", name: "Announcement"}],
		// 	"PHYS326": [{id: "", name: "Announcement"}],
		// 	"CS498": []
		// };
		// this.setState({contents: tmpdata[nextProps.content_id]|| this.state.contents});
	},
	addContent : function(){
		var dom = React.createElement(AddContentModal, null)
		window.actions.changeModal(dom, "large");
	},
	render : function(){
		// console.log(this.state.contents);
		var contents = this.state.contents.map(function(data){
			return (React.createElement(Content, {id: data}));
		});
		var actualPage = (
			React.createElement("div", {className: "container"}, 
				React.createElement("h1", null, "Class: ", this.state.content_id), 
				React.createElement("ul", {className: "collapsible"}, 
				  contents, 
				  React.createElement("li", {className: "ctr"}, React.createElement("a", {onClick: this.addContent, className: "btn-flat waves-effect waves-light btn-flat expand"}, React.createElement("i", {className: "mdi-content-add"})))
				)
			)
		)
		var loading = (React.createElement("div", {className: "progress"}, 
				    	React.createElement("div", {className: "indeterminate"})
					))
		if (this.state.loaded){
			return actualPage;
		}else{
			return loading;
		}
	}
})