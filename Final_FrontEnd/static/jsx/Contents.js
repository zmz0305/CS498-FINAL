var Contents = React.createClass({
	getInitialState: function() {
	    return {
	      contents: [
	      	{id: "", name: "Homework"},
	      	{id: "", name: "Announcement"}
	      ]
	    };
	},
	render : function(){
		var contents = this.state.contents.map(function(data){
			return (<Content name={data.name}/>)
		});
		return (
				<div className="contents">
					<h1>Contents</h1>
					{contents}
					<div className="add-newContent">
						<a>Add new Content</a>
					</div>
				</div>
		);
	}
})