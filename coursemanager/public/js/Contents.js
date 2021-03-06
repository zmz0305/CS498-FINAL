var Contents = React.createClass({displayName: "Contents",
	getInitialState: function() {
		window.actions.changeContent = this.changeContent;
	    return {
			repo_name : "",
	    	loaded : false,
	    	content_ids: [],
	    	id: "",
	    	url : "",
	    	html : ""
	    };
	},
	componentDidMount: function () {
		// var tmpdata= {
		// 	"CS450": [{id: "", name: "Homework"}],
		// 	"CS374": [{id: "", name: "Homework"}, {id: "", name: "Announcement"}],
		// 	"PHYS326": [{id: "", name: "Announcement"}],
		// 	"CS498": []
		// };
		// this.setState({content_ids: tmpdata[this.props.content_id]|| this.state.content_ids});
		// $.get("/api/repositories/"+this.props.content_id, (function (data){
		// 	if (this.data.status = "success"){
		// 		this.setState({content_ids: data.data.content_ids});
		// 	}
		// 	this.setState({loaded: true});
		// }).bind(this));
		if (this.state.content_ids){
			this.setState({loaded: true});
		}
        // this.state.content_ids.each((function(data){
        //     traversal($("#page_data"));
        //     this.refs[data].componentDidMount();
        // }).bind(this));

	},
	changeContent : function(content_ids, repo_name, id, html){
		this.setState({content_ids : content_ids});
		this.setState({repo_name : repo_name});
		this.setState({id: id});
		this.setState({loaded: true});
		this.setState({html : html});

		console.log(this.state.id);
	},
	componentWillReceiveProps : function(nextProps) {
		// var tmpdata= {
		// 	"CS450": [{id: "", name: "Homework"}],
		// 	"CS374": [{id: "", name: "Homework"}, {id: "", name: "Announcement"}],
		// 	"PHYS326": [{id: "", name: "Announcement"}],
		// 	"CS498": []
		// };
		// this.setState({content_ids: tmpdata[nextProps.content_id]|| this.state.content_ids});
	},
    componentDidUpdata : function(){
    },
	addContent : function(){
		var dom = React.createElement(AddContentModal, {html: this.state.html, repo_id: this.state.id})
		window.actions.changeModal(dom, "large");
	},
	render : function(){
		// console.log(this.state.content_ids);
		var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
		var content_ids = this.state.content_ids.map((function(data){
				return (React.createElement(Content, {content_id: data, key: data, parent_id: this.state.id, ref: data}));
			}).bind(this));
		var actualPage = (
				React.createElement("div", {className: "container", key: this.state.id+this.state.repo_name}, 
                    React.createElement("div", {id: "page_data", dangerouslySetInnerHTML: {__html: this.state.html}, style: {display : "none"}}), 
					React.createElement("h1", null, "Class: ", this.state.repo_name), 
					React.createElement("ul", {className: "collapsible"}, 
						React.createElement(ReactCSSTransitionGroup, {transitionName: "content-change", transitionLeave: false, transitionEnter: false}, 
					  		content_ids
					  	), 
					  React.createElement("li", {className: "ctr"}, 
					  	React.createElement("a", {onClick: this.addContent, className: "btn-flat waves-effect waves-light btn-flat expand"}, 
					  		React.createElement("i", {className: "mdi-content-add"})
					  	)
					  )
					)
				)
		)
		var loading = (React.createElement("div", {className: "progress", key: "empty"}, 
				    	React.createElement("div", {className: "indeterminate"})
					))
		return (
			React.createElement(ReactCSSTransitionGroup, {transitionName: "content-change", transitionLeave: false}, 
				this.state.loaded ? actualPage : loading
			)
			)
	}
})
