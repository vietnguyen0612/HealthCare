import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { postVerifyBookingAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0,
        };
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get("token");
            let doctorId = urlParams.get("doctorId");
            let res = await postVerifyBookingAppointment({
                token: token,
                doctorId: doctorId,
            });
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                });
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        let { statusVerify } = this.state;
        return (
            <>
                <HomeHeader />
                <div style={{ marginTop: 60 }}>
                    {statusVerify === false ? (
                        <div>Loading data....</div>
                    ) : (
                        <div>
                            {this.state.errCode === 0 ? (
                                <div
                                    style={{
                                        fontSize: 17,
                                        fontWeight: 600,
                                        marginTop: 30,
                                        textAlign: "center",
                                        textTransform: "uppercase",
                                        color: "green",
                                    }}>
                                    Xác nhận lịch hẹn thành công
                                </div>
                            ) : (
                                <div
                                    style={{
                                        fontSize: 17,
                                        fontWeight: 600,
                                        padding: 30,
                                        textAlign: "center",
                                        textTransform: "uppercase",
                                        color: "red",
                                    }}>
                                    Lịch hẹn đã được xác nhận hoặc không tồn tại
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
