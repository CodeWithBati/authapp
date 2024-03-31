import { connect } from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcrypt";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { username, email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "Email already used" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // let newPassword = password.toString();
    // const salt = await bcryptjs.genSalt(5);

    // bcryptjs.hash(newPassword, salt, function(err, hash) {});
    // const hashPassword = await bcryptjs.hash(
    //   password,
    //   salt,
    //   function (err, hash) {}
    // );

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // Send Verification Email
    await sendEmail({ email, emailType: "RESET", userId: savedUser._id });

    console.log("email is send");
    return NextResponse.json({
      message: "User register successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.log("am here");
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
