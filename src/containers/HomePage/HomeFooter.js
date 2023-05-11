import React, { Component } from "react";
import { connect } from "react-redux";

class HandBook extends Component {
    render() {
        return (
            <div
                className="home-footer text-center"
                style={{ backgroundColor: "#adadd1", height: "30" }}>
                <p>&copy; HealthCare hãy nói theo cách của bạn</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
