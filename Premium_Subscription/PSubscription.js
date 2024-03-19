// Function to toggle the visibility of the expanded content
function toggleExpandedContent(contentId) {
  let expandedContent = document.getElementById(contentId);
  if (expandedContent.style.display === "block") {
    expandedContent.style.display = "none";
  } else {
    expandedContent.style.display = "block";
  }
}