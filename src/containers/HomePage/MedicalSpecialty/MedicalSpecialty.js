import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./MedicalSpecialty.scss";
import HomeHeader from "../HomeHeader";
import { getAllSpecialty } from "../../../services/userService";
class MedicalSpecialty extends Component {
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

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    handleClick = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`);
        }
    };

    render() {
        let { dataSpecialty } = this.state;
        console.log(dataSpecialty);
        return (
            <>
                <HomeHeader />
                <div className="medical-specialty-container">
                    <h1>Chuyên khoa</h1>
                    {dataSpecialty &&
                        dataSpecialty.length > 0 &&
                        dataSpecialty.map((item, index) => {
                            return (
                                <div
                                    className="specialty"
                                    onClick={() => this.handleClick(item)}>
                                    <div
                                        className="specialty-image"
                                        style={{
                                            backgroundImage: `url(${item.image})`,
                                        }}></div>
                                    <div className="specialty-name">
                                        {item.name}
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalSpecialty);
