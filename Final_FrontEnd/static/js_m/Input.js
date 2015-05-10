var Input=React.createClass({displayName: "Input",
	getInitialState: function() {
		return {value: this.props.value || ""};
	},
	handleChange: function(event) {
		this.setState({value: event.target.value});
	},
	validate: function(){
		if (this.props.validate == "email"){
			return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(this.state.value);
		}
		if (this.props.validate == "alphabets"){
			return /[a-z]+/.test(this.state.value);
		}
		return true;
	},
	getValue: function(){
		return this.state.value;
	},
	render: function() {
		var value = this.state.value;
		var active = value ? "active" : "";
		var valid = this.validate() ? "validate" : " validate invalid";
		return (
			React.createElement("div", {className: "row"}, 
				React.createElement("div", {className: "input-field col s12"}, 
					React.createElement("label", {className: active}, " ", this.props.label || "", " "), 
					React.createElement("input", {type: "text", value: value, onChange: this.handleChange, className: valid, ref: "inputvalue"})
				)
			)
			);
 	}
})