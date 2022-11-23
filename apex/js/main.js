// sidenav
document.getElementById("sidebar-toggle-btn").addEventListener("click",function(){
    document.getElementById("sidebar").classList.toggle("active");
});
// table js
var emptyRow = "<tr><td colspan='6' class='text-center'> No Records Available</td></tr>";
$(document).ready(function () {
  loadDataFromLocal();
  $('#tblData').on('click', '.btn-edit', function () {
    debugger;
    const name = $(this).parent().parent().find(".txtName").html();
    const time = $(this).parent().parent().find(".txtTime").html();
    const no_vechile = $(this).parent().parent().find(".txtvechiles").html();
    const id = $(this).parent().parent().find(".txtName").attr("data-id");
    $("#txtName").val(name);
    $("#txtTime").val(time);
    $("#txtvechiles").val(no_vechile);
    $("#txtId").val(id);
    $("#btnSave").text("Update");
  });

  $('#tblData').on('click', '.btn-delete', function () {
    debugger;
    const id = $(this).parent().parent().find(".txtName").attr("data-id");
    deleteDataFromLocal(id);
  });

  $("#btnSave").click(function () {
    debugger;
    if ($("#txtId").val() == '') {
      addDataToLocal();
    } else {
      updateDataFromLocal();
    }
  });

  $("#btnClear").click(function () {
    debugger;
    clearForm();
  });
});

function clearForm() {
  debugger;
  $("#txtName").val("");
  $("#txtTime").val("");
  $("#txtvechiles").val("");
  $("#btnSave").text("Add");
}

function addEmptyRow() {
  debugger;
  if ($("#tblData tbody").children().children().length == 0) {
    $("#tblData tbody").append(emptyRow);
  }
}

function loadDataFromLocal() {
  debugger;
  let localData = localStorage.getItem('localData');
  if (localData) {
    $("#tblData tbody").html("");
    let localArray = JSON.parse(localData);
    let index = 1;
    localArray.forEach(element => {
      let dynamicTR = "<tr>";
      dynamicTR = dynamicTR + "<td> " + index + "</td>";
      dynamicTR = dynamicTR + "<td class='txtName'  data-id=" + element.id + ">" + element.name + "</td>";
      dynamicTR = dynamicTR + "<td class='txtTime'>" + element.time + "</td>";
      dynamicTR = dynamicTR + "<td class='txtvechiles'>" + element.no_vechile + "</td>";
      dynamicTR = dynamicTR + "    <td class='tdAction text-center'>";
      dynamicTR = dynamicTR + "        <button class='btn btn-sm btn-dark btn-edit  fa fa-edit'> Edit</button>";
      dynamicTR = dynamicTR + "        <button class='btn btn-sm btn-dark btn-delete fa fa-trash'> </button>";
      dynamicTR = dynamicTR + "    </td>";
      dynamicTR = dynamicTR + " </tr>";
      $("#tblData tbody").append(dynamicTR);
      index++;
    });
  }
  addEmptyRow();
}

function addDataToLocal() {
  debugger;
  let localData = localStorage.getItem('localData');
  if (localData) {
    let localArray = JSON.parse(localData);
    const obj = {
      id: localArray.length + 1,
      name: $("#txtName").val(),
      time: $("#txtTime").val(),
      no_vechile: $("#txtvechiles").val(),
    };
    localArray.push(obj);
    localStorage.setItem('localData', JSON.stringify(localArray));
    loadDataFromLocal();
  } else {
    const arryObj = [];
    const obj = {
      id: 1,
      name: $("#txtName").val(),
      time: $("#txtTime").val(),
      no_vechile: $("#txtvechiles").val(),
    };
    arryObj.push(obj);
    localStorage.setItem('localData', JSON.stringify(arryObj));
    loadDataFromLocal();
  }
  clearForm();
}

function updateDataFromLocal() {
  debugger;
  let localData = localStorage.getItem('localData');
  let localArray = JSON.parse(localData);
  const oldRecord = localArray.find(m => m.id == $("#txtId").val());
  oldRecord.name = $("#txtName").val();
  oldRecord.time = $("#txtTime").val();
  oldRecord.no_vechile = $("#txtvechiles").val();
  localStorage.setItem('localData', JSON.stringify(localArray));
  loadDataFromLocal();
  clearForm();
}

function deleteDataFromLocal(id) {
  debugger;
  let localData = localStorage.getItem('localData');
  let localArray = JSON.parse(localData);
  let i = 0;
  while (i < localArray.length) {
    if (localArray[i].id === Number(id)) {
      localArray.splice(i, 1);
    } else {
      ++i;
    }
  }
  localStorage.setItem('localData', JSON.stringify(localArray));
  loadDataFromLocal();
}

// vechile move

function move(){
  var  x = document.getElementById("positiontop").value;
  var  y = document.getElementById("positionleft").value;
  console.log("x",x);
  console.log("y",y);
  var redElem = document.getElementById("red");
  redElem.style.top=x+"px";
  redElem.style.left=y+"px";
  var poe= 0;
  var anim = setInterval(animate,10);
var data_x =0;
var data_y =0;
  function animate() {
    if(x == data_x){
      clearInterval(anim);
    }else{
      data_x++;
    redElem.style.top = data_x+"px";
    // redElem.style.left =y+"px";
    }
    if(y == data_y){
      clearInterval(anim);
    }else{
      data_y++;
    redElem.style.top = data_y+"px";
    // redElem.style.left =y+"px";
    }

  }
}

