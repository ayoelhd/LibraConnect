// Sample Book Data
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

const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const borrowBtn = document.getElementById("borrowBtn");
const message = document.getElementById("message");

// Display books
function displayBooks(filteredBooks) {
    bookList.innerHTML = "";

    if (filteredBooks.length === 0) {
        bookList.innerHTML = `<p class='text-center'>No books found.</p>`;
        return;
    }

    filteredBooks.forEach((book, index) => {
        bookList.innerHTML += `
            <div class="col-md-3">
                <div class="card h-100 shadow-sm">
                    <img src="${book.img}" class="card-img-top" alt="${book.title}">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="text-muted">${book.author}</p>
                        <span class="badge bg-primary text-capitalize">${book.genre}</span>
                        <div class="form-check mt-2">
                            <input type="checkbox" class="form-check-input borrow-check" data-index="${index}">
                            <label class="form-check-label">Borrow</label>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

// Filter function
function updateList() {
    const query = searchInput.value.toLowerCase();
    const genre = genreFilter.value;

    const filtered = books.filter(book =>
        (book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)) &&
        (genre === "all" || book.genre === genre)
    );

    displayBooks(filtered);
}

// Borrow button logic
borrowBtn.addEventListener("click", () => {
    const checked = document.querySelectorAll(".borrow-check:checked");

    if (checked.length === 0) {
        message.textContent = "Please select at least one book to borrow.";
        message.classList.remove("text-success");
        message.classList.add("text-danger");
        return;
    }

    // Get current borrowed books from localStorage
    let borrowedBooks = JSON.parse(localStorage.getItem("selectedBooks")) || [];

    // Add newly borrowed books
    Array.from(checked).forEach(chk => {
        const book = books[chk.dataset.index];
        const borrowedBook = {
            title: book.title,
            author: book.author,
            genre: book.genre,
            image: book.img, // use 'image' for borrow history page
            dateBorrowed: new Date().toLocaleDateString(),
            dueDate: new Date(Date.now() + 14*24*60*60*1000).toLocaleDateString() // 2 weeks from now
        };
        borrowedBooks.push(borrowedBook);
    });

    // Save updated list back to localStorage
    localStorage.setItem("selectedBooks", JSON.stringify(borrowedBooks));

    // Confirmation message
    const borrowedTitles = Array.from(checked).map(chk => books[chk.dataset.index].title);
    message.textContent = `You borrowed: ${borrowedTitles.join(", ")}`;
    message.classList.remove("text-danger");
    message.classList.add("text-success");

    // Uncheck all checked boxes
    checked.forEach(chk => chk.checked = false);
});

// Event Listeners
searchInput.addEventListener("input", updateList);
genreFilter.addEventListener("change", updateList);

// Initial load
displayBooks(books);
