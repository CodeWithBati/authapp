import { connect } from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
  const userID = await getDataToken(request);
  const user = await User.findOne({ _id: userID }).select("-password");

  if (!user) {
    return NextResponse.json({
      error: "User not found",
      status: 400,
    });
  }

  return NextResponse.json({
    message: " User Found",
    data: user,
  });
}
