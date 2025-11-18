//input 
const id_value = document.getElementById("id_value");
const date_value = document.getElementById("date_value");
const detail = document.getElementById("detail");
const amount = document.getElementById("amount");
const category = document.getElementById("category");

//add button
const add_btn = document.getElementById("add_btn");

//data display table
const table_data = document.getElementById("table_data");

//to store input data
let data_collection = JSON.parse(localStorage.getItem("data_collection")) || [];

//this null variable is using for give more than one eventlistener to one button
let editId = null;

/* Function to display data in the table */
function renderTable() {
  table_data.innerHTML = ""; // clear old data
  data_collection.forEach((record) => {
    table_data.innerHTML += `
      <tr>
        <td hidden>${record.id}.</td>
        <td>${record.date}</td>
        <td>${record.detail}</td>
        <td>${record.category}</td>
        <td>${record.amount}</td>
        <td onclick="edit(${record.id})" style="cursor:pointer;">
          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="blue"/>
          </svg>
        </td>
        <td onclick="deleteRecord(${record.id})" style="cursor:pointer;">
          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.0004 9.5L17.0004 14.5M17.0004 9.5L12.0004 14.5M4.50823 13.9546L7.43966 17.7546C7.79218 18.2115 7.96843 18.44 8.18975 18.6047C8.38579 18.7505 8.6069 18.8592 8.84212 18.9253C9.10766 19 9.39623 19 9.97336 19H17.8004C18.9205 19 19.4806 19 19.9084 18.782C20.2847 18.5903 20.5907 18.2843 20.7824 17.908C21.0004 17.4802 21.0004 16.9201 21.0004 15.8V8.2C21.0004 7.0799 21.0004 6.51984 20.7824 6.09202C20.5907 5.71569 20.2847 5.40973 19.9084 5.21799C19.4806 5 18.9205 5 17.8004 5H9.97336C9.39623 5 9.10766 5 8.84212 5.07467C8.6069 5.14081 8.38579 5.2495 8.18975 5.39534C7.96843 5.55998 7.79218 5.78846 7.43966 6.24543L4.50823 10.0454C3.96863 10.7449 3.69883 11.0947 3.59505 11.4804C3.50347 11.8207 3.50347 12.1793 3.59505 12.5196C3.69883 12.9053 3.96863 13.2551 4.50823 13.9546Z" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </td>
      </tr>
    `;
  });
}

//add & update income value
const income_amount = document.getElementById("income_amount");
let income_value = Number(localStorage.getItem("income_value")) || 0;
income_amount.innerText = income_value;

function income_total_value(new_amount){
    if(category.value === "Income"){
        new_amount = income_value + Number(new_amount);
        income_value = new_amount;
        income_amount.innerText = income_value;
        localStorage.setItem("income_value", income_value);
    }
}

let income_changed_value = 0;
function income_add_sub(changed_amount){
    if(changed_amount < income_changed_value){
        changed_amount = income_changed_value - Number(changed_amount);
        income_value = income_value - Number(changed_amount);
        income_amount.innerText = income_value;       
    }
    if(changed_amount > income_changed_value){
        changed_amount = Number(changed_amount) - income_changed_value;
        income_value = income_value + Number(changed_amount);
        income_amount.innerText = income_value;  
    }
    localStorage.setItem("income_value", income_value);
}

//add & update only expense value
const expense_amount = document.getElementById("expense_amount");
let expense_value = Number(localStorage.getItem("expense_value")) || 0;
expense_amount.innerText = expense_value;

function expense_total_value(new_amount){
    if(category.value === "Expense"){
        new_amount = expense_value + Number(new_amount);
        expense_value = new_amount;
        expense_amount.innerText = expense_value;
        localStorage.setItem("expense_value", expense_value);
    }
}

let expense_changed_value = 0;
function expense_add_sub(changed_amount){
    if(changed_amount < expense_changed_value){
        changed_amount = expense_changed_value - Number(changed_amount);
        expense_value = expense_value - Number(changed_amount);
        expense_amount.innerText = expense_value;
    }
    if(changed_amount > expense_changed_value){
        changed_amount = Number(changed_amount) - expense_changed_value;
        expense_value = expense_value + Number(changed_amount);
        expense_amount.innerText = expense_value;  
    }
    localStorage.setItem("expense_value", expense_value);
}

//balance value
const balance_amount = document.getElementById("balance_amount");
let current_value = 0;
function current_total_value(){
    current_value = income_value - expense_value;
    balance_amount.innerText = current_value;
    localStorage.setItem("current_value", current_value);
}

/**  Add and Update eventlistener */
add_btn.addEventListener("click", (e) => {
  e.preventDefault();

  let updated_id = Number(id_value.value);
  let update_date = date_value.value;
  let update_detail = detail.value;
  let update_category = category.value;
  let update_amount = amount.value;

  if(update_date === '' || update_detail === '' || update_category === '' || update_amount === ''){
    return;
  }

  if (editId === null) {
    let array_data = {
      id: data_collection.length+1,
      date: update_date,
      detail: update_detail,
      category: update_category,
      amount: update_amount,
    };

    if(update_category === "Income"){
        income_total_value(update_amount);
    }
    if(update_category === "Expense"){
        expense_total_value(update_amount);
    }
    current_total_value();
    data_collection.push(array_data);
  } 
  else {
    let index_value = data_collection.findIndex((record) => record.id === editId);
    data_collection[index_value] = {
      id: updated_id,
      date: update_date,
      detail: update_detail,
      category: update_category,
      amount: update_amount,
    };

    if(update_category === "Income"){
        income_add_sub(update_amount);
    }
    if(update_category === "Expense"){
        expense_add_sub(update_amount);
    }
    current_total_value();
    add_btn.textContent = "Add";
    editId = null;
  }
  // Save updated array to localStorage
  localStorage.setItem("data_collection", JSON.stringify(data_collection));

  renderTable();
  id_value.value = '';
  detail.value = '';
  date_value.value = '';
  category.value = '';
  amount.value = '';
});

/** Edit function */
function edit(id) {
  let obj = data_collection.find((record) => record.id === id);
  id_value.value = obj.id;
  date_value.value = obj.date;
  detail.value = obj.detail;
  category.value = obj.category;
  amount.value = obj.amount;
  add_btn.textContent = "Save";
  editId = obj.id;
  income_changed_value = obj.amount;
  expense_changed_value = obj.amount;
}

/** Delete data */
function deleteRecord(id) {
  // Find the record being deleted
  let deletedRecord = data_collection.find((record) => record.id === id);

  if (!deletedRecord) return;

  // Adjust income / expense totals
  if (deletedRecord.category === "Income") {
    income_value -= Number(deletedRecord.amount);
    income_amount.innerText = income_value;
    localStorage.setItem("income_value", income_value);
  }

  if (deletedRecord.category === "Expense") {
    expense_value -= Number(deletedRecord.amount);
    expense_amount.innerText = expense_value;
    localStorage.setItem("expense_value", expense_value);
  }

  // Recalculate current balance
  current_total_value();

  // Remove record from array
  data_collection = data_collection.filter((record) => record.id !== id);

  // Save updated array
  localStorage.setItem("data_collection", JSON.stringify(data_collection));

  // Re-render table
  renderTable();
}

/* Load existing data when page reloads */
window.onload = () => {
  renderTable();
  income_amount.innerText = localStorage.getItem("income_value") || 0;
  expense_amount.innerText = localStorage.getItem("expense_value") || 0;
  balance_amount.innerText = localStorage.getItem("current_value") || 0;
};