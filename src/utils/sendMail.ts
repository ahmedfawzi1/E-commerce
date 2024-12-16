import nodemailer from 'nodemailer';

const sendMail = async (options: any): Promise<void> => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
    });

    // const image = `<img src="cid:image@nodemailer.com" alt="" width="300" height="300" style="display:block; margin=auto"; />`
    const emailOptions: any = {
        from: `"${process.env.APP_NAME}"< ${process.env.EMAIL_USERNAME} >`,
        to: options.mail,
        subject: options.subject,
        text: options.message,
        html: `<div style="background-color: #F6F5F5; padding:2%; margin:2%;><h1 dir="ltr">${options.subject}</h1> <h2 dir="ltr">${options.message}</h2>`

        // attachments: [{
        //     filename: "default.png",
        //     path:"./public/images/default.png"
        //     cid: "image@nodemailer.com"
        // }]
    };
    await transporter.sendMail(emailOptions);


}

export default sendMail;    