import nodemailer from "nodemailer";
import bcryptjs from "bcrypt";
import User from "@/models/user.model";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordExpiry: Date.now() + 3600000,
      });
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "a4e6d6bb9b71d0",
        pass: "61fc1f9f73b2ff",
      },
    });

    const mailOption = {
      from: "ahmadbati734@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/${emailType}?token=${hashedToken}">here </a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      } or copy and paste in youur browser. ${
        process.env.DOMAIN
      }/${emailType}?token=${hashedToken}</p>`,
    };

    const mailResponse = await transporter.sendMail(mailOption);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
