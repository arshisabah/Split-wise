document.addEventListener("DOMContentLoaded", () => {
  const personInput = document.getElementById("personName");
  if (personInput) {
    personInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") addPerson();
    });
  }

  handleSplitTypeChange();
  updateTopStats();
});