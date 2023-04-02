const nodemailer = require('nodemailer')



const sendEmail = (recipient, subject, text)=>{
    console.log(recipient, subject, text)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'univerprojectbymark@gmail.com',
            pass: 'ptvbvffkmxhniupp'
        }
    })
    const mailOptions = {
        from: 'univerprojectbymark@gmail.com',
        to: recipient,
        subject: subject,
        text: text
    }
    
    return transporter.sendMail(mailOptions)
}

module.exports = {sendEmail}

// sendEmail('mark.corray.off@gmail.com', 'jefiiejfo', 'ijfojreofj').then(response => console.log('Сообщение отправлено')).catch(console.log('Ошибка, не получилось отправить сообщение!'))
