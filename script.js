const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

const maxCount = 50;

// Load saved attendance count
let count = localStorage.getItem("attendanceCount")
  ? parseInt(localStorage.getItem("attendanceCount"))
  : 0;

document.getElementById("attendeeCount").textContent = count;

// Load saved team counts
const teams = ["water", "zero", "power"];

teams.forEach(team => {
  const savedCount = localStorage.getItem(team + "Count")
    ? parseInt(localStorage.getItem(team + "Count"))
    : 0;

  document.getElementById(team + "Count").textContent = savedCount;
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  // Increment total count
  count++;
  localStorage.setItem("attendanceCount", count);

  document.getElementById("attendeeCount").textContent = count;

  // Update progress bar
  const progress = (count / maxCount) * 100;
  document.getElementById("progressBar").style.width = progress + "%";

  // Update team count
  const teamCounter = document.getElementById(team + "Count");
  const newTeamCount = parseInt(teamCounter.textContent) + 1;

  teamCounter.textContent = newTeamCount;
  localStorage.setItem(team + "Count", newTeamCount);

  console.log(`🎉 welcome ${name} from ${teamName}`);

  // 🎉 CELEBRATION LOGIC
  if (count >= maxCount) {
    const water = parseInt(document.getElementById("waterCount").textContent);
    const zero = parseInt(document.getElementById("zeroCount").textContent);
    const power = parseInt(document.getElementById("powerCount").textContent);

    let highest = Math.max(water, zero, power);
    let winningTeam = "";

    if (highest === water) {
      winningTeam = "Team Water Wise 🌊";
    } else if (highest === zero) {
      winningTeam = "Team Net Zero 🌿";
    } else {
      winningTeam = "Team Renewables ⚡";
    }

    const celebrationMessage = document.getElementById("celebrationMessage");
    celebrationMessage.textContent =
      `🎉 Congratulations ${winningTeam}! You won with ${highest} attendees! 🏆`;

    celebrationMessage.style.display = "block";
  }

  form.reset();
});