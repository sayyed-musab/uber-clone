import userModel from "../models/user.model.js";

export const createUser = async ({ firstName, lastName, email, password }) => {
  if (!firstName || !email || !password) {
    throw new Error("Missing required fields");
  }
  const user = new userModel({
    fullName: { firstName, lastName },
    email,
    password,
  });

  await user.save();

  return user;
};
