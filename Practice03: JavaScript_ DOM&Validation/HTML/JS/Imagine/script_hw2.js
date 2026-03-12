var currentStep = 1;

var formContainer = document.getElementById("formContainer");
var successContainer = document.getElementById("successContainer");
var step1 = document.getElementById("step1");
var step2 = document.getElementById("step2");
var step3 = document.getElementById("step3");
var progressFill = document.getElementById("progressFill");
var stepIndicator = document.getElementById("stepIndicator");
var summary = document.getElementById("summary");

var fullname = document.getElementById("fullname");
var dob = document.getElementById("dob");
var genderRadios = document.getElementsByName("gender");
var email = document.getElementById("email");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirmPassword");

var next1 = document.getElementById("next1");
var next2 = document.getElementById("next2");
var prev2 = document.getElementById("prev2");
var prev3 = document.getElementById("prev3");
var submitBtn = document.getElementById("submit");

function showError(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

function clearError(elementId) {
  document.getElementById(elementId).textContent = "";
}

function validateFullname() {
  var value = fullname.value.trim();
  if (value === "") {
    showError("fullnameError", "Full name is required");
    return false;
  }
  if (value.length < 3) {
    showError("fullnameError", "Full name must be at least 3 characters");
    return false;
  }
  if (!/^[A-Za-z\s]+$/.test(value)) {
    showError("fullnameError", "Only letters and spaces allowed");
    return false;
  }
  clearError("fullnameError");
  return true;
}

function validateDob() {
  if (!dob.value) {
    showError("dobError", "Date of birth is required");
    return false;
  }

  var selectedDate = new Date(dob.value);
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate > today) {
    showError("dobError", "Date of birth cannot be in the future");
    return false;
  }

  clearError("dobError");
  return true;
}

function validateGender() {
  for (var i = 0; i < genderRadios.length; i++) {
    if (genderRadios[i].checked) {
      clearError("genderError");
      return true;
    }
  }
  showError("genderError", "Please select a gender");
  return false;
}

function validateEmail() {
  var value = email.value.trim();
  if (value === "") {
    showError("emailError", "Email is required");
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    showError("emailError", "Invalid email format");
    return false;
  }
  clearError("emailError");
  return true;
}

function validatePassword() {
  var value = password.value;
  if (value === "") {
    showError("passwordError", "Password is required");
    return false;
  }
  if (value.length < 8) {
    showError("passwordError", "Password must be at least 8 characters");
    return false;
  }
  if (!/[A-Z]/.test(value)) {
    showError("passwordError", "Password must contain 1 uppercase letter");
    return false;
  }
  if (!/[a-z]/.test(value)) {
    showError("passwordError", "Password must contain 1 lowercase letter");
    return false;
  }
  if (!/[0-9]/.test(value)) {
    showError("passwordError", "Password must contain 1 number");
    return false;
  }
  clearError("passwordError");
  return true;
}

function validateConfirm() {
  if (password.value !== confirmPassword.value) {
    showError("confirmError", "Passwords do not match");
    return false;
  }
  clearError("confirmError");
  return true;
}

function updateStep(step) {
  currentStep = step;

  step1.classList.add("hidden");
  step2.classList.add("hidden");
  step3.classList.add("hidden");

  if (step === 1) {
    step1.classList.remove("hidden");
  } else if (step === 2) {
    step2.classList.remove("hidden");
  } else if (step === 3) {
    step3.classList.remove("hidden");
    updateSummary();
  }

  var progress = (step / 3) * 100;
  progressFill.style.width = progress + "%";
  stepIndicator.textContent = "Step " + step + " of 3";
}

function updateSummary() {
  var selectedGender = "";
  for (var i = 0; i < genderRadios.length; i++) {
    if (genderRadios[i].checked) {
      selectedGender = genderRadios[i].value;
      break;
    }
  }

  var html = "<strong>Full name:</strong> " + fullname.value.trim() + "<br>";
  html += "<strong>Date of birth:</strong> " + dob.value + "<br>";
  html += "<strong>Gender:</strong> " + selectedGender + "<br>";
  html += "<strong>Email:</strong> " + email.value.trim() + "<br>";
  html += "<strong>Password:</strong> " + "*".repeat(password.value.length);

  summary.innerHTML = html;
}

fullname.addEventListener("input", function () {
  clearError("fullnameError");
});

dob.addEventListener("input", function () {
  clearError("dobError");
});

for (var i = 0; i < genderRadios.length; i++) {
  genderRadios[i].addEventListener("input", function () {
    clearError("genderError");
  });
}

email.addEventListener("input", function () {
  clearError("emailError");
});

password.addEventListener("input", function () {
  clearError("passwordError");
});

confirmPassword.addEventListener("input", function () {
  clearError("confirmError");
});

fullname.addEventListener("blur", validateFullname);
dob.addEventListener("blur", validateDob);

for (var i = 0; i < genderRadios.length; i++) {
  genderRadios[i].addEventListener("blur", validateGender);
}

email.addEventListener("blur", validateEmail);
password.addEventListener("blur", validatePassword);
confirmPassword.addEventListener("blur", validateConfirm);

next1.addEventListener("click", function () {
  if (validateFullname() & validateDob() & validateGender()) {
    updateStep(2);
  }
});

next2.addEventListener("click", function () {
  if (validateEmail() & validatePassword() & validateConfirm()) {
    updateStep(3);
  }
});

prev2.addEventListener("click", function () {
  updateStep(1);
});

prev3.addEventListener("click", function () {
  updateStep(2);
});

submitBtn.addEventListener("click", function () {
  formContainer.classList.add("hidden");
  successContainer.classList.remove("hidden");
});

var today = new Date();
var year = today.getFullYear();
var month = String(today.getMonth() + 1).padStart(2, "0");
var day = String(today.getDate()).padStart(2, "0");
dob.max = year + "-" + month + "-" + day;

updateStep(1);
