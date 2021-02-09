const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSessionSchema = new Schema(
  {
    userId: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    userData: { type: Object, default: {} },
  },
  {
    timestamps: true,
  }
);

const UserSession = mongoose.model("UserSession", userSessionSchema);

module.exports = UserSession;
