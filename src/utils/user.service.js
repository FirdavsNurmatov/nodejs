import { User } from "../model/index.js";

export async function createUser(userData) {
  try {
    const newUser = new User(userData);
    await newUser.save();

    return "User created!";
  } catch (error) {
    console.log("User already exists!");
  }
}

export async function updateUserById(userId, userData) {
  try {
    const oneUserData = await User.updateOne(
      { user_id: userId },
      { $set: userData }
    );
    return "User updated!";
  } catch (error) {
    console.log(error.message);
  }
}
