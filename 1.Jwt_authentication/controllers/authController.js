const jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

const userModel = require("../models/userModel");

//user registration
exports.signup = async (req, res) => {
    const user = new userModel({
        fullName: req.body.fullName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    try {
        let oldUser = await userModel.findOne({ email: req.body.email });

        if (oldUser) {
            res.status(400).json({ message: "email already registered" });
        } else {
            await user.save();

            res.status(200).json({ message: "user registration successful" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// signin function
exports.signin = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json({ message: "user not found" });
        } else {
            const checkPassword = await bcrypt.compare(req.body.password, user.password);
            if (checkPassword) {
                //create token
                const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY, { expiresIn: "24h" });

                let oldTokens = user.tokens || [];
                if (oldTokens.length) {
                    oldTokens = oldTokens.filter((t) => {
                        //exact time difference in seconds
                        const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
                        if (timeDiff < 86400) {
                            return t;
                        }
                    });
                }
                await userModel.findByIdAndUpdate(user._id, {
                    tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
                });
                res.status(200).json({ user, token });
            } else {
                res.status(404).json({ message: "wrong password" });
            }
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

//logout user
exports.logout = async (req, res) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "authorization failed" });
        }
        const tokens = req.user.tokens;
        const newTokens = tokens.filter((t) => t.token !== token);
        await userModel.findByIdAndUpdate(req.user._id, { tokens: newTokens });
        res.status(200).json({ message: "signed out successfully" });
    }
};
