var React = require('react');
var About = require('./about');
var TechStack = require('./techStack');

var AboutPage = React.createClass({

  render: function() {
    return (
      <div>
        <TechStack />
        <About />
      </div>
    )
  }
});

module.exports = AboutPage;
