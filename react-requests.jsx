/** * @jsx React.DOM */

(function (window, React) {
	"use strict";

	var ReactRequest = React.createClass({
		render: function () {
			return (
				<div className="reactRequest">
					React Request Component!
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