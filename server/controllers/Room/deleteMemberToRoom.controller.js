const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const deleteMemberToRoom = async (req, res) => {
  try {
    const { roomId, name, sdt, avatar, email, cccd, note } = req.body;

    const room = await Room.findOneAndUpdate(
      { _id: roomId },
      {
        $pull: { member: { cccd } },
      }
    );
    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "Xoá Thành Viên Thành Công", room)
    );
  } catch (error) {}
};

module.exports = deleteMemberToRoom;
