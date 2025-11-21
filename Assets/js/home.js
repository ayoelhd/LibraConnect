const featuredBooks = [
    {
        title: "The Silent Library",
        author: "Mark Jenson",
        image: "assets/images/book1.jpg",
        description: "A mysterious story inside an abandoned library. A full description goes here..."
    },
    {
        title: "Digital Wisdom",
        author: "Sarah Milton",
        image: "assets/images/book2.jpg",
        description: "A journey through the world of data and AI. This is the full description..."
    },
    {
        title: "Lost Pages",
        author: "Tom Richards",
        image: "assets/images/book3.jpg",
        description: "An adventure where every page hides a clue that leads to another mystery..."
    }
];

const container = document.getElementById("featuredBooks");

// Render cards (no Read More yet)
featuredBooks.forEach((book, index) => {
    container.innerHTML += `
        <div class="col-md-4 mb-3">
            <div class="card shadow">
                <img src="${book.image}" class="card-img-top" alt="${book.title}">
                <div class="card-body">
                    <h4>${book.title}</h4>
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p id="desc-${index}">
                        ${book.description.substring(0, 50)}...
                    </p>
                </div>
            </div>
        </div>
    `;
});

// Add Read More / Read Less button + interaction
featuredBooks.forEach((book, index) => {
    const cardBody = document.getElementsByClassName("card-body")[index];

    // Add button
    const btn = document.createElement("button");
    btn.className = "btn btn-primary btn-sm";
    btn.textContent = "Read More";
    cardBody.appendChild(btn);

    const desc = document.getElementById(`desc-${index}`);

    btn.addEventListener("click", () => {
        if (btn.textContent === "Read More") {
            desc.textContent = book.description;
            btn.textContent = "Read Less";
        } else {
            desc.textContent = book.description.substring(0, 50) + "...";
            btn.textContent = "Read More";
        }
    });
});
