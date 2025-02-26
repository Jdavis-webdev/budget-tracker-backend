const express = require("express");
const plaid = require("plaid");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();
const User = require("../models/User");

const plaidClient = new plaid.PlaidApi(
  new plaid.Configuration({
    basePath: plaid.PlaidEnvironments.sandbox, 
    clientId: process.env.PLAID_CLIENT_ID,
    secret: process.env.PLAID_SECRET,
  })
);

router.post("/create_link_token", async (req, res) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: req.body.userId },
      client_name: "Budget Tracker",
      products: ["transactions"],
      country_codes: ["US"],
      language: "en",
    });
    res.json({ link_token: response.data.link_token });
  } catch (error) {
    res.status(500).json({ error: error.response.data });
  }
});

router.post("/exchange_public_token", async (req, res) => {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: req.body.public_token,
    });

    const newAccount = {
      institution: req.body.institution,
      accountName: req.body.account_name,
      balance: req.body.balance,
    };

    await User.findByIdAndUpdate(req.body.userId, {
      $push: { linkedAccounts: newAccount },
    });

    res.json({ message: "Bank account linked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.response.data });
  }
});

module.exports = router;
