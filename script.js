const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendName");
const teamSelect = document.getElementById("teamSelect");

// Load saved attendance count
let count = localStorage.getItem("attendanceCount")
  ? parseInt(localStorage.getItem("attendanceCount"))
  : 0;

// Update attendance display
document.getElementById("attendeeCount").textContent = count;

// Load saved team counts
const teams = ["water", "zero", "power"];

teams.forEach(team => {
  const savedCount = localStorage.getItem(team + "Count") || 0;
  document.getElementById(team + "Count").textContent = savedCount;
});

//Track attendance
count++
const maxCount = 50;

//Handle Form Submission
form.addEventListener ("submit", function (event) {
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
const teamCounter = document.getElementById(team + "Count");
const newTeamCount = parseInt(teamCounter.textContent) + 1;

teamCounter.textContent = newTeamCount;

// Save to localStorage
localStorage.setItem("attendanceCount", count);
const progress = (count / maxCount) * 100;
document.getElementById("progressBar").style.width = progress + "%";

//Show Welcome Message
const message = `🎉welcome, ${name} from ${teamName}`;
console.log(message);

//Show Celebration Message
const celebrationMessage = document.getElementById("celebrationMessage");
celebrationMessage.textContent = `🎉 Congratulations ${winningTeam}! You won with ${highest} attendees! 🏆`;
celebration.style.display = "block";

form.reset();

});