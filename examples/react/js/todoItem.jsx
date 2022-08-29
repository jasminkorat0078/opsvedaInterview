/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
var app = app || {};

(function () {
	'use strict';

	var ESCAPE_KEY = 27;
	var ENTER_KEY = 13;

	app.TodoItem = React.createClass({
		handleSubmit: function (event) {
			var val = this.state.editText.trim();
			if (val) {
				this.props.onSave(val);
				this.setState({editText: val});
			} else {
				this.props.onDestroy();
			}
		},

		handleEdit: function () {
			this.props.onEdit();
			this.setState({editText: this.props.todo.title});
		},

		handleKeyDown: function (event) {
			if (event.which === ESCAPE_KEY) {
				this.setState({editText: this.props.todo.title});
				this.props.onCancel(event);
			} else if (event.which === ENTER_KEY) {
				this.handleSubmit(event);
			}
		},

		handleChange: function (event) {
			if (this.props.editing) {
				this.setState({editText: event.target.value});
			}
		},

		getInitialState: function () {
			return {editText: this.props.todo.title};
		},

		/**
		 * This is a completely optional performance enhancement that you can
		 * implement on any React component. If you were to delete this method
		 * the app would still work correctly (and still be very performant!), we
		 * just use it as an example of how little code it takes to get an order
		 * of magnitude performance improvement.
		 */
		shouldComponentUpdate: function (nextProps, nextState) {
			return (
				nextProps.todo !== this.props.todo ||
				nextProps.editing !== this.props.editing ||
				nextState.editText !== this.state.editText
			);
		},

		/**
		 * Safely manipulate the DOM after updating the state when invoking
		 * `this.props.onEdit()` in the `handleEdit` method above.
		 * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
		 * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
		 */
		componentDidUpdate: function (prevProps) {
			if (!prevProps.editing && this.props.editing) {
				var node = React.findDOMNode(this.refs.editField);
				node.focus();
				node.setSelectionRange(node.value.length, node.value.length);
			}
		},

		render: function () {
			var isTodo,l,l1,l2;
			if(this.props.todo && this.props.selectedTodos.length>0){
				isTodo = true
				l=true;
			}else{
				isTodo = false;
				l=false
			}
			if(this.props.selectedTodos.length>1){
				l1=true
			}else{
				l1=false
			}
			if(this.props.selectedTodos.length>2){
				l2=true
			}else{
				l2=false
			}
			
			const isYellow =isTodo && l? this.props.selectedTodos[this.props.selectedTodos.length-1].id === this.props.todo.id:false;
			const isPurple =isTodo && l1? this.props.selectedTodos[this.props.selectedTodos.length-2].id === this.props.todo.id:false;
			const isGreen =isTodo && l2? this.props.selectedTodos[this.props.selectedTodos.length-3].id === this.props.todo.id:false;
			console.log("component redered");
			return (
				<li className={classNames({
					completed: this.props.todo.completed,
					editing: this.props.editing,
				})}>
					<div className="view">
						<div className="view-content">
						<input
							className="toggle"
							type="checkbox"
							checked={this.props.todo.completed}
							onChange={this.props.onToggle}
						/>
						<label onDoubleClick={this.handleEdit} className={
							classNames({
								isYellow:isYellow,
								isGreen:isGreen,
								isPurple:isPurple
							})
						}>
							{this.props.todo.title}
						</label>
							
						</div>
						
						<div className="view-content">{new Date(this.props.todo.addTime).getHours()} - {new Date(this.props.todo.addTime).getMinutes()} {new Date(this.props.todo.addTime).getSeconds()}</div>
						{this.props.todo.completed && <div className="view-content">{new Date(this.props.todo.endTime).getHours()} - {new Date(this.props.todo.endTime).getMinutes()} {new Date(this.props.todo.endTime).getSeconds()}</div>}
						<button className="destroy" onClick={this.props.onDestroy} />
					</div>
					<input
						ref="editField"
						className="edit"
						value={this.state.editText}
						onBlur={this.handleSubmit}
						onChange={this.handleChange}
						onKeyDown={this.handleKeyDown}
					/>
				</li>
			);
		}
	});
})();
