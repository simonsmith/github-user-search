var React =  require('react');
var Result = require('./result.jsx')

module.exports = React.createClass({
  render: function() {
    var results = this.props.results.items.map(function(user) {
      return (
        <li key={user.id} className="ResultsList-item">
          <Result username={user.login} />
        </li>
      )
    })

    return (
      <ul className="ResultsList">
        {results}
      </ul>
    )
  }
});
