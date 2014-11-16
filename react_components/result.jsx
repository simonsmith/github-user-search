var React =  require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="Result">
        <h2 className="Result-username">{this.props.username}</h2>
      </div>
    )
  }
});
