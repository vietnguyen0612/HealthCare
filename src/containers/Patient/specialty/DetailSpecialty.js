import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailSpecialty.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
    getAllDetailSpecialtyById,
    getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetailSpecialty: {},
            doctorSpecialty: [],
            listProvince: [],
        };
    }

    async componentDidMount() {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            let res = await getAllDetailSpecialtyById({
                id: id,
                location: "All",
            });

            let resProvince = await getAllCodeService("PROVINCE");
            if (
                res &&
                res.errCode === 0 &&
                res.data &&
                res.data.doctorSpecialty &&
                res.data.doctorSpecialty.length > 0
            ) {
                this.setState({
                    doctorSpecialty: res.data.doctorSpecialty,
                });
            }
            if (
                res &&
                res.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0
            ) {
                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createAt: null,
                        keyMap: "All",
                        type: "PROVINCE",
                        valueEn: "All",
                        valueVi: "Toàn quốc",
                    });
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    listProvince: dataProvince ? dataProvince : [],
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if(prevState.doctorSpecialty !== this.state.doctorSpecialty) {
        //     this.setState({
        //     })
        // }
    }
    handleOnChangeSelect = async (e) => {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            let location = e.target.value;
            console.log("check location: ", location);
            let res = await getAllDetailSpecialtyById({
                id: id,
                location: location,
            });
            console.log("chekc res from handle On change:", res);
            if (res && res.errCode === 0) {
                this.setState({
                    doctorSpecialty: res.data.doctorSpecialty,
                    dataDetailSpecialty: res.data,
                });
            }
        }
    };

    render() {
        let { doctorSpecialty, dataDetailSpecialty, listProvince } = this.state;
        let { language } = this.props;
        console.log("check doctor specialty: ", doctorSpecialty);
        console.log("check list Province: ", listProvince);
        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                    <div
                        className="description-specialty"
                        dangerouslySetInnerHTML={{
                            __html: dataDetailSpecialty.descriptionHTML,
                        }}
                        style={{ marginTop: 60 }}>
                        {}
                    </div>
                )}

                <div className="specialty-body">
                    <div className="search-sp-doctor">
                        <select
                            onChange={(e) => {
                                this.handleOnChangeSelect(e);
                            }}>
                            {listProvince &&
                                listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === "vi"
                                                ? item.valueVi
                                                : item.valueEn}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    {doctorSpecialty &&
                        doctorSpecialty.length > 0 &&
                        doctorSpecialty.map((item, index) => {
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="detail-content-left">
                                        <ProfileDoctor
                                            doctorId={item.doctorId}
                                            isShowDescriptionDoctor={true}
                                            isShowLinkDetail={true}
                                            isShowPrice={false}
                                        />
                                    </div>
                                    <div className="content-right">
                                        <div className="detail-doctor-schedule">
                                            <DoctorSchedule
                                                doctorIdFromParent={
                                                    item.doctorId
                                                }
                                            />
                                        </div>
                                        <div className="detail-doctor-extra-info">
                                            <DoctorExtraInfo
                                                doctorIdFromParent={
                                                    item.doctorId
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
