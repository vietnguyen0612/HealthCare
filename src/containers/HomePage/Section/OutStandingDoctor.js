import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";
class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            arrDoctors: [],
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux,
            });
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`);
        }
    };

    handleClickSearch = () => {
        if (this.props.history) {
            this.props.history.push(`/list-doctor`);
        }
    };

    render() {
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props;
        console.log("check arrDoctor:  ", arrDoctors);
        return (
            <>
                <div className="section-share section-outstanding-doctor">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section">
                                <FormattedMessage id="homepage.out-standing-doctor" />
                            </span>
                            <button
                                className="btn-section"
                                onClick={() => this.handleClickSearch()}>
                                <FormattedMessage id="homepage.search" />
                            </button>
                        </div>
                        <div className="section-body">
                            <Slider {...this.props.settings}>
                                {arrDoctors &&
                                    arrDoctors.length > 0 &&
                                    arrDoctors.map((item, index) => {
                                        let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                        let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                        let imageBase64 = "";
                                        if (item.image) {
                                            imageBase64 = new Buffer(
                                                item.image,
                                                "base64"
                                            ).toString("binary");
                                        }
                                        return (
                                            <div
                                                className="section-customize"
                                                key={index}
                                                onClick={() =>
                                                    this.handleViewDetailDoctor(
                                                        item
                                                    )
                                                }>
                                                <div className="doctor">
                                                    <img src={imageBase64} />
                                                    <div className="position text-center">
                                                        <div>
                                                            {language ===
                                                            LANGUAGES.VI
                                                                ? nameVi
                                                                : nameEn}
                                                        </div>
                                                        <div>
                                                            {
                                                                item.Doctor_Info
                                                                    .Specialty
                                                                    .name
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
