var Repositories = React.createClass({displayName: "Repositories",
	render : function(){
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
		)
	}
})