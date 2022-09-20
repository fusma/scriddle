"use strict";

// モジュール
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
// オブジェクト
const app = express();
const server = http.Server(app);
const io = socketIO(server);

// 定数
const PORT = process.env.PORT || 8000;

app.use(express.static(__dirname + "/public"));
// サーバーの起動
server.listen(PORT, () => {
  console.log("server starts on port: %d", PORT);
});
