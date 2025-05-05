// Global array to store books
let books = JSON.parse(localStorage.getItem("books")) || [];

// Track the book being edited
let editingIndex = null;

//submission function
function submitBook() {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const genre = document.getElementById("genre");
  const reviews = document.getElementById("reviews");

  const book = {
    title: title.value,
    author: author.value,
    genre: genre.value,
    reviews: reviews.value,
  };

  if (editingIndex !== null) {
    // We are editing an existing book
    books[editingIndex] = book;
    document.getElementById("button").textContent = "Add Book"; // Reset button text
  } else {
    // Add a new book
    books.push(book);
  }

  // Save to localStorage
  localStorage.setItem("books", JSON.stringify(books));

  // Refresh the list
  displayBooks();

  // Clear inputs
  title.value = "";
  author.value = "";
  genre.value = "";
  reviews.value = "";
}

function addBookToList(book, index) {
  const bookList = document.getElementById("bookList");

  const li = document.createElement("li");
  li.textContent = `${book.title} | ${book.author} | ${book.genre} | ${book.reviews} `;

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.style.marginLeft = "10px";
  editBtn.addEventListener("click", function () {
    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("genre").value = book.genre;
    document.getElementById("reviews").value = book.reviews;
    editingIndex = index;
    document.getElementById("button").textContent = "Update Book";
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.style.marginLeft = "10px";
  delBtn.addEventListener("click", function () {
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks(); // Refresh list without reloading page
  });

  li.appendChild(editBtn);
  li.appendChild(delBtn);
  bookList.appendChild(li);
}

// Clear and re-render the entire list
function displayBooks() {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";
  books.forEach((book, index) => {
    addBookToList(book, index);
  });
}

// On page load
window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("button").addEventListener("click", submitBook);
  displayBooks();
});
