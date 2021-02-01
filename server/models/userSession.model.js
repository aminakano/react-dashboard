const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSessionSchema = new Schema(
  {
    userId: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const UserSession = mongoose.model("UserSession", userSessionSchema);

module.exports = UserSession;
