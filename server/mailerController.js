require('dotenv').config()
const nodemailer = require('nodemailer')

const { EMAIL, PASSWORD } = process.env

const sendEmail = (req, res) => {
    // const {id} = req.params
    const { email, firstName, lastName } = req.body
    console.log(req.body)
    // const sighUpURL =''

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    })

    let emailText = `Hello ${firstName}, welcome to Bookface`

    let mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Welcome',
        text: emailText
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            res.status(409).send('Error Occured')
        } else {
            res.status(200).send('Message Sent')
        }
    })
}

module.exports = {
    sendEmail
}