import patientService from "../services/patientService";

let postBookAppointment = async (req, res) => {
    try {
        let info = await patientService.postBookAppointment(req.body);
        return res.status(200).json(info);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        });
    }
};

let postVerifyBookAppointment = async (req, res) => {
    try {
        let info = await patientService.postVerifyBookAppointment(req.body);
        return res.status(200).json(info);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        });
    }
};

module.exports = {
    postBookAppointment,
    postVerifyBookAppointment,
};
