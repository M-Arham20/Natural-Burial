const SERVER_URL = "http://ugdev.cs.smu.ca:3069";

// Function to toggle the visibility of the expanded content
function toggleExpandedContent(contentId) {
  let expandedContent = document.getElementById(contentId);
  if (expandedContent.style.display === "block") {
    expandedContent.style.display = "none";
  } else {
    expandedContent.style.display = "block";
  }
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

// Optional: Hide the button when the page is at the top
window.onscroll = function () {
  var backToTopButton = document.getElementById("back-to-top");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
};

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

  // Gather selected decoration options
  var decorations = [];
  var decorationOptions = document.getElementsByName("decoration[]");
  decorationOptions.forEach(function (option) {
    if (option.checked) {
      decorations.push(option.value);
    }
  });

  // Gather selected subscription plan
  var subscriptionPlan = "";
  var subscriptionPlanOptions = document.querySelectorAll(
    'input[name="subscriptionPlan"]:checked'
  );
  if (subscriptionPlanOptions.length > 0) {
    subscriptionPlan = subscriptionPlanOptions[0].value;
  }

  var casket = "";
  var casketOptions = document.getElementsByName("casket");
  casketOptions.forEach(function (option) {
    if (option.checked) {
      casket = option.value;
    }
  });

  // Create JSON object
  var data = {
    surname: surname,
    middleName: middleName,
    firstName: firstName,
    dob: dob,
    dod: dod,
    place: place,
    phone: phone,
    decorations: decorations, // Include selected decorations
    subscriptionPlan: subscriptionPlan, // Include selected subscription plan
    casket: casket, // Include chosen casket type
  };

  // Store personal info in localStorage
  if (typeof Storage !== "undefined") {
    window.localStorage.setItem("personal_Info", JSON.stringify(data));
  } else {
    console.log("Local Storage is not defined");
  }

  // Clear selected subscription plan after storing
  subscriptionPlanOptions.forEach(function (option) {
    option.checked = false;
  });

  // Clear radio options
  var radioOptions = document.querySelectorAll('input[type="radio"] + label');
  radioOptions.forEach(function (label) {
    label.classList.remove("checked");
  });

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
  let default_Data = {
    surname: "Smith",
    middleName: "Micheal",
    firstName: "John",
    dob: "2000-11-10",
    dod: "2022-12-11",
    place: "London",
    phone: "123-456-7890",
  };
  let retrievedData;
  if (typeof Storage !== undefined) {
    retrievedData = JSON.parse(window.localStorage.getItem("personal_Info"));
  } else {
    console.log("Local Storage is not defined");
  }
  if (!retrievedData) {
    // If no data retrieved, populate with default values
    retrievedData = default_Data;
    window.localStorage.setItem("personal_Info", JSON.stringify(retrievedData));
  }
  document.getElementById("surname").value = retrievedData.surname;
  document.getElementById("middleName").value = retrievedData.middleName;
  document.getElementById("firstName").value = retrievedData.firstName;
  document.getElementById("dob").value = retrievedData.dob;
  document.getElementById("dod").value = retrievedData.dod;
  document.getElementById("place").value = retrievedData.place;
  document.getElementById("phone").value = retrievedData.phone;
  var selectedDecorations = retrievedData.decorations;

  selectedDecorations.forEach(function (option) {
    var checkbox = document.querySelector(
      "input[name='decoration[]'][value='" + option + "']"
    );
    if (checkbox) {
      checkbox.checked = true;
    }
  });

  // Select the previously selected casket option
  var selectedCasket = retrievedData.casket;
  var casketOptions = document.getElementsByName("casket");
  casketOptions.forEach(function (option) {
    if (option.value === selectedCasket) {
      option.checked = true;
    }
  });
}

function autoHyphen(input) {
  // Remove any existing hyphens and non-numeric characters
  let phoneNumber = input.value.replace(/[^0-9]/g, "");

  // Add hyphen after the first three digits if present
  if (phoneNumber.length > 3) {
    phoneNumber = phoneNumber.slice(0, 3) + "-" + phoneNumber.slice(3);
  }

  // Add hyphen after the next three digits if present
  if (phoneNumber.length > 7) {
    phoneNumber = phoneNumber.slice(0, 7) + "-" + phoneNumber.slice(7);
  }

  // Update the input value
  input.value = phoneNumber;
}

//fuction for changing the colors
function changeColor(planId) {
  // List of all plan ids
  let allPlanIds = ["plan1", "plan2", "plan3"];

  // Remove the class from all plans
  allPlanIds.forEach(function (id) {
    let plan = document.getElementById(id);
    plan.classList.remove("bg-gray-300");
  });

  // Add the class to the selected plan
  let box = document.getElementById(planId);
  box.classList.add("bg-gray-300");
}

// Function to toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark");
}

// Function to upload data to the server
function uploadData() {
  // Retrieve personal_Info from local storage
  const personalInfo = JSON.parse(localStorage.getItem("personal_Info"));

  // Check if personalInfo is not null or undefined
  if (personalInfo) {
    // Use HTTP for secure communication
    $.post(SERVER_URL + "/myPost", { personal_Info: personalInfo }, successFn)
      .done(function (response) {
        console.log("Data uploaded successfully:", response);
      })
      .fail(function (xhr, status, error) {
        console.error("Upload failed:", error);
      });
  } else {
    console.error("Personal Info not found in local storage.");
  }
}

// Function to download data from the server
function downloadData() {
  // Use HTTP for secure communication
  $.get(SERVER_URL + "/myGet", successFn).fail(function (xhr, status, error) {
    console.error("Download failed:", error);
  });
  let default_Data = {
    surname: "Smith",
    middleName: "Micheal",
    firstName: "John",
    dob: "2000-11-10",
    dod: "2022-12-11",
    place: "London",
    phone: "123-456-7890",
  
  };
  let retrievedData;
  if (typeof Storage !== undefined) {
    retrievedData = JSON.parse(window.localStorage.getItem("personal_Info"));
  } else {
    console.log("Local Storage is not defined");
  }
  if (!retrievedData) {
    // If no data retrieved, populate with default values
    retrievedData = default_Data;
    window.localStorage.setItem("personal_Info", JSON.stringify(retrievedData));
  }
  document.getElementById("surname").value = retrievedData.surname;
  document.getElementById("middleName").value = retrievedData.middleName;
  document.getElementById("firstName").value = retrievedData.firstName;
  document.getElementById("dob").value = retrievedData.dob;
  document.getElementById("dod").value = retrievedData.dod;
  document.getElementById("place").value = retrievedData.place;
  document.getElementById("phone").value = retrievedData.phone;
  var selectedDecorations = retrievedData.decorations;

  selectedDecorations.forEach(function (option) {
    var checkbox = document.querySelector(
      "input[name='decoration[]'][value='" + option + "']"
    );
    if (checkbox) {
      checkbox.checked = true;
    }
  });

  // Select the previously selected casket option
  var selectedCasket = retrievedData.casket;
  var casketOptions = document.getElementsByName("casket");
  casketOptions.forEach(function (option) {
    if (option.value === selectedCasket) {
      option.checked = true;
    }
  });
}

function successFn(returnedData) {
  console.log(returnedData);
}

// Event listeners for upload and download buttons
document.getElementById("uploadDataBtn").addEventListener("click", uploadData);
document
  .getElementById("downloadDataBtn")
  .addEventListener("click", downloadData);