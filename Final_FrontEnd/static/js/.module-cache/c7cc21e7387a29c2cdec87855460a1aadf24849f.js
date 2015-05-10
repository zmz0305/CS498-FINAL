var Contents = React.createClass({displayName: "Contents",
	render : function(){
		return (
				React.createElement("div", {className: "contents"}, 
					React.createElement("h1", null, "Contents"), 
					React.createElement("div", {className: "content"}, 
						React.createElement("div", {className: "header"}, 
							React.createElement("span", null, "Homework"), 
							React.createElement("a", {href: "#", className: "toogleup"})
						), 
						React.createElement("div", {className: ""}
						)
					), 
					React.createElement("div", {className: "content"}, 
						React.createElement("div", {className: "header"}, 
							React.createElement("span", null, "Homework"), 
							React.createElement("a", {href: "#", className: "toogleup"})
						)
					), 
					React.createElement("div", {className: "add-newContent"}, 
						React.createElement("a", null, "Add new Content")
					)
				)
		)
	}
})