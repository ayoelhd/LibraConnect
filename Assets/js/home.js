// ===========================
// Featured Books Data
// ===========================
const books = [
    {
        title: "The Silent Forest",
        author: "John Mason",
        description: "A thrilling mystery novel about a detective who uncovers secrets hidden deep within an ancient forest.",
        image: "assets/images/book1.jpg"
    },
    {
        title: "The Lost City",
        author: "Sarah Collins",
        description: "An adventure story following a group of explorers searching for a forgotten city buried under desert sands.",
        image: "assets/images/book2.jpg"
    },
    {
        title: "Beyond the Stars",
        author: "Michael Turner",
        description: "A sci-fi journey through galaxies as a crew faces strange creatures and uncovers cosmic mysteries.",
        image: "assets/images/book3.jpg"
    }
];

// ===========================
// Render Books in Responsive Cards
// ===========================
const container = document.getElementById("featuredBooks");

books.forEach(book => {
    container.innerHTML += `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm">
                <img src="${book.image}" class="card-img-top" alt="${book.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${book.title}</h5>

                    <p class="card-text short-text">${book.description.substring(0, 80)}...</p>
                    <p class="card-text full-text d-none">${book.description}</p>

                    <button class="btn btn-primary mt-auto read-more-btn">Read More</button>
                </div>
            </div>
        </div>
    `;
});

// ===========================
// Read More / Read Less Button
// ===========================
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("read-more-btn")) {

        const card = e.target.closest(".card-body");
        const shortText = card.querySelector(".short-text");
        const fullText = card.querySelector(".full-text");

        if (fullText.classList.contains("d-none")) {
            // Show full text
            fullText.classList.remove("d-none");
            shortText.classList.add("d-none");
            e.target.textContent = "Read Less";
        } else {
            // Hide full text
            fullText.classList.add("d-none");
            shortText.classList.remove("d-none");
            e.target.textContent = "Read More";
        }
    }
});

