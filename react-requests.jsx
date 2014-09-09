/** * @jsx React.DOM */

(function (window, React) {
	"use strict";

	function request(url, options) {
		var request = new XMLHttpRequest();
		options = options || {};
		var method = options.method || "GET";
		request.open(method, url, true);

		request.onload = function() {
			if (request.status >= 200 && request.status < 400){
			  var data = JSON.parse(request.responseText);
			  if (typeof options.success === "function") return options.success(data, request);
			} else {
			  // We reached our target server, but it returned an error
			  if (typeof options.error === "function") return options.error(request);
			}
		};

		if (typeof options.error === "function") {
			request.onerror = options.error;
		}

		request.send();
	}

	var ReactRequest = React.createClass({
		getDefaultProps: function() {
	    return {
	      protocol: "http",
	      targetUrl: "",
	      queryString: "{}",
	      method: "GET"
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
			request(this.url(), {
				method: this.props.method,
				success: function (data) {
					this.setState({data: JSON.stringify(data, 2, 2)})
				}.bind(this)
			});
		},

		render: function () {
			return (
				<div className="reactRequest">
					<h3 className="reactRequest-url">
						<span className="reactRequest-method">{this.props.method}</span>
						{this.url()}
					</h3>
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