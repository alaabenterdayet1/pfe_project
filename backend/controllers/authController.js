import { UserModel } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// POST: http://localhost:8080/api/register
export async function register(req, res) {
    try {
        const { username, password, repassword, profile, email, phone, lastname, firstname } = req.body;

        // Vérifier si les champs requis sont fournis
        if (!phone || !lastname || !firstname) {
            return res.status(400).send({ error: "Phone, Lastname, and Firstname are required" });
        }

        // Vérifier si les mots de passe correspondent
        if (password !== repassword) {
            return res.status(400).send({ error: "Passwords do not match" });
        }

        // Vérifier l'existence de l'utilisateur
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ error: "Please use a unique username" });
        }

        // Vérifier l'existence de l'e-mail
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).send({ error: "Please use a unique email" });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = new UserModel({
            username,
            password: hashedPassword,
            profile: profile || '',
            email,
            phone,
            lastname,
            firstname
        });

        // Sauvegarder l'utilisateur dans la base de données
        await newUser.save();

        res.status(201).send({ msg: "User registered successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

/** POST: http://localhost:8080/api/login
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
 */
export async function login(req, res) {
    const { username, password } = req.body;

    try {

        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {

                        if (!passwordCheck) return res.status(400).send({ error: "Don't have Password" });

                        // create jwt token
                        const token = jwt.sign({
                            userId: user._id,
                            username: user.username
                        }, ENV.JWT_SECRET, { expiresIn: "24h" });

                        return res.status(200).send({
                            msg: "Login Successful...!",
                            username: user.username,
                            token
                        });

                    })
                    .catch(error => {
                        return res.status(400).send({ error: "Password does not Match" })
                    })
            })
            .catch(error => {
                return res.status(404).send({ error: "Username not Found" });
            })

    } catch (error) {
        throw error;
    }
}

// Applying errorHandlerMiddleware

