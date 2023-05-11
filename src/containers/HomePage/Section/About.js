import React, { Component } from "react";
import { connect } from "react-redux";
import cucCNTT from "../../../assets/about/cuc-cong-nghe-thong-tin-bo-y-te-2.png";
import ictnews from "../../../assets/about/ictnews.png";
import infonet from "../../../assets/about/infonet.png";
import suckhoedoisong from "../../../assets/about/suckhoedoisong.png";
import vnexpress from "../../../assets/about/vnexpress.png";
import vtv1 from "../../../assets/about/vtv1.png";
import anhAbout from "../../../assets/about/anhAbout.jpg";
import "./About.scss";

class About extends Component {
    render() {
        return (
            <div className="section-about">
                <h2 className="section-about-header">
                    Đặt lịch khám bệnh: Tiết kiệm, thông minh và hiệu quả
                </h2>

                <div className="section-about-content-up">
                    <div className="content-left">
                        <ul>
                            <li>Không phải xếp hàng chờ đợi</li>
                            <li>
                                Được lựa chọn các giáo sư, tiến sĩ, bác sĩ
                                chuyên khoa giàu kinh nghiệm
                            </li>
                            <li>
                                Đội ngũ bác sĩ được đào tạo bài bản tại các
                                trường Đại học.
                            </li>
                            <li>
                                Hỗ trợ đặt khám trực tuyến trước khi đi khám
                                (miễn phí đặt lịch){" "}
                            </li>
                            <li>
                                Giảm thời gian chờ đợi khi làm thủ tục khám và
                                ưu tiên khám trước
                            </li>

                            <li>
                                Nhận được hướng dẫn chi tiết sau khi đặt lịch
                            </li>
                            <li>Bác sĩ nhận khám mọi độ tuổi</li>
                        </ul>
                    </div>

                    <div className="content-right">
                        <img alt="ảnh" src={anhAbout} />
                    </div>
                </div>
                <div className="section-about-content-down">
                    <h3>Truyền thông đưa tin về HealthCare</h3>
                    <div className="image">
                        <img alt="anh" src={cucCNTT} />
                        <img alt="anh" src={ictnews} />
                        <img alt="anh" src={infonet} />
                        <img alt="anh" src={suckhoedoisong} />
                        <img alt="anh" src={vnexpress} />
                        <img alt="anh" src={vtv1} />
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
