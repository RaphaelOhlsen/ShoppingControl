
var $bt_add = document.getElementById('bt-add');
$bt_add.addEventListener('click', addData, false);

var $bt_reset = document.getElementById('bt-reset');
$bt_reset.addEventListener('click', resetForm, false);

var $bt_reset2 = document.getElementById('bt-reset2');
$bt_reset2.addEventListener('click', resetForm, false);

var $bt_update = document.getElementById('bt-update');
$bt_update.addEventListener('click', updateData, false);

var $bt_delete = document.getElementById('bt-delete');
$bt_delete.addEventListener('click', deleteList, false);

var list = [
    {'desc':"rice",'amount':1,'value':5.40},
    {'desc':"beer",'amount':12,'value':1.99},
    {'desc':"meet",'amount':1,'value':15.00}
];

function getTotal(list){
    var total = 0;
    for(var key in list){
        total += list[key].value * list[key].amount;
    }
    document.getElementById("totalValue").innerHTML = formatValue(total);
}

function setList(list){
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td> </tr></thead><tbody>';
    for (var key in list){
        table += '<tr><td>' + formatDesc(list[key].desc) + '</td><td>' + formatAmount(list[key].amount) + '</td><td>'+ formatValue(list[key].value) + '</td><td><button class="btn btn-default" onclick="setUpdate('+key+');">Edit</button> <button class="btn btn-danger" onclick="deleteItem('+key+');">Delete</button></td></tr>'
    }
    table += '</tbody>';
    document.getElementById('listTable').innerHTML = table;
    getTotal(list);
    saveListStorage(list);
}

function formatDesc(desc){
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function formatValue(value){
    return 'R$ ' + (parseFloat(value).toFixed(2) + '').replace(".",',');
}

function formatAmount(amount) {
    return parseInt(amount);
}

function addData(){
    if(!validation()) return;
    var desc = document.getElementById('desc').value;
    var amount = document.getElementById('amount').value;
    var value = document.getElementById('value').value;
    list.unshift({"desc": desc, "amount": amount, "value": value});
    resetForm();
    setList(list);
}

function resetForm(){
    document.getElementById('desc').value = "";
    document.getElementById('amount').value = "";
    document.getElementById('value').value = "";
    document.getElementById('btnUpdate').style.display = "none";
    document.getElementById('bt-add').style.display = "inline-block";
    document.getElementById("inputIDUpdate").innerHTML = "";
    document.getElementById("errors").style.display = "none";

}

function updateData(){
    if (!validation()) return;
    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById('desc').value;
    var amount = document.getElementById('amount').value;
    var value = document.getElementById('value').value;
    list[id] = {"desc": desc, "amount": amount, "value": value};
    resetForm();
    setList(list);
}

function setUpdate(id) {
    var obj = list[id];
    document.getElementById('desc').value = obj.desc;
    document.getElementById('amount').value = obj.amount;
    document.getElementById('value').value = obj.value;
    document.getElementById('btnUpdate').style.display = "inline-block";
    document.getElementById('bt-add').style.display = "none";

    document.getElementById("inputIDUpdate").innerHTML = '<input type="hidden" id="idUpdate" value="'+id+'">';
}

function deleteItem(id) {
      if(confirm("Delete this item?")) {
          if(id === list.length - 1){
              list.pop();
          } else if(id === 0) {
              list.shift();
          } else {
              list = list.slice(0, id).concat(list.slice(id + 1));
          }
          setList(list);
      }
}

function validation(){
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    var errors="";
    document.getElementById("errors").style.display = "none";

    if(desc === "") {
        errors += '<p>Fill out description</p>';
    }

    if(amount === "") {
        errors += '<p>Fill out quantity</p>';
    } else if(amount != parseInt(amount)) {
        errors += '<p>Fill out valid amount</p>';
    }

    if(value === "") {
        errors += '<p>Fill out value</p>';
    } else if(value != parseFloat(value)) {
        errors += '<p>Fill out valid value</p>';
    }

    if(errors !== ""){
        document.getElementById("errors").style.display = "block";
        document.getElementById("errors").style.backgroundColor = "rgba(85,85,85,0.3)";
        document.getElementById("errors").style.color = "white";
        document.getElementById("errors").style.padding = "10px";
        document.getElementById("errors").style.margin = "10px";
        document.getElementById("errors").style.borderRadius = "13px";
        document.getElementById("errors").innerHTML = "<h3>Error:</h3>" + errors;
        return 0;
    } else
        return 1;
}

function deleteList(){
    if(confirm('Delete this list?')){
        list = [];
        setList(list);
    }
    resetForm();
}

function saveListStorage(list) {
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list",jsonStr);
}

function initListStorage(){
    var testList = localStorage.getItem("list");
    if(testList){
        list = JSON.parse(testList)
    }
    setList(list);
}

initListStorage();

