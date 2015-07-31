var React           = require('react');
var Login           = require('./login.js');
var UserLogin       = require('./userLogin.js');
var Error           = require('./error.js');

var AboutPage       = require('./aboutPage.js');
var GettingStarted  = require('./gettingStarted.js');

var assign          = require('object-assign');
var Router = require('react-router');
var Link = require('react-router').Link;

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var RouteHandler = Router.RouteHandler;

var Main = React.createClass({
  getInitialState: function() {
    return {
      fieldValues: {email        : null,
                    password     : null }
    };
  },

  handleError: function(section, errorMessage) {
    var newState = {};
    newState[section] = errorMessage;
    this.setState(newState);
  },

  saveValues: function(fieldValues) {
    var newFields = {};
    var oldFields = this.state.fieldValues;
    for (var key in oldFields) {
      newFields[key] = oldFields[key];
    }
    for (var key in fieldValues) {
      newFields[key] = fieldValues[key];
    }
    this.setState({
      fieldValues: newFields 
    });
  },

  clearErrors: function() {
    this.setState({userLoginErrorMessage: null});
  },

  render: function() {
    return (
      <div className = 'container'>
      
        <nav className='navbar navbar-default'>
          <div className='container-fluid'>
            <div className='navbar-brand'>Portalize</div>

            <div className='navbar-brand links'>
              <div className='portal-btn first-btn'><Link to={"/about"}>About</Link></div>
              <span> / </span>
              <div className='portal-btn'><Link to={"/getting-started"}>Getting Started</Link></div>
              <span> / </span>
              <div className='portal-btn'><Link to={"/"}>Sign Up</Link></div>
            </div>

            <div className='login'>
              <UserLogin fieldValues={this.state.fieldValues}
                                     saveValues={this.saveValues} handleError={this.handleError} />
            </div>            
          </div>
        </nav>

        <div className='column'>
        </div>
        <div className='column'>
            {this.state.userLoginErrorMessage ? <Error errorMessage={this.state.userLoginErrorMessage} /> :
            <div className='errorView'></div> }
        </div>

        <RouteHandler />

      </div>
    )
  }
});

var routes = (
  <Route handler={Main}>
    <DefaultRoute handler={Login} />
    <Route path='about' handler={AboutPage} />
    <Route path='getting-started' handler={GettingStarted} />
    <NotFoundRoute handler={Login} />
  </Route>
);

Router.run(routes, function(Root) {
  React.render(<Root/>, document.getElementById('login-form'));
});