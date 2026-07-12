function calculateSummary() {
  const summary = document.getElementById("summary");
  if (!summary) return;
  summary.innerHTML = "";

  const ledger = {};
  people.forEach((p) => {
    ledger[p] = 0;
  });

  let groupExpenseTotal = 0;

  expenses.forEach((exp) => {
    ledger[exp.payer] += exp.amount;

    exp.splitBetween.forEach((person) => {
      ledger[person] -= exp.perHead;
    });

    if (exp.splitBetween.length > 1) {
      groupExpenseTotal += exp.amount;
    }
  });

  people.forEach((person) => {
    const paid = expenses
      .filter((e) => e.payer === person)
      .reduce((sum, e) => sum + e.amount, 0);

    const spend = expenses.reduce((sum, e) => sum + (e.splitBetween.includes(person) ? e.perHead : 0), 0);

    const balance = ledger[person];

    summary.innerHTML += `
      <div class="summary-card">
        <h3>${person}</h3>
        <p><strong>Money Paid:</strong> ₹${paid.toFixed(2)}</p>
        <p><strong>Spend:</strong> ₹${spend.toFixed(2)}</p>
        <p>
          <strong>Balance:</strong>
          <span class="${balance >= 0 ? "receive" : "pay"}">
            ${balance >= 0 ? `Receive ₹${balance.toFixed(2)}` : `Pay ₹${Math.abs(balance).toFixed(2)}`}
          </span>
        </p>
      </div>
    `;
  });

  const groupTotalEl = document.getElementById("groupTotal");
  if (groupTotalEl) groupTotalEl.textContent = `₹${groupExpenseTotal.toFixed(2)}`;

  renderSettlements(ledger);
  renderCharts();
  updateTopStats();
}