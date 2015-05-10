Repository = React.createClass({displayName: "Repository",
	getInitialState: function() {
		window.actions.changeContent = this.changeContent;
	    return {
	    	name : "",
	    	loaded : false,
	    	url : ""
	    }
	},
	componentDidMount: function(){
		$.get("/api/user/"+this.props.repo_id, (function(data){
			if (data.status == "success"){
				this.setState({name: name});
				this.setState({url: url});
			}
		}).bind(this));
		this.setState({loaded: true});
	},
	handleClick : function(){
		window.actions.changeContent(this.props);
		window.actions.changeRepoFocus(this.props.repo_id);
	},
	handleDelete : function(event){
		console.log("je");
		var del = function(){
			console.log("deleted!");
		}
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
				this.props.name
			)
		);
		return (this.state.loaded? actual_page : loader);
	}
})