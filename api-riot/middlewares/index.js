const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

function setupMiddlewares(app) {
  //* Analisa corpos de solicitação JSON.
  app.use(express.json());
  app.use(cors());

  //* Analisa corpos de solicitação codificados em URL.
  app.use(express.urlencoded({ extended: true }));
  //* Configuração do body-parser

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //* Configuração do dotenv
  require("dotenv").config();
}

module.exports = { setupMiddlewares };
