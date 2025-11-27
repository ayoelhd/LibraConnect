// ================= SAMPLE BOOK DATA =================
const books = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "classic", img: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg" },
    { title: "1984", author: "George Orwell", genre: "fiction", img: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg" },
    { title: "Sherlock Holmes", author: "Arthur Conan Doyle", genre: "mystery", img: "https://m.media-amazon.com/images/I/51071nF0pTL._AC_UF1000,1000_QL80_.jpg" },
    { title: "Harry Potter", author: "J.K. Rowling", genre: "fantasy", img: "https://covers.openlibrary.org/b/isbn/9780439708180-L.jpg" },

    { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "classic", img: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg" },
    { title: "Brave New World", author: "Aldous Huxley", genre: "fiction", img: "https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg" },
    { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "fantasy", img: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg" },
    { title: "The Da Vinci Code", author: "Dan Brown", genre: "mystery", img: "https://covers.openlibrary.org/b/isbn/9780307474278-L.jpg" },

    { title: "Pride and Prejudice", author: "Jane Austen", genre: "classic", img: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg" },
    { title: "The Alchemist", author: "Paulo Coelho", genre: "fiction", img: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg" },
    { title: "Percy Jackson", author: "Rick Riordan", genre: "fantasy", img: "https://covers.openlibrary.org/b/isbn/9780786838653-L.jpg" },
    { title: "Gone Girl", author: "Gillian Flynn", genre: "mystery", img: "https://covers.openlibrary.org/b/isbn/9780307588371-L.jpg" }
];


// ================= DOM ELEMENTS =================
const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const borrowBtn = document.getElementById("borrowBtn");
const message = document.getElementById("message");


// ================= DISPLAY BOOKS =================
function displayBooks(filteredBooks) {
    bookList.innerHTML = "";

    if (filteredBooks.length === 0) {
        bookList.innerHTML = `<p class='text-center'>No books found.</p>`;
        return;
    }

    filteredBooks.forEach((book, index) => {
        bookList.innerHTML += `
            <div class="col-md-3">
                <div class="card h-100 shadow-sm book-card">
                    <img src="${book.img}" class="card-img-top" alt="${book.title}">
                    <div class="card-body">
                        <h5 class="card-title book-title">${book.title}</h5>
                        <p class="text-muted">${book.author}</p>
                        <span class="badge bg-primary text-capitalize">${book.genre}</span>

                        <div class="form-check mt-3">
                            <input type="checkbox" class="form-check-input borrow-check" data-index="${index}">
                            <label class="form-check-label">Borrow</label>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    // Reattach checkbox listeners
    attachCheckboxEvents();
}


// ================= FILTER FUNCTION =================
function updateList() {
    const query = searchInput.value.toLowerCase();
    const genre = genreFilter.value;

    const filtered = books.filter(book =>
        (book.title.toLowerCase().includes(query) ||
         book.author.toLowerCase().includes(query)) &&
        (genre === "all" || book.genre === genre)
    );

    displayBooks(filtered);
}


// ================= CHECKBOX CHANGE EVENT =================
function attachCheckboxEvents() {
    const checkboxes = document.querySelectorAll(".borrow-check");

    checkboxes.forEach(chk => {
        chk.addEventListener("change", () => {
            const card = chk.closest(".card");

            // Toggle highlight
            card.classList.toggle("book-selected", chk.checked);

            // Update selected count message
            const selectedCount = document.querySelectorAll(".borrow-check:checked").length;
            message.textContent = `Selected books: ${selectedCount}`;
            message.classList.add("text-info");
        });
    });
}


// ================= BORROW BUTTON =================
borrowBtn.addEventListener("click", () => {
    const checked = document.querySelectorAll(".borrow-check:checked");

    if (checked.length === 0) {
        message.textContent = "Please select at least one book to borrow.";
        message.classList.remove("text-success");
        message.classList.add("text-danger");
        return;
    }

    let borrowedBooks = JSON.parse(localStorage.getItem("selectedBooks")) || [];

    checked.forEach(chk => {
        const book = books[chk.dataset.index];

        const borrowedBook = {
            title: book.title,
            author: book.author,
            genre: book.genre,
            image: book.img,
            dateBorrowed: new Date().toLocaleDateString(),
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()
        };

        borrowedBooks.push(borrowedBook);
    });

    localStorage.setItem("selectedBooks", JSON.stringify(borrowedBooks));

    // Success message
    message.textContent = `You borrowed: ${Array.from(checked).map(c => books[c.dataset.index].title).join(", ")}`;
    message.classList.remove("text-danger");
    message.classList.add("text-success");

    // ============================
    // Uncheck AND Unhighlight all
    // ============================
    checked.forEach(chk => {
        const card = chk.closest(".card");
        chk.checked = false;
        card.classList.remove("book-selected");
    });

    // Reset selected count
    message.textContent += " ✓";
});


// ================= EVENT LISTENERS =================
searchInput.addEventListener("input", updateList);
genreFilter.addEventListener("change", updateList);

// Initial display
displayBooks(books);


// ================= INCLUDE HTML PARTIALS =================
function loadInclude(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => document.getElementById(id).innerHTML = data);
}

loadInclude("header", "includes/header.html");
loadInclude("menu", "includes/menu.html");
loadInclude("footer", "includes/footer.html");
