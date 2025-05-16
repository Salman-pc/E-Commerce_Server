const users = require('../Modal/userModel')
const jwt = require("jsonwebtoken")

exports.userSignupController = async (req, res) => {
    console.log("Inside the user signup controller");

    const { username, email, password } = req.body

    try {

        const exsistingUser = await users.findOne({ email })

        if (exsistingUser) {
            return res.status(400).json("User already exists");
        }

        if (!email || !username || !password) {
            return res.status(409).json("All fields are required ")
        }

        const newUser = new users({ username, email, password })
        await newUser.save()

        const token = jwt.sign({ userid: newUser._id }, process.env.jwt_pass);
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            },
            token
        });


    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.userLoginController = async (req, res) => {
    console.log("Inside the Login controller");

    const { email, password } = req.body

    try {

        const exsistingUser = await users.findOne({ email })


        if (!email || !password) {
            return res.status(409).json("All fields are required ")
        }

        if (email && password) {
            if (exsistingUser) {
                if (exsistingUser.password === password) {
                    const token = jwt.sign({ userid: exsistingUser._id }, process.env.jwt_pass);
                    return res.status(201).json({
                        message: "User login successfully",
                        user: {
                            id: exsistingUser._id,
                            username: exsistingUser.username,
                            email: exsistingUser.email
                        },
                        token
                    });
                    
                }
                else {
                    return res.status(400).json("invalid email or password");
                }

            }
            else {
                return res.status(400).json("invalid email or password");
            }
        }

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
