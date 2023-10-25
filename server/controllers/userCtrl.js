const generateToken = require("../config/jsonToken")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const randomstring = require("randomstring")
const nodemailer = require("nodemailer")

const sendResetPasswordMail = async (name, email, token) => {
    try {

        /*
        Note - 
        the bottom code will probably stop working with Gmail. The solution is to enable 2-Step Verification and generate Application password, then you can use the generated password to send emails using nodemailer.To do so you need to do the following:

        Go to your Google account at https://myaccount.google.com/
        Go to Security
        In "Signing in to Google" section choose 2-Step Verification - here you have to verify yourself, in my case it was with phone number and a confirmation code send as text message. After that you will be able to enabled 2-Step Verification
        Back to Security in "Signing in to Google" section choose App passwords
        From the Select app drop down choose Other (Custom name) and put a name e.g. nodemailer
        A modal dialog will appear with the password. Get that password and use it in your code.

*/
        const transporter = nodemailer.createTransport({
            port: 465,               // true for 465, false for other ports (587)
            host: "smtp.gmail.com",
            auth: {
                user: 'yogeshbjadhav10@gmail.com',
                pass: 'pfnlnmqhxmlxbgcq',
            },
            secure: true,
        });

        //http://127.0.0.1:3000
        const mailOptions = {
            from: 'yogeshbjadhav10@gmail.com',  // sender address
            to: 'yogeshbjadhav10@gmail.com',   // list of receivers
            subject: 'Sending Email using Node.js',
            text: 'That was easy!',
            html: `<b>Hey there! ${name} </b><br/><a href="http://localhost:3000/reset-password/${token}">click to link for reset password<a>`,
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                console.log(err)
            else
                console.log(info);
        });


    } catch (err) {

    }
}

const createUser = async (req, res) => {

    const { username, email, mobile, password, repassword, gender, profession, term } = req.body

    // console.log(req.body)

    //    const image = req.file.filename;

    // console.log(req.file.filename)

    if (!username || !email || !mobile || !password || !repassword || !gender || !profession || !term) {

        return res.status(422).send({ sucess: false, msg: "Please Fill All Fileds Properly" })
    }

    if (password !== repassword) {
        return res.status(422).send({ sucess: false, msg: "Both Password Not Matched" })
    }

    try {
        const findUser = await User.findOne({ email });

        if (!findUser) {

            const obj = {
                username: req.body.username,
                email: req.body.email,
                mobile: req.body.mobile,
                password: req.body.password,
                repassword: req.body.repassword,
                gender: req.body.gender,
                image: req.file.filename,
                profession: req.body.profession,
                term: req.body.term
            }

            const newUser = await User.create(obj)

            res.status(200).send({ sucess: true, msg: "Registration Complited!!!", data: newUser })
        } else {
            res.status(422).send({ sucess: false, msg: "User Already Exits" })
        }
    } catch (err) {
        return res.status(422).send({ sucess: false, msg: `error - ${err}` })
    }
}

const loginUser = async (req, res) => {

    const { email, password } = req.body;

    console.log(email, password);

    if (!email || !password) {
        return res.status(422).send({ sucess: false, msg: "Please Fill All Fileds Properly" })
    }

    try {
        const findUser = await User.findOne({ email })
        let token;
        if (findUser && (await findUser.isPasswordMatched(password))) {
            token = generateToken(findUser._id);

            res.cookie("jwtToken", token, { httpOnly: false, maxAge: (60 * 60 * 24 * 30) * 1000, })

            let obj = {
                _id: findUser._id,
                username: findUser.username,
                email: findUser.email,
                mobile: findUser.mobile,
                token: token,

            }
            res.status(200).send({ sucess: true, msg: "Login Sucess", data: obj })
        }
        else {
            res.status(422).send({ sucess: false, msg: "Invalid Creditional" });
        }

    } catch (err) {
        console.log(err)
    }
}

const getAllUsers = async (req, res) => {
    if (req.user) {
        try {
            const users = await User.find();
            res.send(users)
        } catch (err) {
            console.log(err);
        }

    } else {
        console.log("there is no user or token is not matched. pls login again");
    }
}

const getUser = async (req, res) => {
    if (req.user) {
        //console.log(req.user)
        const { _id } = req.user;
        try {
            const user = await User.findById(_id);
            res.send(user);
        } catch (err) {
            console.log(err);
        }
    } else {
        console.log("there is no user or token is not matched. pls login again");
    }
}

