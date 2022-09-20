"use strict";

// クライアントからサーバーへの接続要求
const socket = io.connect();

// 接続時の処理
socket.on("connect", () => {
  console.log("connect");
});
//画像着弾時の処理
socket.on("spread pic", (data) => {
  // 画像を表示
  const img = document.createElement("img");
  img.src = data;
  document.body.appendChild(img);
});

//inputformからデータを受け取ってsocketで送信(jquery)
$("#inputform").submit(() => {
  console.log("submit");
  const name = $("#name").val();
  const message = $("#message").val();
  socket.emit("chat", name + "," + message);

  return false;
});

//socketで送信
$("#submit_pic").click(function () {
  console.log("submit pic");
  const cnvs = document.getElementById("canvas");
  const data = cnvs.toDataURL("image/jpeg"); //.replace(/^.*,/, "");
  socket.emit("upload pic", data);
});
