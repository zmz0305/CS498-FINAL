var Contents = React.createClass({
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
        this.state.content_ids.each((function(data){
            traversal($("#page_data"));
            this.refs[data].componentDidMount();
        }).bind(this));

	},
	changeContent : function(content_ids, repo_name, id, html){
		this.setState({content_ids : content_ids});
		this.setState({repo_name : repo_name});
		this.setState({id: id});
		this.setState({loaded: true});
		this.setState({html : html});

		console.log(this.state.id);
	},
	addContent : function(){
		var dom = <AddContentModal html={this.state.html} repo_id={this.state.id}/>
		window.actions.changeModal(dom, "large");
	},
	render : function(){
		// console.log(this.state.content_ids);
		var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
		var content_ids = this.state.content_ids.map((function(data){
				return (<Content content_id={data} key={data} parent_id={this.state.id} ref={data} />);
			}).bind(this));
		var actualPage = (
				<div className="container" key={this.state.id+this.state.repo_name}>
                    <div id="page_data" dangerouslySetInnerHTML={{__html: this.state.html}} style={{display : "none"}}/>
					<h1>Class: {this.state.repo_name}</h1>
					<ul className="collapsible">
						<ReactCSSTransitionGroup transitionName="content-change" transitionLeave={false}>
					  		{content_ids}
					  	</ ReactCSSTransitionGroup>
					  <li className="ctr">
					  	<a onClick={this.addContent} className="btn-flat waves-effect waves-light btn-flat expand">
					  		<i className="mdi-content-add"></i>
					  	</a>
					  </li>
					</ul>
				</div>
		)
		var loading = (<div className="progress" key="empty">
				    	<div className="indeterminate"></div>
					</div>)
		return (
			<ReactCSSTransitionGroup transitionName="content-change" transitionLeave={false}>
				{this.state.loaded ? actualPage : loading}
			</ReactCSSTransitionGroup>
			)
	}
})