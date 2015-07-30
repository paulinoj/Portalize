var React = require('react');

var About = React.createClass({

  render: function() {
    return (
      <div className="row">
        <div className="col-md-12 text-center" id="about-us-container">
          <h2 className="heading">Our Team</h2>
          <hr className="primary"></hr>
          <div className="member-profiles row text-left">
            <div className="member-profile col-xs-3" id="jack-profile">
              <img src="./assets/niall.jpeg" className="profile-image center-block" />
              <h3 className="text-center row profile-name">Niall OKane</h3>
              <p className="text-muted text-center">Product Owner</p>
              <div className="text-center row">
                <ul className="nav navbar navbar-nav about-us-nav">
                  <li>
                    <a href="https://github.com/nokane" target="_blank"><i className="fa fa-github-square fa-1x"></i></a>
                  </li>
                  <li>
                    <a href="#" target="_blank"><i className="fa fa-linkedin-square fa-1x"></i></a>
                  </li>
                  <li>
                    <a href="#" target="_blank"><i className="fa fa-angellist fa-1x"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="member-profile col-xs-3" id="jack-profile">
              <img src="./assets/brett.jpeg" className="profile-image center-block" />
              <h3 className="text-center row profile-name">Brett Kan</h3>
              <p className="text-muted text-center">Scrum Master</p>
              <div className="text-center row">
                <ul className="nav navbar navbar-nav about-us-nav">
                  <li>
                    <a href="https://github.com/brettkan" target="_blank"><i className="fa fa-github-square fa-1x"></i></a>
                  </li>
                  <li>
                    <a href="#" target="_blank"><i className="fa fa-linkedin-square fa-1x"></i></a>
                  </li>
                  <li>
                    <a href="#" target="_blank"><i className="fa fa-angellist fa-1x"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="member-profile col-xs-3" id="jack-profile">
              <img src="./assets/leon.jpeg" className="profile-image center-block" />
              <h3 className="text-center row profile-name">Leon Yip</h3>
              <p className="text-muted text-center">Full-Stack Engineer</p>
              <div className="text-center row">
                <ul className="nav navbar navbar-nav about-us-nav">
                  <li>
                    <a href="https://github.com/lyip1992" target="_blank"><i className="fa fa-github-square fa-1x"></i></a>
                  </li>
                  <li>
                    <a href="#" target="_blank"><i className="fa fa-linkedin-square fa-1x"></i></a>
                  </li>
                  <li>
                    <a href="#" target="_blank"><i className="fa fa-angellist fa-1x"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="member-profile col-xs-3" id="jack-profile">
              <img src="./assets/john.jpeg" className="profile-image center-block" />
              <h3 className="text-center row profile-name">John Paulino</h3>
              <p className="text-muted text-center">Full-Stack Engineer</p>
              <div className="text-center row">
                <ul className="nav navbar navbar-nav about-us-nav">
                  <li>
                    <a href="https://github.com/paulinoj" target="_blank"><i className="fa fa-github-square fa-1x"></i></a>
                  </li>
                  <li>
                    <a href="#" target="_blank"><i className="fa fa-linkedin-square fa-1x"></i></a>
                  </li>
                  <li>
                    <a href="#" target="_blank"><i className="fa fa-angellist fa-1x"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = About;
