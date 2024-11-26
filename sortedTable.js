// Initial table data
const people = [
    { firstName: "Damien", lastName: "Smith", age: 40, city: "Springfield" },
    { firstName: "Anna", lastName: "Johnson", age: 49, city: "Shelbyville" },
    { firstName: "Achilles", lastName: "Brown", age: 31, city: "Capital City" },
    { firstName: "Elton", lastName: "Doe", age: 25, city: "Ogdenville" },
    { firstName: "Maria", lastName: "Gonzalez", age: 35, city: "North Haverbrook" },
    { firstName: "James", lastName: "Taylor", age: 28, city: "Springfield" },
    { firstName: "Sophie", lastName: "Wilson", age: 42, city: "Shelbyville" },
    { firstName: "John", lastName: "Adams", age: 55, city: "Capital City" }
];

let selectedColumn = null;
let selectedOrder = 'asc';

// Function to render the table
function renderTable(data) {
    const tableBody = document.querySelector('#peopleTable tbody');
    tableBody.innerHTML = '';
    data.forEach((person) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${person.firstName}</td>
            <td>${person.lastName}</td>
            <td>${person.age}</td>
            <td>${person.city}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to sort the data
function sortBy(column, order) {
    return people.slice().sort((a, b) => {
        if (a[column] < b[column]) return order === 'asc' ? -1 : 1;
        if (a[column] > b[column]) return order === 'asc' ? 1 : -1;
        return 0;
    });
}

// Handle the click on the table header
function headerClick(event) {
    const column = event.target.getAttribute('data-column');
    if (selectedColumn === column) {
        selectedOrder = selectedOrder === 'asc' ? 'desc' : 'asc';
    } else {
        selectedColumn = column;
        selectedOrder = 'asc';
    }
    const sortedData = sortBy(selectedColumn, selectedOrder);
    renderTable(sortedData);
    updateHeaders();
}

// Update header icons (arrows)
function updateHeaders() {
    document.querySelectorAll('th').forEach((th) => {
        th.classList.remove('asc', 'desc', 'active');
        if (th.getAttribute('data-column') === selectedColumn) {
            th.classList.add(selectedOrder, 'active');
        }
    });
}

// Add events to the headers
document.querySelectorAll('th').forEach((th) => {
    th.addEventListener('click', headerClick);
});

// Initialize the table
renderTable(people);
