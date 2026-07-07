function addExpense() {
  if (people.length === 0) {
    alert("Add people first");
    return;
  }

  const payer = document.getElementById("paidBy")?.value;
  const amount = parseFloat(document.getElementById("expenseAmount")?.value);
  const category = document.getElementById("expenseCategory")?.value;
  const note = document.getElementById("expenseNote")?.value.trim() || "";
  const splitType = document.getElementById("splitType")?.value;

  if (!payer) {
    alert("Select the person who paid");
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    alert("Enter a valid amount");
    return;
  }

  let splitBetween = [];

  if (splitType === "group") {
    splitBetween = [...people];
  } else if (splitType === "self") {
    splitBetween = [payer];
  } else if (splitType === "custom") {
    splitBetween = getSelectedCustomPeople();
    if (splitBetween.length === 0) {
      alert("Select at least one person for custom split");
      return;
    }
    if (!splitBetween.includes(payer)) splitBetween.push(payer);
  } else {
    splitBetween = [...people];
  }

  const perHead = amount / splitBetween.length;

  expenses.push({
    payer,
    amount,
    category,
    note,
    splitType,
    splitBetween,
    perHead,
    createdAt: new Date().toISOString(),
  });

  // reset form fields
  const amountEl = document.getElementById("expenseAmount");
  const noteEl = document.getElementById("expenseNote");
  const splitTypeEl = document.getElementById("splitType");

  if (amountEl) amountEl.value = "";
  if (noteEl) noteEl.value = "";
  if (splitTypeEl) splitTypeEl.value = "group";

  handleSplitTypeChange();

  document.querySelectorAll(".customPerson").forEach((c) => (c.checked = false));

  displayExpenses();
  calculateSummary();
  updateTopStats();
}

function displayExpenses() {
  const tbody = document.getElementById("expenseTable");
  if (!tbody) return;
  tbody.innerHTML = "";

  const filterPerson = document.getElementById("filterPerson")?.value || "All";
  const filterCategory = document.getElementById("filterCategory")?.value || "All";

  const filtered = expenses.filter((exp) => {
    const personMatch = filterPerson === "All" || exp.payer === filterPerson;
    const categoryMatch = filterCategory === "All" || exp.category === filterCategory;
    return personMatch && categoryMatch;
  });

  filtered.forEach((exp) => {
    const splitLabel =
      exp.splitType === "group" ? "Whole Group" :
      exp.splitType === "self" ? "Only Me" : "Custom";

    tbody.innerHTML += `
      <tr>
        <td>${exp.payer}</td>
        <td>${exp.category}</td>
        <td>₹${exp.amount.toFixed(2)}</td>
        <td>${splitLabel}</td>
        <td>${exp.splitBetween.join(", ")}</td>
        <td>₹${exp.perHead.toFixed(2)}</td>
        <td>${exp.note || "-"}</td>
      </tr>
    `;
  });
}