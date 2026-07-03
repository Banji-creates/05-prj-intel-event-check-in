const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendName");
const teamSelect = document.getElementById("teamSelect");

//Track attendance
let count = 0;
const maxCount = 50;

//Handle Form Submission
form.addEventListener ("Submit", function (event) {
  event.preventDefault();

//Get form value
const name = nameInput.value;
const team = teamSelect.value;
const teamName = teamSelect.selectedOptions[0].text;

console.log(name, teamName);

//Increment count
count++
console.log("Total check-ins: ", count);

//update progress bar
const percentage = Math.round((count / maxCount ) * 100) + "%";
console.log(`Progress: ${percentage}`);

//update team counter
const teamCounter = document.getElementById(team + "count");
teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

//Show Welcome Message
const message = `🎉welcome, ${name} from ${teamName}`;
console.log(message);

form.reset();

});