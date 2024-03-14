import { UserModel } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import axios from 'axios'; // Import axios for making HTTP requests
import otpGenerator from 'otp-generator';
dotenv.config();
// Validate email using Abstract API
async function validateEmail(email) {
    try {
        const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=47a1e90e307f4685b046de97373e5fc3&email=${encodeURIComponent(email)}`);
        return response.data;
    } catch (error) {
        throw new Error("Email validation failed");
    }
    

}
//register
export async function register(req, res) {
    try {
        const { username, password, repassword, profile, email } = req.body;


        if (password !== repassword) {
            return res.status(400).send({ error: "Passwords do not match" });
        }

        // Vérification de la longueur minimale du mot de passe
        if (password.length < 8) {
            return res.status(400).send({ error: "Password must be at least 8 characters long" });
        }

        // Vérification de la complexité du mot de passe (mélange de lettres et de chiffres)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).send({ error: "Password must contain at least one letter and one number" });
        }

        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ error: "Username already exists" });
        }

        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).send({ error: "Email already exists" });
        }
        // Validate email using Abstract API
        const emailValidationResult = await validateEmail(email);
        if (emailValidationResult.deliverability !== 'DELIVERABLE') {
            return res.status(400).send({ error: "Invalid email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            username,
            password: hashedPassword,
            profile: profile || '',
            email
            
        });

        await newUser.save();

        res.status(201).send({ msg: "User registered successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
//login
export async function login(req, res) {
    const { email, username, password } = req.body;

    try {
        const user = await UserModel.findOne({ $or: [{ email }, { username }] });

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        const passwordCheck = await bcrypt.compare(password, user.password);

        if (!passwordCheck) {
            return res.status(400).send({ error: "Password does not match" });
        }

        // create jwt token
        const token = jwt.sign({
            userId: user._id,
            username: user.username
        }, process.env.JWT_SECRET, { expiresIn: "24h" });

        return res.status(200).send({
            msg: "Login Successful!",
            username: user.username,
            token
        });

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
//verify user or email
export async function verifyUser(req, res) {
    const { email, username } = req.body;

    try {
        const user = await UserModel.findOne({ $or: [{ email }, { username }] });

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        return res.status(200).send({ msg: "User found" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}



/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req,res){
    
    const { username } = req.params;

    try {
        
        if(!username) return res.status(501).send({ error: "Invalid Username"});

        UserModel.findOne({ username }, function(err, user){
            if(err) return res.status(500).send({ err });
            if(!user) return res.status(501).send({ error : "Couldn't Find the User"});

            /** remove password from user */
            // mongoose return unnecessary data with object so convert it into json
            const { password, ...rest } = Object.assign({}, user.toJSON());

            return res.status(201).send(rest);
        })

    } catch (error) {
        return res.status(404).send({ error : "Cannot Find User Data"});
    }

}


/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req,res){
    try {
        
        // const id = req.query.id;
        const { userId } = req.user;

        if(userId){
            const body = req.body;

            // update the data
            UserModel.updateOne({ _id : userId }, body, function(err, data){
                if(err) throw err;

                return res.status(201).send({ msg : "Record Updated...!"});
            })

        }else{
            return res.status(401).send({ error : "User Not Found...!"});
        }

    } catch (error) {
        return res.status(401).send({ error });
    }
}
//code otp generator
export async function generateOTP(req,res){
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({ code: req.app.locals.OTP })
}
//verify otp
export async function verifyOTP(req,res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!'})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}
// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/auth/createResetSession */
export async function createResetSession(req,res){
    if(req.app.locals.resetSession){
         return res.status(201).send({ flag : req.app.locals.resetSession})
    }
    return res.status(440).send({error : "Session expired!"})
 }
//reset password
export async function resetPassword(req, res) {
    try {
        if (!req.app.locals.resetSession) {
            return res.status(440).send({ error: "Session expired!" });
        }

        const { username, password, repassword } = req.body;

        // Vérification si le champ password est vide
        if (!password) {
            return res.status(400).send({ error: "Password is required" });
        }

        // Vérification si le champ repassword est vide
        if (!repassword) {
            return res.status(400).send({ error: "Re-enter Password is required" });
        }

        // Vérification de la complexité du mot de passe (mélange de lettres et de chiffres)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).send({ error: "Password must contain at least one letter and one number and be at least 8 characters long" });
        }

        // Vérification si les deux mots de passe correspondent
        if (password !== repassword) {
            return res.status(400).send({ error: "Passwords do not match" });
        }

        try {
            const user = await UserModel.findOne({ username });

            if (!user) {
                return res.status(404).send({ error: "Username not found" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await UserModel.updateOne({ username: user.username }, { password: hashedPassword });

            req.app.locals.resetSession = false; // Réinitialiser la session
            return res.status(201).send({ msg: "Password reset successfully!" });
        } catch (error) {
            return res.status(500).send({ error: "Unable to reset password" });
        }
    } catch (error) {
        return res.status(401).send({ error });
    }
}

/*const exampleEmail = 'johnb.doe@example.com';

validateEmail(exampleEmail)
   .then(result => {
        console.log("Email validation result:", result);
 })
   .catch(error => {
        console.error("Error validating email:", error.message);
})*/