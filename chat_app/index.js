const socket = io("ws://localhost:8080");

document.querySelector("#btn-name").onclick = () => {
  let uName = document.querySelector("#txt-name").value;
  localStorage.setItem("user", uName);

  $("#myModal").modal("hide");
};

document.querySelector("#btn-send").onclick = () => {
  let txtSend = document.querySelector("#txt-send").value;
  let uName = localStorage.getItem("user");
  let roomId = localStorage.getItem("roomId");
  socket.emit("fe-send-mess", { uName, txtSend, roomId });
};

socket.on("be-send-mess", (data) => {
  let noiDung = "";
  let uName = localStorage.getItem("user");
  if (uName == data.uName) {
    noiDung = `
      <li class="clearfix">
        <div class="message-data text-right">
            <span class="message-data-time">${data.uName}</span>
            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">
        </div>
        <div class="message other-message float-right">${data.txtSend}</div>
      </li>
      `;
  } else {
    noiDung = `
      <li class="clearfix">
          <div class="message-data">
              <span class="message-data-time">${data.uName}</span>
          </div>
          <div class="message my-message">${data.txtSend}</div>
      </li>
      `;
  }

  document.querySelector("#noiDung").innerHTML += noiDung;
});

// txt-send
// btn-send

//noiDung

document.querySelector("#room-1").onclick = () => {
  alert("enter room 1");
  localStorage.setItem("roomId", "room-1");
  socket.emit("fe-join-room", "room-1");
};

document.querySelector("#room-2").onclick = () => {
  alert("enter room 2");
  localStorage.setItem("roomId", "room-2");
  socket.emit("fe-join-room", "room-2");
};

document.querySelector("#room-3").onclick = () => {
  alert("enter room 3");
  localStorage.setItem("roomId", "room-2");
  socket.emit("fe-join-room", "room-3");
};
