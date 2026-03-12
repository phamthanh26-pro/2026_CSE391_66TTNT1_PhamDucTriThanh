var form = document.getElementById("signupForm");
var formContainer = document.getElementById("formContainer");
var successContainer = document.getElementById("successContainer");
var successMessage = document.getElementById("successMessage");

var fullname = document.getElementById("fullname");
var email = document.getElementById("email");
var phone = document.getElementById("phone");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirmPassword");
var genderRadios = document.getElementsByName("gender");
var terms = document.getElementById("terms");

var toggleBtn = document.getElementById("togglePassword");
var nameCounter = document.getElementById("nameCounter");
var strengthFill = document.getElementById("strengthFill");
var strengthText = document.getElementById("strengthText");

function showError(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

function clearError(elementId) {
  document.getElementById(elementId).textContent = "";
}

function updateNameCounter() {
  var length = fullname.value.length;
  nameCounter.textContent = length + "/50";
}

function updatePasswordStrength() {
  var value = password.value;
  var strength = 0;
  var color = "";
  var text = "";

  if (value.length >= 8) strength += 1;
  if (/[A-Z]/.test(value)) strength += 1;
  if (/[a-z]/.test(value)) strength += 1;
  if (/[0-9]/.test(value)) strength += 1;
  if (/[^A-Za-z0-9]/.test(value)) strength += 1;

  if (value.length === 0) {
    strengthFill.style.width = "0";
    strengthText.textContent = "";
    return;
  }

  if (strength <= 2) {
    color = "#ff4444";
    text = "Weak";
  } else if (strength <= 4) {
    color = "#ffbb33";
    text = "Medium";
  } else {
    color = "#00C851";
    text = "Strong";
  }

  var percentage = (strength / 5) * 100;
  strengthFill.style.width = percentage + "%";
  strengthFill.style.backgroundColor = color;
  strengthText.textContent = text;
  strengthText.style.color = color;
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
  if (value.length > 50) {
    showError("fullnameError", "Full name cannot exceed 50 characters");
    return false;
  }
  if (!/^[A-Za-z\s]+$/.test(value)) {
    showError("fullnameError", "Only letters and spaces allowed");
    return false;
  }
  clearError("fullnameError");
  return true;
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

function validatePhone() {
  var value = phone.value.trim();
  if (value === "") {
    showError("phoneError", "Phone number is required");
    return false;
  }
  if (!/^0\d{9}$/.test(value)) {
    showError("phoneError", "Phone must be 10 digits starting with 0");
    return false;
  }
  clearError("phoneError");
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

function validateTerms() {
  if (!terms.checked) {
    showError("termsError", "You must accept the terms");
    return false;
  }
  clearError("termsError");
  return true;
}

fullname.addEventListener("input", function () {
  clearError("fullnameError");
  updateNameCounter();
});

email.addEventListener("input", function () {
  clearError("emailError");
});

phone.addEventListener("input", function () {
  clearError("phoneError");
});

password.addEventListener("input", function () {
  clearError("passwordError");
  updatePasswordStrength();
});

confirmPassword.addEventListener("input", function () {
  clearError("confirmError");
});

for (var i = 0; i < genderRadios.length; i++) {
  genderRadios[i].addEventListener("input", function () {
    clearError("genderError");
  });
}

terms.addEventListener("input", function () {
  clearError("termsError");
});

fullname.addEventListener("blur", validateFullname);
email.addEventListener("blur", validateEmail);
phone.addEventListener("blur", validatePhone);
password.addEventListener("blur", validatePassword);
confirmPassword.addEventListener("blur", validateConfirm);

for (var i = 0; i < genderRadios.length; i++) {
  genderRadios[i].addEventListener("blur", validateGender);
}

terms.addEventListener("blur", validateTerms);

toggleBtn.addEventListener("click", function () {
  var type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.textContent = type === "password" ? "👁" : "👁‍🗨";
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var isValid =
    validateFullname() &
    validateEmail() &
    validatePhone() &
    validatePassword() &
    validateConfirm() &
    validateGender() &
    validateTerms();

  if (isValid) {
    successMessage.textContent = "Welcome, " + fullname.value.trim() + "!";
    formContainer.classList.add("hidden");
    successContainer.classList.remove("hidden");
  }
});

updateNameCounter();
updatePasswordStrength();
