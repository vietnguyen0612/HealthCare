require("dotenv").config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Viet nugyen👻" <vietnguyen061202@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend), // html body
    });
};

let getBodyHTMLEmail = (dataSend) => {
    let result = "";
    let language = dataSend.language;
    if (language === "vi") {
        result = `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online</p>
        <p>Thông tin đặt lịch khám bệnh</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ khám: ${dataSend.doctorName}</b></div>


        <p>Nếu các thông tin trên là đúng sự thật vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>
        <div>
        <a href=${dataSend.redirectLink}>Click here</a>
        </div>
        <div>Xin cảm ơn!</div>
        `;
    }
    if (language === "en") {
        result = `
        <h3>Dear! ${dataSend.patientName}</h3>
        <p>You received this email because you booked a medical appointment online</p>
        <p>Information to book a medical appointment</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>


        <p>If the above information is true, please click on the link below to confirm and complete the procedure to book an appointment.</p>
        <div>
        <a href=${dataSend.redirectLink}>Click here</a>
        </div>
        <div>Thank you!</div>
        `;
    }
    return result;
};

let sendAttachment = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Viet nugyen👻" <vietnguyen061202@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmailRemedy(dataSend), // html body
        attachments: [
            {
                filename: `remedy-${
                    dataSend.patientId
                }-${new Date().getTime()}.png`,
                // content: dataSend.imgBase64.split("base64,")[1],
                encoding: "base64",
            },
        ],
    });
};

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = "";
    let language = dataSend.language;
    if (language === "vi") {
        result = `
        <h3>Xin chào ${dataSend.patientName} </h3>
        <p>Bạn đặt lịch thành công</p>
        <p>Thông tin được gửi trong file đính kèm</p>
       
       
        <div>Xin cảm ơn!</div>
        `;
    }
    if (language === "en") {
        result = `
        <h3>Dear! ${dataSend.patientName} </h3>
        <p>You received this email because you booked a medical appointment online</p>
        <p>Information to book a medical appointment</p>
        <div>Thank you!</div>
        `;
    }
    return result;
};
module.exports = {
    sendSimpleEmail,
    sendAttachment,
};
