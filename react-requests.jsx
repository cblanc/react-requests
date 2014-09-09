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
	      targetUrl: "",
	      queryString: "{}"
	    };
	  },

		getInitialState: function () {
			var queryString;
			try {
				queryString = JSON.parse(this.props.queryString)
			} catch (e) {
				console.error("Invalid query string presented to React Request widget:", this.props.queryString);
				queryString = {};
			}
			return { 
				data: "",
				queryString: queryString
			};
		},

		url: function () {
			var url = [this.props.protocol,"://",this.props.targetUrl].join("");
			var queryString = "";
			var queryObject = this.state.queryString;

			for (var key in queryObject) {
				if (queryObject.hasOwnProperty(key)) {
					queryString += encodeURI([key,"=",queryObject[key]].join(""))	
				}
			}
			
			if (queryString.length) {
				return url + "?" + queryString;
			} else {
				return  url;
			}
		},

		handleClick: function (event) {
			this.setState({data: ""});
			$.ajax(this.url(), {
				success: function (data) {
					this.setState({data: JSON.stringify(data, 2, 2)})
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