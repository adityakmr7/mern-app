
const express = require("express");
const { body } = require("express-validator");
const authController  = require('../controllers/authController');
const User = require("../models/User");
const router = express.Router();



router.put('/signup', body("email").isEmail().withMessage('Email Error').custom((values, {req}) => {
    return User.findOne({email: values}).then((user) => {
        if(user) {
            return Promise.reject('Email already exists');
        }
    })
}).normalizeEmail(),
body("password").trim().isLength({min: 8}),
body("userName").trim().not().isEmpty()
,authController.signup);

router.post('/login', authController.login);


module.exports = router;



