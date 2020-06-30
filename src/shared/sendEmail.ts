import * as nodemailer from 'nodemailer'

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (email: string, link: string) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host:  'smtp.gmail.com',
        port: 465,
        // secure: false, // true for 465, false for other ports
        secure: true,
        auth: {
            user: 'duong.dv160818@gmail.com', // generated ethereal user
            pass: 'duong08071998', // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    const mailOptions = {
        from: 'duong.dv160818@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Confirm email', // Subject line
        html: `Please click this mail to confirm your email : <a href =${link}>${link}</>`// plain text body
    };
    const info = await transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
    console.log("Message sent: %s" );
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}
