import doctorService from "../services/doctorService";

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;

    try {
        let response = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        });
    }
};

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from the server",
        });
    }
};

let postInfoDoctor = async (req, res) => {
    console.log("req.body", req.body);
    try {
        let response = await doctorService.saveDetailInfoDoctor(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from the server",
        });
    }
};

let getDetailDoctorById = async (req, res) => {
    try {
        let info = await doctorService.getDetailDoctorById(req.query.id);
        return res.status(200).json(info);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let bulkCreateSchedule = async (req, res) => {
    try {
        let info = await doctorService.bulkCreateSchedule(req.body);
        return res.status(200).json(info);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let getScheduleByDate = async (req, res) => {
    try {
        let info = await doctorService.getScheduleByDate(
            req.query.doctorId,
            req.query.date
        );
        return res.status(200).json(info);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let getExtraInfoDoctorById = async (req, res) => {
    try {
        let info = await doctorService.getExtraInfoDoctorById(
            req.query.doctorId
        );
        return res.status(200).json(info);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let getProfileDoctorById = async (req, res) => {
    try {
        let info = await doctorService.getProfileDoctorById(req.query.doctorId);
        return res.status(200).json(info);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let getListPatientForDoctor = async (req, res) => {
    try {
        let info = await doctorService.getListPatientForDoctor(req.query.doctorId, req.query.date);
        return res.status(200).json(info);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let sendRemedy = async (req, res) => {
    try {
        let info = await doctorService.sendRemedy(req.body);
        return res.status(200).json(info);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
}

module.exports = {
    getTopDoctorHome,
    getAllDoctors,
    postInfoDoctor,
    getDetailDoctorById,
    bulkCreateSchedule,
    getScheduleByDate,
    getExtraInfoDoctorById,
    getProfileDoctorById,
    getListPatientForDoctor,
    sendRemedy
};
