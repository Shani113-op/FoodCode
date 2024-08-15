const express = require('express')
const router = express.Router()
const user = require('../models/User')
const { body, validationResult } = require('express-validator');

const jwt=require("jsonwebtoken");
const bcrypt=require('bcryptjs')
const jwtSecret="Mynameisshanisharmaandiliveinindia";


router.post("/creatUser",
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt=await bcrypt.genSalt(10);
        let secPassword=await bcrypt.hash(req.body.password,salt);
        try {
            await user.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true })
        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }
    })

router.post("/loginuser",
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await user.findOne();
            if (!userData) {
                return res.status(400).json({ errors: "Try with valid credential" });
            }

            const pwdCompare=bcrypt.compare(req.body.password, userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try with11 valid credential" });
            }
            const data={
                user:{
                    id:userData.id
                }
            }
            const authToken=jwt.sign(data,jwtSecret)
            return res.json({ success: true,authToken:authToken })
        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }
    })

module.exports = router;