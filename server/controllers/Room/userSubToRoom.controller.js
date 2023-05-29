const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");
const Member = require("../../models/Member.model.js");

const userSubToRoom = async (req, res) => {
  try {
    const { roomId, memberId } = req.query;
    // const member = ({ name, sdt, avatar, email, cccd, note } = req.body);
    const now = new Date(Date.now());
    const formattedDate = now.toDateString();
    const result = await Room.findById(roomId);
    const member = await Member.findById({ _id: memberId });
    if (result && member) {
      const room = await Room.findOneAndUpdate(
        { _id: roomId },
        {
          userSub: memberId,
          checkIn: formattedDate,
        }
      );

      return res.json(
        jsonGenerate(StatusCode.OK, "Tải Thành Viên Thành Công", room)
      );
    } else {
      return res.json(
        jsonGenerate(
          StatusCode.BADREQUEST,
          "Thêm Thành Viên Không Thành Công",
          {
            roomId,
            memberId,
            result,
            member,
          }
        )
      );
    }
  } catch (error) {}
};

module.exports = userSubToRoom;
