/** * @jsx React.DOM */

(function (window, React) {
	"use strict";

	if (window.jQuery) {
		var $ = window.jQuery;
	} else {
		return console.error("jQuery is required for the ReactRequest component");
	}

	var ReactRequest = React.createClass({
		getDefaultProps: function() {
	    return {
	      protocol: "http",
	      targetUrl: ""
	    };
	  },
		getInitialState: function () {
			return { 
				data: ""
			};
		},
		url: function () {
			return [this.props.protocol,"://",this.props.targetUrl].join("");
		},
		handleClick: function (event) {
			this.setState({data: ""});
			$.ajax(this.url(), {
				success: function (data) {
					this.setState({data: JSON.stringify(data.result, 2, 2)})
				}.bind(this)
			});
		},
		render: function () {
			return (
				<div className="reactRequest">
					<h3 className="reactRequst-url">{this.url()}</h3>
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