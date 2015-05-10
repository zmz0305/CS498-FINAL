var Slider = react.createClass({
	getInitialState : function(){
		return {
			value : this.props.initValue || 0
		}
	},
	getValue : function(){
		return this.state.value;
	},
	handleChange : function(event){
		this.setState({value : event.target.value});
	},
	render : function(){
		return (<div className="range-field">
					<input type="range" onChange={this.handleChange} min={this.props.min || 0} max={this.props.max} value={this.state.value} />
				</div>
			)
	}
});