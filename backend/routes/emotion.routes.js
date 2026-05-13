const express = require("express");

const router = express.Router();

const {
  analizarEmocion
} = require("../controllers/emotion.controller");

router.post(
  "/",
  analizarEmocion
);

module.exports = router;