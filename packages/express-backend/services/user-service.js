import mongoose from "mongoose";
import userModel from "../models/users.js";

mongoose.set("debug", true);

// mongoose
//   .connect("mongodb://localhost:27017/users", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .catch((error) => console.log(error));

// function to get users with name and job filters
function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  } else{
    promise = findByNameAndJob(name, job);
  }
  return promise;
}

function findByNameAndJob(name, job) {
    return userModel.find({name: name, job: job});
  }

function findUserById(id) {
  return userModel.findById(id);
}
// delete users by ID
function findOneAndDelete(id) {
  return userModel.findByIdAndDelete({_id: id});
}
  
// adds new user to DB
function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  findOneAndDelete,
  findByNameAndJob,
};