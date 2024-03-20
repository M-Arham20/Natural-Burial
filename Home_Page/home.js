// Function to toggle the visibility of the expanded content
function toggleExpandedContent(contentId) {
  let expandedContent = document.getElementById(contentId);
  if (expandedContent.style.display === "block") {
    expandedContent.style.display = "none";
  } else {
    expandedContent.style.display = "block";
  }
}
function readDescription() {
  var descriptionText = document.getElementById("expandedContent").innerText;
  alert(descriptionText);
}
// function darkMode() {
//     let element = document.body;
//     element.classList.toggle("dark-mode");
// }
