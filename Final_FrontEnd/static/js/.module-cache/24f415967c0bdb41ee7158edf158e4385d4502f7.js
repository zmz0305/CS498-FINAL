Content = React.createClass({displayName: "Content",
	render: function(){
		return (
			React.createElement("div", {className: "content"}, 
				React.createElement("div", {className: "header"}, 
					React.createElement("span", null, this.props.name), 
					React.createElement("a", {href: "#", className: "toogleup"})
				), 
				React.createElement("div", {className: ""}
				)
			)
			)
	}
})