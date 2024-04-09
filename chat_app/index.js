const socket = io("ws://localhost:8080");

document.querySelector("#btn-name").onclick = () => {
  let uName = document.querySelector("#txt-name").value;
  localStorage.setItem("user", uName);

  $("#myModal").modal("hide");
};
