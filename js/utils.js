function updateTopStats() {
  const memberCount = document.getElementById("memberCount");
  const expenseCount = document.getElementById("expenseCount");

  if (memberCount) memberCount.textContent = people.length;
  if (expenseCount) expenseCount.textContent = expenses.length;
}