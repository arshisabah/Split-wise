function addPerson() {
  const input = document.getElementById("personName");
  const name = input.value.trim();

  if (!name) {
    alert("Please enter a name");
    return;
  }

  const exists = people.some((p) => p.toLowerCase() === name.toLowerCase());
  if (exists) {
    alert("Person already exists");
    return;
  }

  people.push(name);
  input.value = "";
  updatePeople();
}

function updatePeople() {
  const paid = document.getElementById("paidBy");
  const filter = document.getElementById("filterPerson");

  paid.innerHTML = "";
  filter.innerHTML = "<option value='All'>All People</option>";

  people.forEach((person) => {
    paid.innerHTML += `<option value="${person}">${person}</option>`;
    filter.innerHTML += `<option value="${person}">${person}</option>`;
  });

  renderCustomPeopleOptions();
  displayExpenses();
  calculateSummary();
  updateTopStats();
}

function renderCustomPeopleOptions() {
  const box = document.getElementById("customPeopleList");
  if (!box) return;

  box.innerHTML = "";

  people.forEach((person) => {
    box.innerHTML += `
      <label class="checkbox-item">
        <input type="checkbox" class="customPerson" value="${person}" />
        ${person}
      </label>
    `;
  });
}

function handleSplitTypeChange() {
  const splitType = document.getElementById("splitType")?.value;
  const customBox = document.getElementById("customPeopleBox");
  if (!customBox) return;

  if (splitType === "custom") customBox.classList.remove("hidden");
  else customBox.classList.add("hidden");
}

function getSelectedCustomPeople() {
  const checks = document.querySelectorAll(".customPerson:checked");
  return Array.from(checks).map((c) => c.value);
}