import axios from "../axios";

const handleLoginApi = (email, password) => {
    return axios.post("/api/login", { email, password });
};

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`);
};

const createNewUserService = (data) => {
    return axios.post("/api/create-new-user", data);
};

const deleteUserService = (id) => {
    return axios.delete("/api/delete-user", { data: { id: id } });
};

const editUserService = (data) => {
    return axios.put("/api/edit-user", data);
};

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`);
};

const saveDetailDoctor = (data) => {
    return axios.post(`/api/save-info-doctors`, data);
};

const getDetailInfoDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(
        `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
    );
};

const getExtraInfoDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-info-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookingAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data);
};

const postVerifyBookingAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data);
};
const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data);
};
const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`);
};
const getAllDetailSpecialtyById = (data) => {
    return axios.get(
        `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
    );
};

const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data);
};

const getAllClinic = () => {
    return axios.get(`/api/get-clinic`);
};

const getAllDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};

const getAllPatientForDoctor = (data) => {
    return axios.get(
        `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
    );
};

const postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data);
};

export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctor,
    getDetailInfoDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInfoDoctorById,
    getProfileDoctorById,
    postPatientBookingAppointment,
    postVerifyBookingAppointment,
    createNewSpecialty,
    getAllSpecialty,
    getAllDetailSpecialtyById,
    createNewClinic,
    getAllClinic,
    getAllDetailClinicById,
    getAllPatientForDoctor,
    postSendRemedy,
};
