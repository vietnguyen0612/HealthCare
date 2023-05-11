import db from "../models/index";
require("dotenv").config();
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";

let buildURLEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;

    return result;
};

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.email ||
                !data.doctorId ||
                !data.timeType ||
                !data.date ||
                !data.fullName ||
                !data.SelectedGender ||
                !data.address
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!",
                });
            } else {
                // upSert patient
                let token = uuidv4();
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildURLEmail(data.doctorId, token),
                });

                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: "R3",
                        gender: data.SelectedGender,
                        address: data.address,
                        firstName: data.fullName,
                    },
                });

                //create a booking record

                console.log("check user:", user[0]);

                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: "S1",
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token,
                        },
                    });
                }
                resolve({
                    errCode: 0,
                    errMessage: "Save info patient succeed!",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!",
                });
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: "S1",
                    },
                    raw: false,
                });
                if (appointment) {
                    appointment.statusId = "S2";
                    await appointment.save();
                    resolve({
                        errCode: 0,
                        errMessage: "Update the appointment succeed!",
                    });
                } else {
                    resolve({
                        errCode: 2,
                        errMessage:
                            "Appointment has been activated or does not exit",
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    postBookAppointment,
    postVerifyBookAppointment,
};
