// data
const initial_data = [
  { name: "Tuấn", account: 0, loan: 0 },
  { name: "Khang", account: 0, loan: 0 },
  { name: "Thái Minh", account: 0, loan: 0 },
  { name: "Quang", account: 0, loan: 0 },
  { name: "Huy", account: 0, loan: 0 },
  { name: "Khánh", account: 0, loan: 0 },
  { name: "Anh Đức", account: 0, loan: 0 },
];
const initial_host = { total_account: 0, profit: 0, lend: 0 };

// initialise data
if (
  localStorage.getItem("data") == null ||
  localStorage.getItem("host") == null
) {
  localStorage.setItem("data", JSON.stringify(initial_data));
  localStorage.setItem("host", JSON.stringify(initial_host));
}
var data = JSON.parse(localStorage.getItem("data"));
var host = JSON.parse(localStorage.getItem("host"));

// variables
const rate = 0.95;
let host_total_account = host.total_account;
let host_profit = host.profit;
let host_lend = host.lend;

// drop down
let optionList = document.getElementById("players").options;

data.forEach((option) =>
  optionList.add(new Option(option.name, option.account))
);

//host
let sum = 0;
const numbers = data.map((a) => a.account);
numbers.forEach((item) => (sum += item));

host_total_account = sum;

let sum_lend = 0;
const new_numbers = data.map((a) => a.account);
new_numbers.forEach((item) => (sum_lend += item));

host_lend = sum_lend;

document.getElementById("host-total-account").innerHTML = host_total_account;
document.getElementById("profit").innerHTML = host_profit;
document.getElementById("lend").innerHTML = host_lend;

//input
document.getElementById("input-btn").onclick = function () {
  let e = document.getElementById("players");
  let text = e.options[e.selectedIndex].text;

  let inputPoints = Number(document.getElementById("quantity").value);

  if (text == "" || inputPoints == "") {
    alert("Cần điền hết");
  } else {
    if (inputPoints <= 0) {
      alert("Cần lớn hơn 0");
    } else {
      if (confirm("Xác nhận nạp?")) {
        objIndex = data.findIndex((obj) => obj.name == text);
        data[objIndex].account += inputPoints * rate * 10;
        host.profit += inputPoints - inputPoints * rate;

        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem("host", JSON.stringify(host));

        alert("Nạp thành công");

        document.getElementById("display").innerHTML = "";

        document.getElementById("display").innerHTML = `Thành điểm: ${
          (inputPoints / 1000) * rate
        }`;

        document.getElementById("host-total-account").innerHTML =
          host_total_account + (inputPoints / 1000) * rate;
        document.getElementById("profit").innerHTML =
          host_profit + (inputPoints - inputPoints * rate);
      }
    }
  }
};

// output
document.getElementById("output-btn").onclick = function () {
  let e = document.getElementById("players");
  let text = e.options[e.selectedIndex].text;

  let outputPoints = Number(document.getElementById("quantity").value);

  if (text == "" || outputPoints == "") {
    alert("Cần điền hết");
  } else {
    if (outputPoints <= 0) {
      alert("Cần lớn hơn 0");
    } else {
      if (confirm("Xác nhận rút?")) {
        objIndex = data.findIndex((obj) => obj.name == text);
        data[objIndex].account -= outputPoints;

        localStorage.setItem("data", JSON.stringify(data));

        alert("Rút thành công");

        document.getElementById("display").innerHTML = "";

        document.getElementById("display").innerHTML = `Thành tiền: ${
          outputPoints * 1000
        }`;

        document.getElementById("host-total-account").innerHTML =
          host_total_account - outputPoints;
      }
    }
  }
};

// loan
document.getElementById("loan-btn").onclick = function () {
  let e = document.getElementById("players");
  let text = e.options[e.selectedIndex].text;

  let loanPoints = Number(document.getElementById("quantity").value);

  if (text == "" || loanPoints == "") {
    alert("Cần điền hết");
  } else {
    if (loanPoints <= 0) {
      alert("Cần lớn hơn 0");
    } else {
      if (confirm("Xác nhận vay?")) {
        objIndex = data.findIndex((obj) => obj.name == text);
        data[objIndex].loan += (loanPoints / 1000) * rate;

        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem("host", JSON.stringify(host));

        alert("Vay thành công");

        document.getElementById("display").innerHTML = "";

        document.getElementById(
          "display"
        ).innerHTML = `Số tiền vay: ${loanPoints} - Số điểm vay: ${
          (loanPoints / 1000) * rate
        }`;

        document.getElementById("lend").innerHTML = host_lend + loanPoints;
      }
    }
  }
};

// use
document.getElementById("use-btn").onclick = function () {
  let e = document.getElementById("players");
  let text = e.options[e.selectedIndex].text;

  let usePoints = Number(document.getElementById("quantity").value);

  if (text == "" || usePoints == "") {
    alert("Cần điền hết");
  } else {
    if (usePoints <= 0) {
      alert("Cần lớn hơn 0");
    } else {
      if (confirm("Xác nhận dùng?")) {
        objIndex = data.findIndex((obj) => obj.name == text);

        if (data[objIndex].account - usePoints < 0) {
          alert("Không đủ điểm. Cần nạp thêm!");
        } else {
          data[objIndex].account -= usePoints;

          localStorage.setItem("data", JSON.stringify(data));
          localStorage.setItem("host", JSON.stringify(host));

          alert("Dùng thành công");

          document.getElementById("display").innerHTML = "";

          document.getElementById(
            "display"
          ).innerHTML = `Số điểm hiện tại: ${data[objIndex].account} - Số điểm dùng: ${usePoints}`;
        }
      }
    }
  }
};

// search
function searchPlayers() {
  let inputSearch = document.getElementById("currentPlayer").value;

  const search = data.filter((item) => item.name == inputSearch);

  if (inputSearch == "all") {
    document.getElementById("searchResults").innerHTML = "";

    data.forEach(function (element) {
      document.getElementById("searchResults").innerHTML += `
        <p style="display: inline; margin-right: 10px;">Người chơi: ${element.name}</p>
        <p style="display: inline; margin-right: 10px;">Số điểm*: ${element.account}</p>
        <p style="display: inline; margin-right: 10px">Số điểm* vay: ${element.loan}</p>
  
        <br>
        `;
    });
  } else if (search == "") {
    document.getElementById("searchResults").innerHTML = "";
  } else {
    document.getElementById("searchResults").innerHTML = "";

    document.getElementById("searchResults").innerHTML = `
          <p style="display: inline; margin-right: 10px">Người chơi: ${search[0].name}</p>
          <p style="display: inline; margin-right: 10px">Số điểm*: ${search[0].account}</p>
          <p style="display: inline; margin-right: 10px">Số điểm* vay: ${search[0].loan}</p>
          `;
  }
}

// sign up
function registerAccount() {
  let newPlayer = document.getElementById("newPlayer").value;
  let newQuantity = Number(document.getElementById("newQuantity").value);

  const search = data.filter((item) => item.name == newPlayer);

  if (newPlayer == "" || newQuantity == "") {
    alert("Cần điền hết");
  } else {
    if (newQuantity <= 0) {
      alert("Cần lớn hơn 0");
    } else {
      if (search != "") {
        alert("Đã có tài khoản");
      } else if (confirm("Xác nhận tạo tài khoản?")) {
        let tempObj = {
          name: newPlayer,
          account: (newQuantity / 1000) * rate,
          loan: 0,
        };

        data.push(tempObj);
        host.profit += newQuantity - newQuantity * rate;

        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem("host", JSON.stringify(host));

        alert("Tạo tài khoản thành công");
      }
    }
  }
}
