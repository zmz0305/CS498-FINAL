Repository = React.createClass({displayName: "Repository",
	getInitialState: function(){
	    return {
	    	name : "",
	    	loaded : false,
	    	url : "",
	    	contents: [],
	    	id : ""
	    }
	},
	componentDidMount: function(){
		this.refresh();
	},
	refresh: function(){
		$.get("/api/repositories/"+this.props.repo_id, (function(data){
			if (data.status == "success"){
				this.setState({id: data.data.id});
				this.setState({name: data.data.name});
				this.setState({url: data.data.url});
				this.setState({contents: data.data.contents});
			}
		}).bind(this));
		this.setState({loaded: true});	
	},
	handleClick : function(){
		window.actions.changeContent(this.state.contents, this.state.name, this.state.id);
		window.actions.changeRepoFocus(this.props.repo_id);
	},
	handleDelete : function(event){
		var del = (function(){
			$.post('/user',
				{
					"action" : "delete_repo",
					"data" : this.state.id
				},
				function(){
					window.actions.refreshRepositories();
				});
		}).bind(this);
		var dom = (React.createElement(ConfirmationModal, {execute: del}, "Are you sure you want to delete it?"));
		window.actions.changeModal(dom);
		event.stopPropagation();
	},
	render : function(){
		var color = this.props.focus ? "light-blue lighten-4 white-text" : "";
		var loader = (React.createElement("div", {class: "progress"}, 
      					React.createElement("div", {class: "indeterminate"})
  					));
		var actual_page = (
			React.createElement("li", {className: "collection-item "+color, onClick: this.handleClick}, 
				React.createElement("div", {className: "secondary-content", onClick: this.handleDelete}, 
					React.createElement("i", {className: "fa fa-times"})
				), 
				this.state.name
			)
		);
		return (this.state.loaded? actual_page : loader);
	}
})