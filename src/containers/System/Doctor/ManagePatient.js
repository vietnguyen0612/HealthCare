import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import "./ManagePatient.scss";
import {
    getAllPatientForDoctor,
    postSendRemedy,
} from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf("day").valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        };
    }

    async componentDidMount() {
        this.getDataPatient();
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formattedDate,
        });
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            });
        }
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    handleOnChangeDatePicker = (date) => {
        this.setState(
            {
                currentDate: date[0],
            },
            async () => {
                await this.getDataPatient();
            }
        );
    };
    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        };

        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
        });
    };
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {},
        });
    };
    sendRemedy = async (dataChild) => {
        let dataModal = this.state.dataModal;
        this.setState({
            isShowLoading: true,
        });
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
        });

        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false,
            });
            toast.success("Send remedy succed");
            await this.getDataPatient();
        } else {
            this.setState({
                isShowLoading: false,
            });
            toast.error("Somethings wrongs....");
            console.log("send remedy err: ", res);
        }
    };

    render() {
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text="Loading...">
                    <div className="manage-patient-container">
                        <div className="m-p-title">
                            Quản lý bệnh nhân khám bệnh
                        </div>
                        <div className="manage-patient-body row">
                            <div className="col-4 form-group">
                                <label>Chọn ngày khám</label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleOnChangeDatePicker}
                                    minDate={new Date().setHours(0, 0, 0, 0)}
                                    value={this.state.currentDate}
                                />
                            </div>
                            <div className="col-12 table-manage-patient">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Họ Và Tên</th>
                                            <th>Địa chỉ</th>
                                            <th>Giới tính</th>
                                            <th>Actions</th>
                                        </tr>

                                        {dataPatient &&
                                        dataPatient.length > 0 ? (
                                            dataPatient.map((item, index) => {
                                                let time =
                                                    language === LANGUAGES.VI
                                                        ? item
                                                              .timeTypeDataPatient
                                                              .valueVi
                                                        : item
                                                              .timeTypeDataPatient
                                                              .valueEn;
                                                let gender =
                                                    language === LANGUAGES.VI
                                                        ? item.patientData
                                                              .genderData
                                                              .valueVi
                                                        : item.patientData
                                                              .genderData
                                                              .valueEn;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .firstName
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .address
                                                            }
                                                        </td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button
                                                                className="mp-btn-confirm"
                                                                onClick={() =>
                                                                    this.handleBtnConfirm(
                                                                        item
                                                                    )
                                                                }>
                                                                Xác nhận
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    style={{
                                                        textAlign: "center",
                                                    }}>
                                                    không có bệnh nhân đặt lịch
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
