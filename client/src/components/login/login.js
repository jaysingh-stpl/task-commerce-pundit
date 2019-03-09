import React, { Component } from "react";
import { Row, Input, Button } from "mdbreact";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { loginUser, registerUser } from "../../actions/authAction";
import PropTypes from "prop-types";
import ReactGA from "react-ga";
ReactGA.initialize("UA-127081367-1");
ReactGA.pageview(window.location.pathname + window.location.search);

const pStyle = {
  paddingLeft: "20px",
  paddingRight: "30px"
};

const pColor = {
  color: "#3b5998"
};

const hidden = {
  display: "none"
};

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    e.target.className += " was-validated";
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ errors: {} });
  }

  render() {
    return (
      <section className="view intro-2">
        <div className="mask">
          <div className="col-md-4"></div>
          <div className="container col-md-4 h-100 d-flex justify-content-center align-items-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body padding-bottom-40">
                    <div className="row mt-5 card-scroll">
                      <div className="col-md-12" style={pStyle}>
                        <h4 className="text-center margin-top-20">
                          <strong>Login</strong>
                        </h4>

                        <form className="needs-validation" noValidate onSubmit={this.onSubmit}>
                          <div className="form-group">
                            <Input
                              type="text"
                              hint="Email"
                              name="email"
                              id="orangeForm-name"
                              className="form-control"
                              required
                              className={classnames({
                                "is-invalid": this.state.errors.email
                              })}
                              value={this.state.email}
                              onChange={this.onChange}
                            />
                            {this.state.errors.email && (
                              <div className="invalid-feedback">
                                {this.state.errors.email}
                              </div>
                            )}
                          </div>

                          <div className="form-group">
                            <Input
                              type="password"
                              hint="Password"
                              name="password"
                              id="orangeForm-pass"
                              className="form-control"
                              required
                              className={classnames({
                                "is-invalid": this.state.errors.password
                              })}
                              value={this.state.password}
                              onChange={this.onChange}
                            />
                            {this.state.errors.password && (
                              <div className="invalid-feedback">
                                {this.state.errors.password}
                              </div>
                            )}
                          </div>

                          <div className="text-center">
                            <Button type="submit" className="btn btn-primary ">
                              Login
                            </Button>
                            <p className="text-center">
                              <Link className="text-15" to="/signup" >
                                Create a new account
                              </Link>
                            </p>

                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  registerUser: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.error
});

export default connect(
  mapStateToProps,
  { loginUser, registerUser }
)(Login);
