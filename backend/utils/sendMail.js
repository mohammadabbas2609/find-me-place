import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const sendMail = async options => {
  const msg = {
    to: options.to,
    from: "mohammadabbas2609@gmail.com",
    subject: options.subject,
    text: options.message,
  };

  const mailSent = await sgMail.send(msg);

  console.log(mailSent);
};

export default sendMail;
