import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./Logo.scss";
import logo from "../../assets/logoVietNam.jpg";

class Logo extends Component {
    render() {
        return (
            <div className="logo">
                <img src={logo} alt="Fashionista" className="logo-img" />
                <h1 className="logo-text">HealthCare</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Logo);
