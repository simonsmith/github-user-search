var React = require('react');
var State = require('react-router').State;

module.exports = React.createClass({
  mixins: [State],

  render: function() {
    return (
      <div className="Pagination">
        <a className="Pagination-prev" href="#">Previous</a>
        <a className="Pagination-next" href="#">Next</a>
      </div>
    )
  }
});
