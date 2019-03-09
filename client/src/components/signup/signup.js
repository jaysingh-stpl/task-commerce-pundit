import React, { Component } from "react";
import { Input, Button } from "mdbreact";
import { Link } from "react-router-dom";
import "../../assets/css/custom.css";
import "./signup.css";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authAction";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const pStyle = {
  paddingRight: "20px",
  paddingLeft: "20px"
};

const hidden = {
  display: "none"
};

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      userName: "",
      password: "",
      confirm_password: "",
      address: "",
      occupation:'',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const target = e.target.name;
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ errors: {} });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      Swal("success", "Your Welcome!", "success").then(result => {
        this.props.history.push("/home");
      });
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    e.target.className += " was-validated";
    const newUser = {
      email: this.state.email,
      name: this.state.userName,
      password: this.state.password,
      confirm_password: this.state.confirm_password,
      address: this.state.address,
      occupation: this.state.occupation
    };
    this.props.registerUser(newUser, this.props.history);
  }

  render(){
    return (
      <section className="row margin-top-20">
            <div className="col-md-4"></div>
              <div className="col-md-4">
                <div className="card">
                  <div className="col-md-12">
                    <div className="row ">
                      <div className="col-md-12" style={pStyle} >
                        <h5 className="text-center margin-top-20">
                          <strong>Register Here</strong>
                        </h5>
                        <form
                          className="needs-validation"
                          noValidate
                          onSubmit={this.onSubmit}
                        >
                          <div className="form-group">
                            <Input
                              type="text"
                              hint="Name"
                              name="userName"
                              required
                              className={classnames({"is-invalid": this.state.errors.name})}
                              value={this.state.userName}
                              onChange={this.onChange}
                            />
                            {this.state.errors.name && (
                              <div className="invalid-feedback">
                                {this.state.errors.name}
                              </div>
                            )}
                          </div>

                          <div className="form-group">
                            <Input
                              type="email"
                              hint="Email"
                              name="email"
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

                          <div className="form-group">
                            <Input
                              type="password"
                              hint="Confirm password"
                              name="confirm_password"
                              required
                              className={classnames({
                                "is-invalid": this.state.errors.confirm_password
                              })}
                              value={this.state.confirm_password}
                              onChange={this.onChange}
                            />
                            {this.state.errors.confirm_password && (
                              <div className="invalid-feedback">
                                {this.state.errors.confirm_password}
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <Input
                                type="text"
                                hint="Occupation"
                                name="occupation"
                                className="form-control"
                                value={this.state.occupation}
                                onChange={this.onChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="address" className="float-left">Address</label>
                            <textarea type="text" hint="Address" name="address" className="form-control" value={this.state.address} onChange={this.onChange}/>
                          </div>
                          <div className="text-center">
                            <Button type="submit" className="btn btn-primary">
                              Register
                            </Button>
                            <p className="text-center">
                              <Link className="text-15" to="/">
                                Already have an account?
                              </Link>
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <div className="col-md-4"></div>
      </section>
    );
  }
}

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.error
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Signup);
