import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
    getAllDetailClinicById,
    getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetailClinic: {},
            arrDoctorId: [],
        };
    }

    async componentDidMount() {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            let res = await getAllDetailClinicById({
                id,
            });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
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

    render() {
        let { arrDoctorId, dataDetailClinic } = this.state;
        let { language } = this.props;

        console.log("check arrdoctor clinic:", arrDoctorId);
        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                    <h2
                        className="description-specialty"
                        dangerouslySetInnerHTML={{
                            __html: dataDetailClinic.name,
                        }}
                        style={{ marginTop: 70 }}>
                        {}
                    </h2>
                )}

                {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                    <div
                        className="description-specialty"
                        dangerouslySetInnerHTML={{
                            __html: dataDetailClinic.descriptionHTML,
                        }}
                        style={{ marginTop: 10 }}>
                        {}
                    </div>
                )}

                <div className="specialty-body">
                    {arrDoctorId &&
                        arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="detail-content-left">
                                        <ProfileDoctor
                                            doctorId={item}
                                            isShowDescriptionDoctor={true}
                                            isShowLinkDetail={true}
                                            isShowPrice={false}
                                        />
                                    </div>
                                    <div className="content-right">
                                        <div className="detail-doctor-schedule">
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className="detail-doctor-extra-info">
                                            <DoctorExtraInfo
                                                doctorIdFromParent={item}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
