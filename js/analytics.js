function renderCharts() {
  renderPersonChart();
  renderCategoryChart();
}

function renderPersonChart() {
  const canvas = document.getElementById("personChart");
  if (!canvas || typeof Chart === "undefined") return;

  const spendByPerson = {};
  people.forEach((p) => {
    spendByPerson[p] = 0;
  });

  expenses.forEach((e) => {
    const members = Array.isArray(e.splitBetween) ? e.splitBetween : [];
    if (!members.length) return;

    const perHead =
      typeof e.perHead === "number" && !Number.isNaN(e.perHead) ? e.perHead : e.amount / members.length;

    members.forEach((member) => {
      if (spendByPerson[member] === undefined) spendByPerson[member] = 0;
      spendByPerson[member] += perHead;
    });
  });

  const labels = Object.keys(spendByPerson);
  const data = labels.map((p) => Number(spendByPerson[p].toFixed(2)));

  if (personChartInstance) personChartInstance.destroy();

  personChartInstance = new Chart(canvas.getContext("2d"), {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Amount Spent (₹)",
          data,
          backgroundColor: "#22c55e",
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true } },
      scales: { y: { beginAtZero: true } },
    },
  });
}

function renderCategoryChart() {
  const canvas = document.getElementById("categoryChart");
  if (!canvas || typeof Chart === "undefined") return;

  const spendByCategory = {};
  expenses.forEach((e) => {
    spendByCategory[e.category] = (spendByCategory[e.category] || 0) + e.amount;
  });

  const labels = Object.keys(spendByCategory);
  const data = labels.map((c) => Number(spendByCategory[c].toFixed(2)));

  if (categoryChartInstance) categoryChartInstance.destroy();

  categoryChartInstance = new Chart(canvas.getContext("2d"), {
    type: "pie",
    data: {
      labels,
      datasets: [
        {
          label: "Category Spend",
          data,
          backgroundColor: ["#60a5fa", "#34d399", "#fbbf24", "#f87171", "#a78bfa", "#fb923c"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom" } },
    },
  });
}