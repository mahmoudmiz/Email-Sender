const express = require("express");
const router = express.Router();
const User = require("../models/users");
const { getGasEthereumPrices } = require("../index");
const { transporter, send } = require("../mailer");
const emailTemp = require("../emailTemp/gasPriceTemp");

// signup new user
router.post("/", async (req, res, next) => {
  const { name, email, threshold } = req.body;
  if (isNaN(threshold))
    return res.status(400).json({ msj: "please enter a valid number!" });
  try {
    const createdUser = await User.create({
      name,
      email,
      threshold,
    });

    if (createdUser) {
      res.status(201).json({ msj: "You have been successfully registered" });
      const currentGasPrice = await getGasEthereumPrices();
      console.log("this if from the subscribe" + currentGasPrice);
      if (currentGasPrice < Number(createdUser.threshold)) {
        const msg = {
          to: `${createdUser.email}`,
          from: "mahmoudmiz1991@gmail.com",
          subject: "Gas prices just changed!!",
          html: emailTemp(createdUser, currentGasPrice),
        };

        const info = await send(msg, transporter);
        console.log(info);
      }
    }
  } catch (err) {
    if (err.errors[0].message != undefined)
      return res.status(400).json({ msj: err.errors[0].message });
    if (err) return res.status(500).json({ msj: "internal server error" });
  }
});

module.exports = router;
