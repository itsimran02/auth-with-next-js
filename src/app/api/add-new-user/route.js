import { User } from "@/models";

const { default: connectDB } = require("@/database");
const bcrypt = require("bcryptjs/dist/bcrypt");
const Joi = require("joi");

const { NextResponse } = require("next/server");

const joiValidation = Joi.object({
  userName: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
});

export async function POST(req) {
  try {
    await connectDB();
    const reqData = await req.json();
    const { email, userName, password } = reqData;
    const { error } = joiValidation.validate({
      email,
      userName,
      password,
    });
    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User with this email already exists.",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    const saveUser = await newUser.save();
    const { password: pass, ...userWithoutPasseword } =
      saveUser._doc;

    console.log(userWithoutPasseword);
    return NextResponse.json({
      success: true,
      message: "user created successfully",
      data: userWithoutPasseword,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
