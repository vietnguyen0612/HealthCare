import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HealthFacility.scss";
import HomeHeader from "../HomeHeader";
import { getAllClinic } from "../../../services/userService";
class HealthFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinics: [],
        };
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : [],
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    handleClick = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`);
        }
    };

    render() {
        let { dataClinics } = this.state;
        console.log(dataClinics);
        return (
            <>
                <HomeHeader />
                <div className="health-facility-container">
                    <h1>Cơ sở y tế</h1>
                    {dataClinics &&
                        dataClinics.length > 0 &&
                        dataClinics.map((item, index) => {
                            return (
                                <div
                                    className="facility"
                                    onClick={() => this.handleClick(item)}>
                                    <div
                                        className="facility-image"
                                        style={{
                                            backgroundImage: `url(${item.image})`,
                                        }}></div>
                                    <div className="facility-name">
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

export default connect(mapStateToProps, mapDispatchToProps)(HealthFacility);
