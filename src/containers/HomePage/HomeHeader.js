import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";
import { getAllSpecialty, getAllClinic } from "../../services/userService";
import * as actions from "../../store/actions";
import Logo from "../logo/Logo";

class HomeHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSearch: [],
            searchResult: [],
            isShowSearchResult: false,
        };
    }

    async componentDidMount() {
        let data = [];

        this.props.loadTopDoctors();
        let resClinic = await getAllClinic();
        if (resClinic && resClinic.errCode === 0) {
            let replaceResClinic = resClinic.data.map((item) => {
                return {
                    keySearch: 1,
                    id: item.id,
                    name: item.name,
                    image: item.image,
                };
            });
            data.push(...replaceResClinic);
        }

        let resSpecialty = await getAllSpecialty();
        if (resSpecialty && resSpecialty.errCode === 0) {
            let replaceResSpecialty = resSpecialty.data.map((item) => {
                return {
                    keySearch: 2,
                    id: item.id,
                    name: item.name,
                    image: item.image,
                };
            });
            data.push(...replaceResSpecialty);
        }

        let arrDoctors = this.props.topDoctorsRedux;

        if (arrDoctors && arrDoctors.length > 0) {
            let replaceArrDoctors = arrDoctors.map((item) => {
                let name = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                let imageBase64 = "";
                if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                    );
                }
                return {
                    keySearch: 3,
                    id: item.id,
                    name: name,
                    image: imageBase64,
                };
            });
            data.push(...replaceArrDoctors);
        }

        this.setState({
            dataSearch: data,
        });
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };
    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    };

    handleClickSpecialty = () => {
        if (this.props.history) {
            this.props.history.push(`/medical-specialty`);
        }
    };

    handleClickFacility = () => {
        if (this.props.history) {
            this.props.history.push(`/health-facilities`);
        }
    };

    handleClickDoctor = () => {
        if (this.props.history) {
            this.props.history.push(`/list-doctor`);
        }
    };

    removeDiacritics = (str) => {
        str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        // Thay thế khoảng trắng cho các ký tự đặc biệt
        str = str.replace(/[^A-Za-z0-9]/g, " ");

        // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
        str = str.trim();

        // Chuyển đổi chuỗi thành chữ thường
        str = str.toLowerCase();

        return str;
    };

    handleOnchangeInput = (e) => {
        let valueInput = e.target.value;

        let result = [];
        this.state.dataSearch.forEach((item) => {
            if (
                this.removeDiacritics(item.name).includes(
                    this.removeDiacritics(valueInput)
                )
            ) {
                result.push(item);
            }
        });

        this.setState({
            searchResult: result,
        });
    };

    onFocusInput = () => {
        this.setState({
            isShowSearchResult: true,
        });
    };
    onBlurInput = () => {
        this.setState({ isShowSearchResult: false });
    };
    handleClickElement = (item) => {
        if (item.keySearch === 1) {
            if (this.props.history) {
                this.props.history.push(`/detail-clinic/${item.id}`);
            }
        }
        if (item.keySearch === 2) {
            if (this.props.history) {
                this.props.history.push(`/detail-specialty/${item.id}`);
            }
        }
        if (item.keySearch === 3) {
            if (this.props.history) {
                this.props.history.push(`/detail-doctor/${item.id}`);
            }
        }
    };

    render() {
        let language = this.props.language;
        let { searchResult, isShowSearchResult } = this.state;

        console.log("check search result:", searchResult);
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <div
                                className="header-logo"
                                onClick={() => this.returnToHome()}>
                                <Logo />
                            </div>
                        </div>
                        <div className="center-content">
                            <div
                                className="child-content"
                                onClick={() => this.handleClickSpecialty()}>
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.specialty" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.searchdoctor" />
                                </div>
                            </div>
                            <div
                                className="child-content"
                                onClick={() => this.handleClickFacility()}>
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.health-facility" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.select-room" />
                                </div>
                            </div>
                            <div
                                className="child-content"
                                onClick={() => this.handleClickDoctor()}>
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.doctor" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.select-doctor" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="homeheader.support" />
                            </div>

                            <div
                                className={
                                    language === LANGUAGES.VI
                                        ? "language-VN active"
                                        : "language-VN"
                                }>
                                <span
                                    onClick={() => {
                                        this.changeLanguage(LANGUAGES.VI);
                                    }}>
                                    {" "}
                                    VN{" "}
                                </span>
                            </div>
                            <div
                                className={
                                    language === LANGUAGES.EN
                                        ? "language-EN active"
                                        : "language-EN"
                                }>
                                <span
                                    onClick={() => {
                                        this.changeLanguage(LANGUAGES.EN);
                                    }}>
                                    {" "}
                                    EN{" "}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner && (
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1">
                                <FormattedMessage id="banner.title1" />
                            </div>
                            <div className="title2">
                                <FormattedMessage id="banner.title2" />
                            </div>
                            <div className="search">
                                <i className="fas fa-search"></i>

                                <input
                                    type="text"
                                    placeholder="Tìm kiếm"
                                    onChange={(e) => {
                                        this.handleOnchangeInput(e);
                                    }}
                                    onFocus={() => this.onFocusInput()}
                                    onBlur={() => this.onBlurInput()}
                                />

                                {isShowSearchResult && (
                                    <div className="search-result">
                                        {searchResult &&
                                            searchResult.map((item, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="element"
                                                        onMouseDown={() =>
                                                            this.handleClickElement(
                                                                item
                                                            )
                                                        }>
                                                        <div
                                                            className="element-image"
                                                            style={{
                                                                backgroundImage: `url(${item.image})`,
                                                            }}></div>
                                                        <div className="element-name">
                                                            {item.name}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="content-down">
                            <div className="options">
                                <div className="icon-child">
                                    <i className="far fa-hospital"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child1" />
                                </div>
                            </div>
                            <div className="options">
                                <div className="icon-child">
                                    <i className="fas fa-mobile-alt"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child2" />
                                </div>
                            </div>
                            <div className="options">
                                <div className="icon-child">
                                    <i className="fas fa-procedures"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child3" />
                                </div>
                            </div>
                            <div className="options">
                                <div className="icon-child">
                                    <i className="fas fa-flask"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child4" />
                                </div>
                            </div>
                            <div className="options">
                                <div className="icon-child">
                                    <i className="fas fa-user-md"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child5" />
                                </div>
                            </div>
                            <div className="options">
                                <div className="icon-child">
                                    <i className="fas fa-ambulance"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child6" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) =>
            dispatch(changeLanguageApp(language)),
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
