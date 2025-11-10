// Select elements
const expenseForm = document.getElementById("expenseForm");
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");

const filterCategory = document.getElementById("filterCategory");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");

const expenseBody = document.getElementById("expenseBody");
const totalExpenseEl = document.getElementById("totalExpense");
const highestExpenseEl = document.getElementById("highestExpense");
const lowestExpenseEl = document.getElementById("lowestExpense");

const chartCanvas = document.getElementById("expenseChart");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let chart;

// Add Expense
expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const category = categoryInput.value;
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;

    if (!category || !amount || !date) return;

    const expense = {
        id: Date.now(),
        category,
        amount,
        date,
    };

    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    expenseForm.reset();
    updateUI();
});

// Delete Expense
function deleteExpense(id) {
    expenses = expenses.filter(e => e.id !== id);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    updateUI();
}

// Filters
function getFilteredExpenses() {
    let filtered = [...expenses];

    const category = filterCategory.value;
    const start = startDateInput.value;
    const end = endDateInput.value;

    if (category) {
        filtered = filtered.filter(e => e.category === category);
    }

    if (start) {
        filtered = filtered.filter(e => e.date >= start);
    }

    if (end) {
        filtered = filtered.filter(e => e.date <= end);
    }

    return filtered;
}

// Render Table
function renderTable(data) {
    expenseBody.innerHTML = "";

    if (data.length === 0) {
        expenseBody.innerHTML = `<tr><td colspan="4" class="no-data">No expenses found for the selected filters.</td></tr>`;
        return;
    }

    data.forEach(exp => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${exp.date}</td>
            <td>${exp.category}</td>
