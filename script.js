const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

const maxCount = 50;

// ----------------------
// LOAD DATA
// ----------------------

// total attendance
let count = localStorage.getItem("attendanceCount")
  ? parseInt(localStorage.getItem("attendanceCount"))
  : 0;

document.getElementById("attendeeCount").textContent = count;

// team counts
const teams = ["water", "zero", "power"];

teams.forEach(team => {
  const saved = localStorage.getItem(team + "Count")
    ? parseInt(localStorage.getItem(team + "Count"))
    : 0;

  document.getElementById(team + "Count").textContent = saved;
});

// attendee list
let attendeeList = localStorage.getItem("attendeeList")
  ? JSON.parse(localStorage.getItem("attendeeList"))
  : [];

const listElement = document.getElementById("attendeeList");

// render function
function renderList() {
  listElement.innerHTML = "";

  attendeeList.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — ${item.team}`;
    listElement.appendChild(li);
  });
}

renderList();

// prevent multiple celebrations
let celebrationShown = localStorage.getItem("celebrationShown")
  ? true
  : false;

// ----------------------
// FORM SUBMIT
// ----------------------

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  // update total count
  count++;
  localStorage.setItem("attendanceCount", count);
  document.getElementById("attendeeCount").textContent = count;

  // progress bar update
  const progress = (count / maxCount) * 100;
  document.getElementById("progressBar").style.width = progress + "%";

  // update team count
  const teamCounter = document.getElementById(team + "Count");
  const newTeamCount = parseInt(teamCounter.textContent) + 1;

  teamCounter.textContent = newTeamCount;
  localStorage.setItem(team + "Count", newTeamCount);

  // add to attendee list
  attendeeList.push({
    name: name,
    team: teamName
  });

  localStorage.setItem("attendeeList", JSON.stringify(attendeeList));
  renderList();

  // ----------------------
  // CELEBRATION FEATURE
  // ----------------------
  if (count >= maxCount && !celebrationShown) {
    const water = parseInt(document.getElementById("waterCount").textContent);
    const zero = parseInt(document.getElementById("zeroCount").textContent);
    const power = parseInt(document.getElementById("powerCount").textContent);

    let highest = Math.max(water, zero, power);
    let winningTeam = "";

    if (highest === water) {
      winningTeam = "🌊 Team Water Wise";
    } else if (highest === zero) {
      winningTeam = "🌿 Team Net Zero";
    } else {
      winningTeam = "⚡ Team Renewables";
    }

    const celebration = document.getElementById("celebrationMessage");
    celebration.textContent =
      `🎉 Congratulations ${winningTeam}! They won with ${highest} attendees! 🏆`;

    celebration.style.display = "block";

    celebrationShown = true;
    localStorage.setItem("celebrationShown", "true");
  }

  form.reset();
});