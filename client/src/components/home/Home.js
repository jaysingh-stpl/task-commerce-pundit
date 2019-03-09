import React, {Component} from "react";
import {connect} from "react-redux";

import {Link} from "react-router-dom";
import {logoutUser} from "../../actions/authAction";
import "./home.css";
import ReactGA from "react-ga";
import logo from "../../assets/img/nophoto.jpg"

ReactGA.initialize("UA-127081367-1");
ReactGA.pageview(window.location.pathname + window.location.search);

class Home extends Component {
    componentWillMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    logOut = () => {
        window.closeOverlay();
        this.props.logoutUser(this.props.history);
    };

    render() {
        return (
            <section className="view intro-2">
                <div className="mask">
                    <div className="container h-100 d-flex justify-content-center align-items-center">
                        <div className="col-md-4 col-sm-12">
                            <div className="card">
                                <img src={logo} alt="Image" style={{"width":"100%",'height':"200px"}}/>
                                <h1>
                                    <b>{this.props.auth.user.name}</b>
                                </h1>
                                <p className="title">
                                    {this.props.auth.user.occupation}
                                </p>

                                <div className="md-form">
                                    <div className="text-center">
                                        {this.props.auth.user.email}
                                    </div>
                                </div>
                                <p>
                                    {this.props.auth.user.address}
                                </p>
                                <div className="social">
                                    <Link to="/#"><i className="fa fa-dribbble"></i></Link>
                                    <Link to="/#"><i className="fa fa-twitter"></i></Link>
                                    <Link to="/#"><i className="fa fa-linkedin"></i></Link>
                                    <Link to="/#"><i className="fa fa-facebook"></i></Link>
                                </div>
                                <p className="logout">
                                    <button className="text-center" onClick={this.logOut}>
                                        <a className="btn">
                                            Logout
                                        </a>
                                    </button>
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    {logoutUser}
)(Home);
