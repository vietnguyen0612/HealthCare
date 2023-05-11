import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { getAllSpecialty } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        };
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data,
            });
        }
    }
    handleViewDetailDoctor = (specialty) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${specialty.id}`);
        }
    };

    handleSeeMore = () => {
        if (this.props.history) {
            this.props.history.push(`/medical-specialty`);
        }
    };
    render() {
        let { dataSpecialty } = this.state;
        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.specialty-popular" />
                        </span>
                        <button
                            className="btn-section"
                            onClick={() => {
                                this.handleSeeMore();
                            }}>
                            <FormattedMessage id="homepage.more-info" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataSpecialty &&
                                dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div
                                            className="section-customize"
                                            key={index}
                                            onClick={() =>
                                                this.handleViewDetailDoctor(
                                                    item
                                                )
                                            }>
                                            <div className="section-customize">
                                                <div
                                                    className="bg-image"
                                                    style={{
                                                        backgroundImage: `url(${item.image})`,
                                                    }}></div>
                                                <div className="specialty-name">
                                                    {item.name}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </Slider>
                    </div>
                </div>
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

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
