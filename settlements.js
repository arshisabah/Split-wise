function renderSettlements(ledger) {
  const container = document.getElementById("settlementList");
  if (!container) return;

  container.innerHTML = "";

  const debtors = [];
  const creditors = [];

  for (const person in ledger) {
    const value = Number(ledger[person].toFixed(2));
    if (value < 0) debtors.push({ person, amount: Math.abs(value) });
    else if (value > 0) creditors.push({ person, amount: value });
  }

  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  const settlements = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    let payAmount = Math.min(debtors[i].amount, creditors[j].amount);
    payAmount = Number(payAmount.toFixed(2));

    if (payAmount > 0) {
      settlements.push({
        from: debtors[i].person,
        to: creditors[j].person,
        amount: payAmount,
      });
    }

    debtors[i].amount = Number((debtors[i].amount - payAmount).toFixed(2));
    creditors[j].amount = Number((creditors[j].amount - payAmount).toFixed(2));

    if (debtors[i].amount <= 0) i++;
    if (creditors[j].amount <= 0) j++;
  }

  if (settlements.length === 0) {
    container.innerHTML = `<p class="empty-text">No pending settlements. All settled up ✅</p>`;
    return;
  }

  settlements.forEach((s) => {
    container.innerHTML += `
      <div class="settle-item">
        <strong>${s.from}</strong> pays <strong>₹${s.amount.toFixed(2)}</strong> to <strong>${s.to}</strong>
      </div>
    `;
  });
}