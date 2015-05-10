Page = React.createClass({displayName: "Page",
	render : function(){
		return(
		React.createElement("div", {className: "pure-g layout"}, 
			React.createElement("div", {className: "repositories"}, 
				React.createElement("div", {className: "icon"}, 
					React.createElement("img", {src: "http://www.gravatar.com/avatar/f26103f436a1f8b884a1feb728001987?s=300", alt: ""}), 
					React.createElement("p", null, "darwinsenior")
				), 
				React.createElement("div", {className: "repos"}, 
					React.createElement("ul", null, 
						React.createElement("li", null, React.createElement("a", {href: "#"}, "CS450")), 
						React.createElement("li", null, React.createElement("a", {href: "#"}, "CS498")), 
						React.createElement("li", null, React.createElement("a", {href: "#"}, "CS374")), 
						React.createElement("li", null, React.createElement("a", {href: "#"}, "PHYS326")), 
						React.createElement("li", null, React.createElement("a", {href: "#"}, "PHYS435"))
					)
				), 
				React.createElement("div", {className: "add-repo"}, 
					React.createElement("a", {href: "#"}, "Add Repository")
				)
			), 
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
		)
	}
})