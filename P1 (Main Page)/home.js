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

  var casket = "";
  var casketOptions = document.getElementsByName("casket");
  casketOptions.forEach(function (option) {
    if (option.checked) {
      casket = option.value;
    }
  });

  // Create JSON object
  var personalInfo = {
    surname: surname,
    middleName: middleName,
    firstName: firstName,
    dob: dob,
    dod: dod,
    place: place,
    phone: phone,
    decorations: decorations, // Include selected decorations
    casket: casket, // Include chosen casket type
  };

  // Store personal info in localStorage
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
  document.addEventListener('DOMContentLoaded', function() {
    const radioButtons = document.querySelectorAll('input[name="subscriptionPlan"]');
    radioButtons.forEach(radio => {
      radio.addEventListener('change', function() {
        document.querySelectorAll('#plan1, #plan2, #plan3').forEach(div => {
          div.classList.remove('bg-gray-300'); // Remove the color from all plans
        });
        if (this.checked) {
          document.querySelector(`label[for="${this.id}"]`).closest('.shadow-lg').classList.add('bg-gray-300'); // Add color to the selected plan
        }
      });
    });
  });
