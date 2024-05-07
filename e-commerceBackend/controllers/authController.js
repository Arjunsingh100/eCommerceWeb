const { hashedPassword, comparePassword } = require('../helpers/authHelper');
const userModel = require('../models/userModel.js');
const JWT = require('jsonwebtoken');
module.exports.registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        const existingUser = await userModel.findOne({ email: email })
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'You have already Register'
            })
        }
        const hashedPass = await hashedPassword(password);
        const user = await new userModel({ name, email, phone, address, answer, password: hashedPass }).save();
        res.status(201).send({
            success: true,
            message: 'User Register Succefully',
            user
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
}

module.exports.loginController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'You email not exits'
            })
        }
        const match = comparePassword(password, user.password);
        if (match === false) {
            return res.status(200).send({
                success: false,
                message: 'Password is wrong'
            })
        }
        const token = await JWT.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' });
        res.status(200).send({
            success: true,
            message: 'User login successfully',
            user: {
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone,
                roll: user.roll
            },
            token,
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        })
    }
}

module.exports.testController = (req, res) => {
    res.send('protected route');
}

module.exports.forgotPasswordRoute = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(404).send('Email is required')
        }
        if (!answer) {
            res.status(404).send('Answer is required')
        }
        if (!newPassword) {
            res.status(404).send('New Password is required')
        }
        const user = await userModel.findOne({ email, answer });
        const hashPass = await hashedPassword(newPassword);

        await userModel.findByIdAndUpdate(user._id, { password: hashPass });
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        })
    }
}

//update profile controller
module.exports.updateProfileController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        const user = await userModel.find({ _id: req.user._id });
        if (!password) {
            return res.status(500).send({
                success: false,
                message: 'Password Should Not be Empty'
            })
        }
        const hashPassword = password ? await hashedPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate( {_id:user[0]._id}, {
            name: name || user.name,
            email: email || user.email,
            password: hashPassword || user.password,
            address: address || user.address,
            phone: phone || user.phone
        }, { new: true })
        res.status(201).send({
            success: true,
            message: 'User Updated Successfully',
            updatedUser
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: true,
            message: 'Error While updating User'
        })
    }
}