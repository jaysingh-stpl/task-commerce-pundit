import React, {Component} from "react";
import {connect} from "react-redux";
import "./404.css";
import { Link} from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <section className="view intro-2">
                <div className="mask">
                    <div className="container h-100 d-flex justify-content-center align-items-center">
                        <div className="row pt-5 mt-5">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body padding-bottom-40">
                                        <div className="row mt-5 card-scroll">
                                            <div className="col-md-12 ml-lg-12 ml-md-12">
                                                <h5 className="text-center margin-top-20">
                                                    <strong>Not Found</strong>
                                                </h5>
                                                <hr />
                                                <div className="md-form">
                                                    <div className="text-center">
                                                        <b>404 Page not found!</b>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="text-center" style={{ width: "350px" }}>
                                                    <Link to="/login">Back to Home</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
    mapStateToProps
)(Home);
