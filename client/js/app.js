var NavBar = require('./navBar');
var VideoChat = require('./videoChat');

var Main = React.createClass({
  render: function() {
    return (
      <div>
        <NavBar />
        <VideoChat />
      </div>
    );
  }
});

React.render(<Main />, document.getElementById('app'));
