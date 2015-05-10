Page = React.createClass({displayName: "Page",
	render : function(){
		return(
		React.createElement("div", {className: "pure-g layout"}, 
			React.createElement(Repositories, null), 
			React.createElement(Contents, null)
		)
		)
	}
})