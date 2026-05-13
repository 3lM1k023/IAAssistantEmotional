const express = require("express");

const router = express.Router();

const {
  testAuth
} = require("../controllers/auth.controller");

router.get("/", testAuth);

module.exports = router;