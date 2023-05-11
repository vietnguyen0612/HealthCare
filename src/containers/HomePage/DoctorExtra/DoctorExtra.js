import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DoctorExtra.scss";
import HomeHeader from "../HomeHeader";
import { getAllClinic } from "../../../services/userService";
import * as actions from "../../../store/actions";

class DoctorExtra extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameSearch: "",
            arrDoctors: [],
        };
    }

    async componentDidMount() {
        this.props.loadTopDoctors();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux,
            });
        }
    }

    handleClick = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${item.id}`);
        }
    };

    handleOnChangeInput = (e) => {
        let inputName = e.target.value;
        this.setState({
            nameSearch: inputName,
        });
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

    render() {
        let { arrDoctors, nameSearch } = this.state;

        let { language } = this.props;
        let doctorRender = [];
        if (nameSearch === "") {
            doctorRender = arrDoctors;
        } else {
            let arrDoctorSearch = [];
            arrDoctors.forEach((item) => {
                if (
                    this.removeDiacritics(item.lastName)
                    .includes(this.removeDiacritics(nameSearch))
                ) {
                    arrDoctorSearch.push(item);
                }
            });
            doctorRender = arrDoctorSearch;
        }
        return (
            <>
                <HomeHeader />
                <div className="search-doctor">
                    <label>Tìm kiếm bác sĩ</label>
                    <input
                        className="search-input"
                        onChange={(e) => this.handleOnChangeInput(e)}
                        placeholder={"Tìm kiếm bác sĩ"}
                        value={this.state.nameSearch}
                    />
                </div>
                <div className="list-doctor-container">
                    {doctorRender &&
                        doctorRender.length > 0 &&
                        doctorRender.map((item, index) => {
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
                                    key={index}
                                    className="doctor"
                                    onClick={() => this.handleClick(item)}>
                                    <div
                                        className="doctor-image"
                                        style={{
                                            backgroundImage: `url(${imageBase64})`,
                                        }}></div>
                                    <div className="doctor-name">
                                        {language === "vi" ? nameVi : nameEn}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtra);
