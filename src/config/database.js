require('dotenv').config();

const dns = require('dns');
const mongoose = require('mongoose');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const DB_NAME = process.env.DB_NAME  ;

const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.zgtjskr.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

async function connectDB() {
  await mongoose.connect(DB_URI);
  console.log('Sucesso ao conectar ao MongoDB!');
}

module.exports = connectDB;