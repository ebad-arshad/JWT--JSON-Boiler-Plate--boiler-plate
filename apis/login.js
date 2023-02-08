import data from '../models/data.js';
import jwt from 'jsonwebtoken';
import {
    varifyHash,
} from 'bcrypt-inzi';

const login = async (req, res) => {

    const body = req.body;
    const SECRET_KEY = "";

    if (!body.email || !body.password) {
        res.status(400).send({ message: 'data is missing' });
        return;
    }

    try {
        const user = await data.findOne({ email: body.email });
        if (!user) { // user not already exist
            res.status(400).send({ message: "Email/Password incorrect" });
            return;
        } else { // user already exist
            // bcrypt hash
            const isMatched = await varifyHash(body.password, user.password);
            if (isMatched) {
                var token = jwt.sign({
                    id: isMatched._id,
                    name: isMatched.name,
                    email: isMatched.email,
                }, SECRET_KEY);
                res.status(200)
                    .send({
                        message: "login successful",
                        token
                    });
                return;
            } else {
                res.status(401).send({ message: "Incorrect email or password" });
                return;
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "server error"})
    }
}
export default login;