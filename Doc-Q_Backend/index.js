import express from "express";
import { auth } from "./firebase-admin.js";
import session from 'express-session';
import { clientAuth } from "./firebase-client.js";
import bodyParser from 'body-parser';
import path from "path";
import { signInWithEmailAndPassword } from "@firebase/auth";
import nodemailer from "nodemailer";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'nyNG&^T*J@JE$#',
    resave: false,
    saveUninitialized: true
}));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/login.html"));
});

app.post("/api/login", async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(email, password);
    try {
        await signInWithEmailAndPassword(clientAuth, email, password)
            .then((userRecord) => {
                console.log(`Successfully fetched user data: ${userRecord.uid}`);
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                if (errorCode === 'auth/invalid-email' || errorCode === 'auth/missing-email') {
                    res.status(400).send('Invalid email address.');
                } else if (errorCode === 'auth/wrong-password') {
                    res.status(401).send('Invalid credentials');
                } else if (errorCode === 'auth/invalid-credential') {
                    res.status(401).send('Invalid credentials');
                } else if (errorCode === 'auth/user-not-found') {
                    res.status(401).send('User not found');
                } else {
                    res.status(500).send('An error occurred while logging in');
                }
            });
    }
    catch (e) {
        console.log(e);
    }
});

app.post("/api/signup", async (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    try {
        await auth.createUser({
            firstName: firstName,
            lastName: lastName,
            email: email,
            emailVerified: false,
        })
            .then((userRecord) => {
                console.log('Successfully created new user:', userRecord.uid);
                auth.updateUser(userRecord.uid, {
                    userUID: userRecord.uid,
                }).then(() => {
                    console.log('User data updated');
                }).catch((error) => {
                    console.log('Error updating user data:', error);
                });
            })
            .catch((error) => {
                console.log('Error creating new user:', error);
            });
    }
    catch (e) {
        console.log(e);
    }
});

function generateRandomCode() {
    return Math.floor(100000 + Math.random() * 900000);
}

app.post("/api/otplogin", (req, res) => {
    let senderEmail = req.body.email;
    console.log(senderEmail);

    const otp = generateRandomCode();
    console.log(otp);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shreyasks124@gmail.com',
            pass: 'awobdhivpkpazpbr'
        }
    });

    const mailOptions = {
        from: 'ksshreyas956@gmail.com',
        to: senderEmail,
        subject: 'Hello from DOC-Q',
        text: `This is an email for OTP verification\nYour OTP is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
            req.session.email = senderEmail;
            req.session.otp = otp;

            res.redirect('/api/otpverify');
        }
    });
});

app.get("/api/otpverify", (req, res) => {
    res.sendFile(path.join(__dirname, "/verify-otp.html"));
});

app.post("/api/verify-otp", (req, res) => {
    const email = req.session.email;
    const otp = req.session.otp;
    const enteredOtp = req.body.otp;
    console.log(otp, enteredOtp);
    if (Number(otp) === Number(enteredOtp)) {
        console.log("User verified");
        res.send("OTP verification successful");
    }
    else {
        res.send("Invaid OTP");
    }

})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
