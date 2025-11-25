let selectedBooks = JSON.parse(localStorage.getItem('selectedBooks')) || [];

    const container = document.getElementById("historyContainer");

    if (selectedBooks.length === 0) {
        container.innerHTML = '<p class="text-center">You have no borrowed books yet.</p>';
    } else {
        selectedBooks.forEach(book => {
            // Calculate fine ($1/day overdue)
            const today = new Date();
            const dueDate = new Date(book.dueDate);
            let fine = 0;
            if (today > dueDate) {
                const diffTime = Math.abs(today - dueDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                fine = diffDays;
            }

            const cardCol = document.createElement("div");
            cardCol.className = "col-12 col-md-6 col-lg-4";

            cardCol.innerHTML = `
                <div class="card shadow h-100">
                    <img src="${book.image}" class="card-img-top book-img" alt="${book.title} cover">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p><strong>Date Borrowed:</strong> ${book.dateBorrowed}</p>
                        <p><strong>Due Date:</strong> ${book.dueDate}</p>
                        <p><strong>Fine:</strong> $${fine}</p>
                    </div>
                </div>
            `;

            container.appendChild(cardCol);
        });
    }

function loadInclude(id, file) {
            fetch(file)
                .then(response => response.text())
                .then(data => document.getElementById(id).innerHTML = data);
        }

        loadInclude("header", "includes/header.html");
        loadInclude("menu", "includes/menu.html");
        loadInclude("footer", "includes/footer.html");