import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import { LANGUAGES } from "../../../utils";
import { getExtraInfoDoctorById } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";

class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
            extraInfo: {},
        };
    }

    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await getExtraInfoDoctorById(
                this.props.doctorIdFromParent
            );

            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInfoDoctorById(
                this.props.doctorIdFromParent
            );

            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data,
                });
            }
        }
    }

    handleClickIsShow() {
        this.setState({
            isShowDetailInfo: !this.state.isShowDetailInfo,
        });
    }

    render() {
        let { isShowDetailInfo, extraInfo } = this.state;
        let { language } = this.props;

        console.log("check extraInfo: ", extraInfo);

        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address">
                        <FormattedMessage id="patient.extra-doctor-info.text-address" />
                    </div>
                    <div className="name-clinic">
                        {extraInfo && extraInfo.nameClinic
                            ? extraInfo.nameClinic
                            : ""}
                    </div>
                    <div className="detail-address">
                        {extraInfo && extraInfo.addressClinic
                            ? extraInfo.addressClinic
                            : ""}
                    </div>
                </div>
                <div className="content-down">
                    <div className="up">
                        <span className="title-price">
                            <FormattedMessage id="patient.extra-doctor-info.price" />
                        </span>
                        {"   "}
                        {!isShowDetailInfo && (
                            <>
                                <span className="price">
                                    {extraInfo &&
                                        extraInfo.priceTypeData &&
                                        language === "vi" &&
                                        extraInfo.priceTypeData && (
                                            <NumberFormat
                                                value={
                                                    extraInfo.priceTypeData
                                                        .valueVi
                                                }
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                suffix={"VND"}
                                            />
                                        )}

                                    {extraInfo &&
                                        extraInfo.priceTypeData &&
                                        language === "en" &&
                                        extraInfo.priceTypeData && (
                                            <NumberFormat
                                                value={
                                                    extraInfo.priceTypeData
                                                        .valueEn
                                                }
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                suffix={"$"}
                                            />
                                        )}
                                    {"   "}
                                </span>
                                <span
                                    className="see-more"
                                    onClick={() => this.handleClickIsShow()}>
                                    {" "}
                                    <FormattedMessage id="patient.extra-doctor-info.detail" />
                                </span>
                            </>
                        )}
                    </div>
                    {isShowDetailInfo && (
                        <>
                            <div className="content-price">
                                <div className="content-price-up">
                                    <div className="price-title">
                                        <div className="left">
                                            <FormattedMessage id="patient.extra-doctor-info.price" />
                                            :
                                        </div>
                                        <div className="right">
                                            {extraInfo &&
                                                extraInfo.priceTypeData &&
                                                language === "vi" &&
                                                extraInfo.priceTypeData && (
                                                    <NumberFormat
                                                        value={
                                                            extraInfo
                                                                .priceTypeData
                                                                .valueVi
                                                        }
                                                        displayType={"text"}
                                                        thousandSeparator={true}
                                                        suffix={"VND"}
                                                    />
                                                )}

                                            {extraInfo &&
                                                extraInfo.priceTypeData &&
                                                language === "en" &&
                                                extraInfo.priceTypeData && (
                                                    <NumberFormat
                                                        value={
                                                            extraInfo
                                                                .priceTypeData
                                                                .valueEn
                                                        }
                                                        displayType={"text"}
                                                        thousandSeparator={true}
                                                        suffix={"$"}
                                                    />
                                                )}
                                        </div>
                                    </div>
                                    <div className="note">
                                        <small>
                                            {extraInfo && extraInfo.note
                                                ? extraInfo.note
                                                : ""}
                                        </small>
                                    </div>
                                </div>
                                <div className="content-price-down">
                                    <FormattedMessage id="patient.extra-doctor-info.payment" />{" "}
                                    {extraInfo &&
                                        extraInfo.paymentTypeData &&
                                        language === "vi" &&
                                        `${extraInfo.paymentTypeData.valueVi}`}
                                    {extraInfo &&
                                        extraInfo.paymentTypeData &&
                                        language === "en" &&
                                        `${extraInfo.paymentTypeData.valueEn}`}
                                </div>
                            </div>
                            <div
                                className="hide-price"
                                onClick={() => {
                                    this.handleClickIsShow();
                                }}>
                                <FormattedMessage id="patient.extra-doctor-info.hide-price" />
                            </div>
                        </>
                    )}
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
