"use strict";

// モジュール
const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express");
const socketIO = require("socket.io");
// オブジェクト
const app = express();
const server = http.Server(app);
const io = socketIO(server);

// 定数
const PORT = process.env.PORT || 8000;
const mime = {
  ".html": "text/html",
  ".css": "text/css",
  // 読み取りたいMIMEタイプはここに追記
};

// 接続時の処理
io.on("connection", (socket) => {
  console.log("connection");

  // 切断時の処理
  socket.on("disconnect", () => {
    console.log("disconnected!");
  });

  //メッセージ着弾時の処理
  socket.on("upload pic", (data) => {
    console.log("data received from " + data.name);
    // 送信元含む全員に送信
    io.emit("spread pic", data);
  });
});

//公開フォルダの指定
app.use(express.static(__dirname + "/public"));
// サーバーの起動
server.listen(PORT, () => {
  console.log("server starts on port: %d", PORT);
});