const deleteUser = async (req, res) => {
    if (req.user) {
        const { _id } = req.user;
        try {
            const deleteUser = await User.findByIdAndDelete(_id);
            res.send(deleteUser);
        } catch (err) {
            console.log(err);
        }

    } else {
        console.log("there is no user or token is not matched. pls login again");
    }
}

const updateUser = async (req, res) => {
    // console.log(req.body)
    // console.log(req.file)
    // res.send(req.user)

    // res.send(req.file)

    const { username, email, mobile, gender, profession } = req.body;

    if (!username || !email || !mobile || !gender || !profession) {
        return res.status(422).send({ sucess: false, msg: "Please Fill All Fileds Properly" })
    } else if (!req.file) {
        return res.status(422).send({ sucess: false, msg: "Please Select Image" })
    }
    else {
        if (req.user) {
            const { _id } = req.user;

            //console.log(req.body);

        
            try {
                const newUser = await User.findByIdAndUpdate(_id, {
                    username: req.body.username,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    gender: req.body.gender,
                    image: req.file.filename,
                    profession: req.body.profession,
                }, {
                    new: true
                });
                res.status(200).send({ sucess: true, msg: "Sucessfully Updated!!!", data: newUser });
            } catch (err) {
                console.log(err);
                res.status(422).send({ sucess: false, msg: "Not Updated!!!" + err });
            }
        } else {
            res.status(422).send({ sucess: false, msg: "there is no user or token is not matched. pls login again" })
        }
    }
    //    console.log(req.user);

}

const updatePassword = async (req, res) => {

    const { old_password, new_password } = req.body;

    if (!old_password || !new_password) {
        return res.status(422).send({ sucess: false, msg: "Please Fill All Fileds Properly" })
    }

    if (req.user) {

        const { _id } = req.user;

        try {
            const user = await User.findById(_id);

            const passMatch = await bcrypt.compare(old_password, user.password);

            if (passMatch) {
                const salt = bcrypt.genSaltSync(10)

                const updatePass = await User.findByIdAndUpdate({ _id }, {
                    password: bcrypt.hashSync(new_password, salt),
                    repassword: bcrypt.hashSync(new_password, salt)
                }, { new: true })
                res.status(200).send({ sucess: true, msg: "Password Changed!!", data: updatePass });
            } else {
                res.status(200).send({ sucess: false, msg: "password not matched" });
            }

        } catch (err) {
            res.status(400).send({ sucess: false, msg: err.message })
        }

    } else {
        res.status(400).send({ sucess: false, msg: "there is no user or token is not matched. pls login again" })
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(422).send({ sucess: false, msg: "Please Fill All Fileds Properly" })
    }

    try {

        const user = await User.findOne({ email });
        if (user) {
            const randstring = randomstring.generate();
            const data = await User.updateOne({ email: email }, {
                link: randstring
            }, {
                new: true
            })
            sendResetPasswordMail(user.username, user.email, randstring);

            res.status(200).send({ sucess: true, msg: "Please Check Your Email to Reset Password" })
        } else {
            res.status(200).send({ sucess: false, msg: "This Email Does Not Exits" })
        }

    } catch (err) {
        res.status(400).send({ sucess: false, msg: err.message })
    }
}

const resetPassword = async (req, res) => {

    const { token, password } = req.body;

    if (!token || !password) {
        return res.status(422).send({ sucess: false, msg: "Please Fill All Fileds Properly" })
    }

    try {
        const data = await User.findOne({ link: token });

        //console.log(data)

        if (data) {

            const salt = bcrypt.genSaltSync(10)
            const np = await bcrypt.hashSync(password, salt)
            const user_data = await User.findByIdAndUpdate({ _id: data._id }, {
                password: np,
                repassword: np,
                link: ''
            }, {
                new: true
            })

            res.status(200).send({ sucess: true, msg: "password has been reset", data: user_data })

        } else {
            res.status(200).send({ sucess: false, msg: "Reset Password Link Not Found or Expired" })
        }

    } catch (err) {
        res.status(400).send({ sucess: false, msg: err.message })
    }
}


module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getAllUsers = getAllUsers;
module.exports.getUser = getUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
module.exports.updatePassword = updatePassword;
module.exports.forgotPassword = forgotPassword;
module.exports.resetPassword = resetPassword;