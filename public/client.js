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
  const img = document.getElementById("postimage");
  img.src = data.data;
  const name = document.getElementById("postname");
  name.textContent = "投稿者：" + data.name;
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
  let name;
  if ($("#name").val()) {
    name = $("#name").val();
  } else {
    name = "名無し";
  }
  const cnvs = document.getElementById("canvas");
  const data = cnvs.toDataURL("image/jpeg");
  socket.emit("upload pic", {
    name: name,
    data: data,
  });
});
