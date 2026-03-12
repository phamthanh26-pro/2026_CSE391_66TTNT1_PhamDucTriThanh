let students = [];

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

function avgScore() {
  let sum = 0;
  for (let i = 0; i < students.length; i++) {
    sum = sum + students[i].score;
  }
  if (students.length > 0) {
    return (sum / students.length).toFixed(2);
  }
  return "0.00";
}

function updateStats() {
  document.getElementById("total").innerHTML = students.length;
  document.getElementById("avg").innerHTML = avgScore();
}

function showList() {
  let t = document.getElementById("list");
  t.innerHTML = "";

  for (let i = 0; i < students.length; i++) {
    let stu = students[i];
    let row = document.createElement("tr");

    if (stu.score < 5) {
      row.style.background = "#fff3cd";
    }

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
      "<td><button class='delete-btn' onclick='del(" +
      i +
      ")'>X</button></td>";

    t.appendChild(row);
  }
  updateStats();
}

function add() {
  let n = document.getElementById("name").value;
  let s = document.getElementById("score").value;

  if (!check(n, s)) return;

  let scoreNum = parseFloat(s);
  let newStu = {
    name: n,
    score: scoreNum,
    grade: getGrade(scoreNum),
  };

  students.push(newStu);
  showList();

  document.getElementById("name").value = "";
  document.getElementById("score").value = "";
  document.getElementById("name").focus();
}

function del(pos) {
  if (confirm("Delete this student?")) {
    students.splice(pos, 1);
    showList();
  }
}

document.getElementById("addBtn").onclick = add;

document.getElementById("score").onkeypress = function (e) {
  if (e.key == "Enter") add();
};

document.getElementById("name").onkeypress = function (e) {
  if (e.key == "Enter") {
    document.getElementById("score").focus();
  }
};
