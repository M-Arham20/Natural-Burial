// Function to toggle the visibility of the expanded content
function toggleExpandedContent(contentId) {
  let expandedContent = document.getElementById(contentId);
  if (expandedContent.style.display === "block") {
    expandedContent.style.display = "none";
  } else {
    expandedContent.style.display = "block";
  }
}

// Function to read the description text
function readDescription() {
  var descriptionText = document.getElementById("expandedContent").innerText;
  alert(descriptionText);
}

// Function to scroll to the top of the page
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Function to scroll to a subscription plan
function scrollToSubscription(planId) {
  var element = document.getElementById(planId);
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Function to handle form submission
function submitForm() {
  // Gather input field values
  var surname = document.getElementById("surname").value;
  var middleName = document.getElementById("middleName").value;
  var firstName = document.getElementById("firstName").value;
  var dob = document.getElementById("dob").value;
  var dod = document.getElementById("dod").value;
  var place = document.getElementById("place").value;
  var phone = document.getElementById("phone").value;

  // Create JSON object
  var personalInfo = {
    surname: surname,
    middleName: middleName,
    firstName: firstName,
    dob: dob,
    dod: dod,
    place: place,
    phone: phone,
  };

  if (typeof Storage !== "undefined") {
    window.localStorage.setItem("personal_Info", JSON.stringify(personalInfo));
  }

  // Clear input fields
  document.getElementById("surname").value = "";
  document.getElementById("middleName").value = "";
  document.getElementById("firstName").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("dod").value = "";
  document.getElementById("place").value = "";
  document.getElementById("phone").value = "";
}

function retrieving() {
  let retrievedData;
  if (typeof Storage !== "undefined") {
    retrievedData = JSON.parse(window.localStorage.getItem("personal_Info"));
  }
  document.getElementById("surname").value = retrievedData.surname;
  document.getElementById("middleName").value = retrievedData.middleName;
  document.getElementById("firstName").value = retrievedData.firstName;
  document.getElementById("dob").value = retrievedData.dob;
  document.getElementById("dod").value = retrievedData.dod;
  document.getElementById("place").value = retrievedData.place;
  document.getElementById("phone").value = retrievedData.phone;
}
