function showCreateBookForm() {
    const form = document.createElement('form');
    
    const fields = [
        { type : "text", name : "id", placeholder : "ID" },
        { type : "text", name : "title", placeholder : "Title" },
        { type : "text", name : "author", placeholder : "Author" },
        { type : "number", name : "year", placeholder : "Year" }
    ];

    fields.forEach((field) => {
        const input = document.createElement('input');
        input.type = field.type;
        input.name = field.name;
        input.placeholder = field.placeholder;
        input.required = true;
        form.appendChild(input);
    });

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Add Book';
    form.appendChild(button);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const book = Object.fromEntries(new FormData(form).entries());
        localStorage.setItem(book.id, JSON.stringify(book));
        getBooksFromLocalStorage();
    });

    const formContainer = document.getElementById('formContainer');
    formContainer.innerHTML = '';
    formContainer.appendChild(form);
}

function showUpdateBookForm(id) {
    const form = document.createElement('form');
    
    const fields = [
        { type : "text", name : "title", placeholder : "Title" },
        { type : "text", name : "author", placeholder : "Author" },
        { type : "number", name : "year", placeholder : "Year" }
    ];

    const book = JSON.parse(localStorage.getItem(id));

    fields.forEach((field) => {
        const input = document.createElement('input');
        input.type = field.type;
        input.name = field.name;
        input.placeholder = field.placeholder;
        input.value = book[field.name];
        input.required = true;
        form.appendChild(input);
    });

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Update Book';
    form.appendChild(button);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const book = Object.fromEntries(new FormData(form).entries());
        book.id = id;
        localStorage.setItem(id, JSON.stringify(book));
        getBooksFromLocalStorage();
    });

    const formContainer = document.getElementById('formContainer');
    formContainer.innerHTML = '';
    formContainer.appendChild(form);
}

function getBooksFromLocalStorage() {
    const books = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const book = JSON.parse(localStorage.getItem(key));
        books.push(book);
    }
    
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    books.forEach((book) => {
        const row = document.createElement('tr');
        row.innerHTML = '<td>' + book.title + '</td><td>' + book.author + '</td><td>' + book.year + 
        '</td><td><button onclick="showUpdateBookForm(\'' + book.id + '\')">Update</button></td><td><button onclick="deleteBook(\'' + book.id + '\')">Delete</button></td>';
        tableBody.appendChild(row);
    });
}

function deleteBook(id) {
    localStorage.removeItem(id);
    getBooksFromLocalStorage();
}