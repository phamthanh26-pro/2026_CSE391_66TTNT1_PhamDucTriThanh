let allStudents = [];
let showStudents = [];
let sortUp = true;

function getGrade(s) {
  if (s >= 8.5) return "Excellent";
  if (s >= 7) return "Good";
  if (s >= 5) return "Average";
  return "Poor";
}

function check(name, score) {
  if (name == "") {
    alert("Please enter name");
    return false;
  }
  if (score == "") {
    alert("Please enter score");
    return false;
  }
  let n = Number(score);
  if (isNaN(n)) {
    alert("Score must be a number");
    return false;
  }
  if (n < 0 || n > 10) {
    alert("Score must be 0-10");
    return false;
  }
  return true;
}

function calcAvg() {
  let sum = 0;
  for (let i = 0; i < showStudents.length; i++) {
    sum = sum + showStudents[i].score;
  }
  if (showStudents.length > 0) {
    return (sum / showStudents.length).toFixed(2);
  }
  return "0.00";
}

function updateStats() {
  document.getElementById("total").innerHTML = allStudents.length;
  document.getElementById("avg").innerHTML = calcAvg();
  document.getElementById("show").innerHTML = showStudents.length;
  document.getElementById("totalCount").innerHTML = allStudents.length;

  if (showStudents.length == 0 && allStudents.length > 0) {
    document.getElementById("noResultMsg").style.display = "block";
  } else {
    document.getElementById("noResultMsg").style.display = "none";
  }
}

function filterData() {
  let searchText = document.getElementById("search").value.toLowerCase();
  let gradeVal = document.getElementById("gradeFilter").value;

  let temp = allStudents;

  if (searchText != "") {
    temp = temp.filter(function (s) {
      return s.name.toLowerCase().includes(searchText);
    });
  }

  if (gradeVal != "all") {
    temp = temp.filter(function (s) {
      return s.grade == gradeVal;
    });
  }

  if (sortUp) {
    temp.sort(function (a, b) {
      return a.score - b.score;
    });
  } else {
    temp.sort(function (a, b) {
      return b.score - a.score;
    });
  }

  showStudents = temp;
  showList();
}

function showList() {
  let t = document.getElementById("list");
  t.innerHTML = "";

  for (let i = 0; i < showStudents.length; i++) {
    let stu = showStudents[i];
    let row = document.createElement("tr");

    if (stu.score < 5) {
      row.style.background = "#fff3cd";
    }

    let orgIndex = allStudents.findIndex(function (s) {
      return s.name == stu.name && s.score == stu.score;
    });

    row.innerHTML =
      "<td>" +
      (i + 1) +
      "</td>" +
      "<td>" +
      stu.name +
      "</td>" +
      "<td>" +
      stu.score.toFixed(1) +
      "</td>" +
      "<td>" +
      stu.grade +
      "</td>" +
      "<td><button class='delete-btn' data-index='" +
      orgIndex +
      "'>X</button></td>";

    t.appendChild(row);
  }
  updateStats();
}

function addStudent() {
  let n = document.getElementById("name").value;
  let s = document.getElementById("score").value;

  if (!check(n, s)) return;

  let scoreNum = Number(s);

  let newStu = {
    name: n,
    score: scoreNum,
    grade: getGrade(scoreNum),
  };

  allStudents.push(newStu);

  document.getElementById("name").value = "";
  document.getElementById("score").value = "";
  document.getElementById("name").focus();

  filterData();
}

function deleteStudent(e) {
  if (e.target.classList.contains("delete-btn")) {
    let pos = e.target.getAttribute("data-index");
    if (confirm("Delete this student?")) {
      allStudents.splice(pos, 1);
      filterData();
    }
  }
}

function toggleSort() {
  sortUp = !sortUp;
  if (sortUp) {
    document.getElementById("sortIcon").innerHTML = "▲";
  } else {
    document.getElementById("sortIcon").innerHTML = "▼";
  }
  filterData();
}

let addBtn = document.getElementById("addBtn");
let nameInput = document.getElementById("name");
let scoreInput = document.getElementById("score");
let searchInput = document.getElementById("search");
let gradeSelect = document.getElementById("gradeFilter");
let sortBtn = document.getElementById("sortBtn");
let listBody = document.getElementById("list");

addBtn.addEventListener("click", addStudent);

scoreInput.addEventListener("keypress", function (e) {
  if (e.key == "Enter") addStudent();
});

nameInput.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    scoreInput.focus();
  }
});

searchInput.addEventListener("input", filterData);
gradeSelect.addEventListener("change", filterData);
sortBtn.addEventListener("click", toggleSort);
listBody.addEventListener("click", deleteStudent);
