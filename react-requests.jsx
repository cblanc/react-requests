/** * @jsx React.DOM */

(function (window, React) {
	"use strict";

	var ReactRequest = React.createClass({
		getInitialState: function () {
			return { 
				data: ""
			}
		},
		handleClick: function (event) {
			this.setState({data: ""});
			$.ajax(this.props.targetUrl, {
				success: function (data) {
					this.setState({data: JSON.stringify(data.result, 2, 2)})
				}.bind(this)
			});
		},
		render: function () {
			return (
				<div className="reactRequest">
					<h3 className="reactRequst-url">{this.props.targetUrl}</h3>
					<a className="reactRequest-button" onClick={this.handleClick}>Request</a>
					<pre>{this.state.data}</pre>
				</div>
			);
		}
	});


	if (typeof module === 'undefined') {
    window.ReactRequest = ReactRequest;
  } else {
    module.exports = TreeView;
  }
})(window, typeof require === 'function' ? require('react') : React);