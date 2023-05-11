import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
import "./BookingModal.scss";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import Select from "react-select";
import { postPatientBookingAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";
import { LANGUAGES } from "../../../../utils";

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            phoneNumber: "",
            email: "",
            address: "",
            reason: "",
            birthday: "",
            genders: "",
            SelectedGender: "",
            doctorId: "",
            timeType: "",
        };
    }

    async componentDidMount() {
        this.props.fetchGenders();
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;

        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label = language === "vi" ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            });
        }
        return result;
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }

        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }

        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                this.setState({
                    doctorId: doctorId,
                    timeType: this.props.dataTime.timeType,
                });
            }
        }
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy,
        });
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0],
        });
    };

    handleChangeSelect = (selectedOptions) => {
        this.setState({
            SelectedGender: selectedOptions,
        });
    };
    handleConfirmBooking = async () => {
        // validate input
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        let res = await postPatientBookingAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            SelectedGender: this.state.SelectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        });

        if (res && res.errCode === 0) {
            toast.success("Booking a new appointment succeed!");
            this.props.closeBookingModal();
        } else {
            toast.error("Booking a new appointment error!");
        }
        console.log("check state: ", this.state);
    };
    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time =
                language === "vi"
                    ? dataTime.timeTypeData.valueVi
                    : dataTime.timeTypeData.valueEn;
            let date =
                language === "vi"
                    ? moment
                          .unix(+dataTime.date / 1000)
                          .format("dddd - DD/MM/YYYY")
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale("en")
                          .format("ddd - MM/DD/YYYY");

            return `${time} - ${date}`;
        }
        return "";
    };

    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name =
                language === LANGUAGES.VI
                    ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                    : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
            return name;
        }
        return "";
    };
    render() {
        let { isOpenModal, closeBookingModal, dataTime } = this.props;
        let doctorId = "";
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
        }

        return (
            <Modal
                isOpen={isOpenModal}
                className={"booking-modal-container"}
                size="xl">
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">
                            <FormattedMessage id="patient.booking-modal.title" />
                        </span>
                        <span className="right" onClick={closeBookingModal}>
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="booking-modal-body container">
                        {/* {JSON.stringify(dataTime)} */}
                        <div className="doctor-info">
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                                isShowLinkDetail={false}
                                isShowPrice={true}
                            />
                        </div>

                        <div className="row">
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.full-name" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.fullName}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "fullName")
                                    }
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.phone-number" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.phoneNumber}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(
                                            e,
                                            "phoneNumber"
                                        )
                                    }
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.email" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "email")
                                    }
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.address" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.address}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "address")
                                    }
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.reason" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.reason}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "reason")
                                    }
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.birthday" />
                                </label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleOnChangeDatePicker}
                                    // minDate={new Date().setHours(0, 0, 0, 0)}
                                    value={this.state.birthday}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.gender" />
                                </label>
                                <Select
                                    value={this.state.SelectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button
                            className="btn-booking-confirm"
                            onClick={() => this.handleConfirmBooking()}>
                            <FormattedMessage id="patient.booking-modal.confirm" />
                        </button>
                        <button
                            className="btn-booking-cancel"
                            onClick={closeBookingModal}>
                            <FormattedMessage id="patient.booking-modal.cancel" />
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
