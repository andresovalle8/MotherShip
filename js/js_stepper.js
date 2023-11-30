// Get all elements with the class "step-counter"
var elements = document.getElementsByClassName("step-counter");

// Function to change color of an element
function changeColor(event) {
    event.target.style.color = "red"; // Change the color to red
}

// Add event listener to each element
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", changeColor);
}


// Get all elements with the class "step-counter"
var elements = document.getElementsByClassName("step-counter");

// Function to change background color of an element
function changeColor(event) {
    if (event.target.style.backgroundColor !== "green") {
        event.target.style.backgroundColor = "green"; // Change the background color to green
    } else {
        event.target.style.backgroundColor = ""; // Reset the background color
    }
}

// Add event listener to each element
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", changeColor);
}