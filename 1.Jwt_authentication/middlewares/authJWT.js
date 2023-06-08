const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

dotenv.config();
const secret = process.env.JWT_KEY;

const authMiddleware = async (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        try {
            const token = req.headers.authorization;

            if (token) {
                const decoded = jwt.verify(token, secret);

                const id = new mongoose.Types.ObjectId(decoded.id);
                const user = await userModel.findById({ _id: id });

                if (!user) {
                    return res.status(401).json("user does not exist");
                }
                req.user = user;
                next();
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(401).json({ message: "unauthorized access!" });
    }
};

module.exports = authMiddleware;
