var prices = {
  Áo: 150000,
  Quần: 200000,
  Giày: 300000,
  Mũ: 50000,
};

var form = document.getElementById("orderForm");
var formContainer = document.getElementById("formContainer");
var confirmContainer = document.getElementById("confirmContainer");
var successContainer = document.getElementById("successContainer");
var orderSummary = document.getElementById("orderSummary");
var totalPriceSpan = document.getElementById("totalPrice");

var product = document.getElementById("product");
var quantity = document.getElementById("quantity");
var deliveryDate = document.getElementById("deliveryDate");
var address = document.getElementById("address");
var note = document.getElementById("note");
var noteCounter = document.getElementById("noteCounter");
var paymentRadios = document.getElementsByName("payment");

function showError(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

function clearError(elementId) {
  document.getElementById(elementId).textContent = "";
}

function updateTotalPrice() {
  var selectedProduct = product.value;
  var qty = parseInt(quantity.value) || 0;

  if (selectedProduct && prices[selectedProduct]) {
    var total = prices[selectedProduct] * qty;
    totalPriceSpan.textContent =
      "Total: " + total.toLocaleString("vi-VN") + " VND";
  } else {
    totalPriceSpan.textContent = "Total: 0 VND";
  }
}

function updateNoteCounter() {
  var noteLength = note.value.length;
  noteCounter.textContent = noteLength + "/200";

  if (noteLength > 200) {
    noteCounter.classList.add("error");
  } else {
    noteCounter.classList.remove("error");
  }
}

function validateProduct() {
  if (product.value === "") {
    showError("productError", "Please select a product");
    return false;
  }
  clearError("productError");
  return true;
}

function validateQuantity() {
  var value = parseInt(quantity.value);
  if (isNaN(value) || value < 1 || value > 99) {
    showError("quantityError", "Quantity must be between 1 and 99");
    return false;
  }
  clearError("quantityError");
  return true;
}

function validateDeliveryDate() {
  var selectedDate = new Date(deliveryDate.value);
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 30);

  if (!deliveryDate.value) {
    showError("dateError", "Please select a delivery date");
    return false;
  }

  if (selectedDate < today) {
    showError("dateError", "Delivery date cannot be in the past");
    return false;
  }

  if (selectedDate > maxDate) {
    showError(
      "dateError",
      "Delivery date cannot be more than 30 days from today",
    );
    return false;
  }

  clearError("dateError");
  return true;
}

function validateAddress() {
  var value = address.value.trim();
  if (value === "") {
    showError("addressError", "Address is required");
    return false;
  }
  if (value.length < 10) {
    showError("addressError", "Address must be at least 10 characters");
    return false;
  }
  clearError("addressError");
  return true;
}

function validateNote() {
  if (note.value.length > 200) {
    showError("noteError", "Note cannot exceed 200 characters");
    return false;
  }
  clearError("noteError");
  return true;
}

function validatePayment() {
  for (var i = 0; i < paymentRadios.length; i++) {
    if (paymentRadios[i].checked) {
      clearError("paymentError");
      return true;
    }
  }
  showError("paymentError", "Please select a payment method");
  return false;
}

product.addEventListener("change", function () {
  clearError("productError");
  updateTotalPrice();
});

quantity.addEventListener("input", function () {
  clearError("quantityError");
  updateTotalPrice();
});

deliveryDate.addEventListener("input", function () {
  clearError("dateError");
});

address.addEventListener("input", function () {
  clearError("addressError");
});

note.addEventListener("input", function () {
  clearError("noteError");
  updateNoteCounter();
});

for (var i = 0; i < paymentRadios.length; i++) {
  paymentRadios[i].addEventListener("input", function () {
    clearError("paymentError");
  });
}

product.addEventListener("blur", validateProduct);
quantity.addEventListener("blur", validateQuantity);
deliveryDate.addEventListener("blur", validateDeliveryDate);
address.addEventListener("blur", validateAddress);
note.addEventListener("blur", validateNote);

for (var i = 0; i < paymentRadios.length; i++) {
  paymentRadios[i].addEventListener("blur", validatePayment);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var isValid =
    validateProduct() &
    validateQuantity() &
    validateDeliveryDate() &
    validateAddress() &
    validateNote() &
    validatePayment();

  if (isValid) {
    var selectedProduct = product.value;
    var qty = quantity.value;
    var total = prices[selectedProduct] * qty;
    var selectedPayment = "";

    for (var i = 0; i < paymentRadios.length; i++) {
      if (paymentRadios[i].checked) {
        selectedPayment = paymentRadios[i].value;
        break;
      }
    }

    var summary = "<strong>Product:</strong> " + selectedProduct + "<br>";
    summary += "<strong>Quantity:</strong> " + qty + "<br>";
    summary +=
      "<strong>Total:</strong> " + total.toLocaleString("vi-VN") + " VND<br>";
    summary += "<strong>Delivery Date:</strong> " + deliveryDate.value + "<br>";
    summary += "<strong>Address:</strong> " + address.value + "<br>";
    summary += "<strong>Payment:</strong> " + selectedPayment;

    if (note.value.trim() !== "") {
      summary += "<br><strong>Note:</strong> " + note.value;
    }

    orderSummary.innerHTML = summary;
    formContainer.classList.add("hidden");
    confirmContainer.classList.remove("hidden");
  }
});

document.getElementById("confirmBtn").addEventListener("click", function () {
  confirmContainer.classList.add("hidden");
  successContainer.classList.remove("hidden");
});

document.getElementById("cancelBtn").addEventListener("click", function () {
  confirmContainer.classList.add("hidden");
  formContainer.classList.remove("hidden");
});

updateNoteCounter();
updateTotalPrice();

var today = new Date();
var year = today.getFullYear();
var month = String(today.getMonth() + 1).padStart(2, "0");
var day = String(today.getDate()).padStart(2, "0");
deliveryDate.min = year + "-" + month + "-" + day;

var maxDate = new Date(today);
maxDate.setDate(maxDate.getDate() + 30);
var maxYear = maxDate.getFullYear();
var maxMonth = String(maxDate.getMonth() + 1).padStart(2, "0");
var maxDay = String(maxDate.getDate()).padStart(2, "0");
deliveryDate.max = maxYear + "-" + maxMonth + "-" + maxDay;
