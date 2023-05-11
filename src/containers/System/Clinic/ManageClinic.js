import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageClinic.scss";
import { CommonUtils } from "../../../utils";
import { createNewClinic } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    handleOnChangeInput = (e, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy,
        });
    };
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        });
    };
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };

    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state);
        if (res && res.errCode === 0) {
            toast.success("Add new clinic succeed!");
            this.setState({
                name: "",
                imageBase64: "",
                address: "",
                descriptionHTML: "",
                descriptionMarkdown: "",
            });
        } else {
            toast.error("Something wrongs...");
            console.log("check err res:", res);
        }
    };

    render() {
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">Quản lý phòng khám</div>

                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên phòng khám</label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.name}
                            onChange={(e) => {
                                this.handleOnChangeInput(e, "name");
                            }}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh phòng khám</label>
                        <input
                            className="form-control-file"
                            type="file"
                            onChange={(e) => this.handleOnChangeImage(e)}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Địa chỉ phòng khám</label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.address}
                            onChange={(e) => {
                                this.handleOnChangeInput(e, "address");
                            }}
                        />
                    </div>
                    <div className="col-12 form-group">
                        <MdEditor
                            style={{ height: "300px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button
                            className="btn-save-specialty"
                            onClick={() => {
                                this.handleSaveNewClinic();
                            }}>
                            Save
                        </button>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
