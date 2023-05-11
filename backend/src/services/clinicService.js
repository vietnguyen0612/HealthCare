const db = require("../models");

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.name ||
                !data.address ||
                !data.imageBase64 ||
                !data.descriptionHTML ||
                !data.descriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!",
                });
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                });
                resolve({
                    errCode: 0,
                    errMessage: "ok",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();
            if (data && data.length > 0) {
                data.map((item) => {
                    item.image = new Buffer(item.image, "base64").toString(
                        "binary"
                    );
                    return item;
                });
            }
            resolve({
                errMessage: "oke",
                errCode: 0,
                data,
            });
        } catch (error) {
            reject(error);
        }
    });
};
let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!",
                });
            } else {
                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId,
                    },
                    attributes: [
                        "descriptionHTML",
                        "descriptionMarkdown",
                        "name",
                        "address",
                    ],
                });

                if (data) {
                    let doctorClinic = [];
                    doctorClinic = await db.Doctor_Info.findAll({
                        where: { clinicId: inputId },
                        attributes: ["doctorId", "provinceId"],
                    });

                    data.doctorClinic = doctorClinic;
                } else {
                    data = {};
                }
                resolve({
                    errMessage: "oke",
                    errCode: 0,
                    data,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    createClinic,
    getAllClinic,
    getDetailClinicById,
};
