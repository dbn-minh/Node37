import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const DemoSocket = () => {
  // Đối tượng socket client
  let socket = io("http://localhost:8181");

  socket.on("fe-connect", (data) => {
    // setData(data + "connected");
    //   document.querySelector("#noiDung").innerHTML += data + "connected <br/>";
  });

  socket.on("fe-number", (data) => {
    document.querySelector("#noiDung").innerHTML = data;
  });

  return (
    <div className="text-white">
      <h1 id="noiDung">0</h1>
      <button
        className="btn btn-success"
        onClick={() => {
          socket.emit("number-be", "");
        }}
      >
        CLick
      </button>
    </div>
  );
};

export default DemoSocket;
