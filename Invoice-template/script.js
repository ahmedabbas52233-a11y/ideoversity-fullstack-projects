function calc() {
  const rows = document.querySelectorAll('#itemsBody tr');
  let sub = 0;
  rows.forEach(row => {
    const qty = parseFloat(row.cells[2].innerText) || 0;
    const rate = parseFloat(row.cells[3].innerText) || 0;
    const amt = qty * rate;
    row.cells[4].innerText = amt.toFixed(2);
    sub += amt;
  });
  
  const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
  const tax = sub * (taxRate / 100);
  const total = sub + tax;
  
  document.getElementById('taxDisplay').innerText = taxRate + '%';
  document.getElementById('subtotal').innerText = '$' + sub.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  document.getElementById('tax').innerText = '$' + tax.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  document.getElementById('total').innerText = '$' + total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  document.getElementById('due').innerText = '$' + total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

function addRow() {
  const tbody = document.getElementById('itemsBody');
  const tr = document.createElement('tr');
  tr.innerHTML = `<td contenteditable="true">New Item</td><td contenteditable="true">Description</td><td contenteditable="true" class="num" oninput="calc()">1</td><td contenteditable="true" class="num" oninput="calc()">0</td><td class="amount">0.00</td><td><button class="remove-btn" onclick="removeRow(this)">×</button></td>`;
  tbody.appendChild(tr);
  calc();
}

function removeRow(btn) {
  btn.closest('tr').remove();
  calc();
}

function resetInvoice() {
  if (confirm('Reset to default template?')) location.reload();
}

calc();