import User from '../models/user.js';
import bcrypt from 'bcrypt';
import errorFunc from '../utils/errors.js';

const singupController = async (req, res) => {

    const { username, email, password } = req.body;

    try {

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // CREATE A NEW USER
        const user = await User.create({username, email, password: hashedPassword});

        // SEND RESPONSE
        res.status(201).json({
            message: "User created successfully",
            data: user
        });

        console.log(user)


    }

    catch (error) {
        const message = error.message;
        const status = 500;
        errorFunc(res, message, status)
    }

};

export default singupController;