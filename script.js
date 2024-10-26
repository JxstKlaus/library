class Book{
    constructor(title="", author="", pages=0, status=""){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
  
}

class Library{
    constructor() {
        this.books = []
    }

    isInLibrary(newBook){
        return this.books.some((book)=>book.title === newBook.title);
    }

    addBook(newBook) {
        if (!this.isInLibrary(newBook)) this.books.push(newBook);
    }

    removeBook(title){
        this.books.filter((book) => (book.title !== title));
    }

    getBook(title){
        return this.books.find((book) => (book.title === title));  
    }
}


//My Library
myLibrary = new Library

//SELECTORS
const addBookBtn = document.querySelector(".add-book-btn");
const addBookForm = document.querySelector("#add-book-form");
const overlay = document.querySelector(".overlay");
const continueBtn = document.querySelector(".continue");
const cardsContainer = document.querySelector(".cards-container");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const status_ = document.querySelector("#status");

//EVENTS
addBookBtn.onclick = displayForm;
overlay.onclick = hideForm;
continueBtn.onclick = addBook;


//FUNCTIONS
function displayForm(){
    addBookForm.classList.add("active");
    overlay.classList.add("active");
}

function hideForm(){
    overlay.classList.remove("active");
    addBookForm.classList.remove("active");
    clearForm();
}

function clearForm(){
    title.value = "";
    author.value = "";
    pages.value = "";
}

function createBookCard(bookObj){
    const newBookCard = document.createElement("div");
    newBookCard.classList.add("card");
    newBookCard.innerHTML = `
    <h3 class="title">${bookObj.title}</h3>
    <p class="author">${bookObj.author}</p>
    <p class="pages">${bookObj.pages}</p>
    <p class="card-status ${bookObj.status}"></p>
    <div class="status-container">
        <h4>Change status</h4>
        <div class="status">
            <button class="read">Read</button>
            <button class="reading">Reading</button>
            <button class="dropped">Dropped</button>
        </div>
    </div>
    `;
    //selecting the desired button based on the form status' value (class names = values)
    const currentStatus = newBookCard.querySelector(".status-container").querySelector(`.${bookObj.status}`);
    currentStatus.classList.add("active");
    return newBookCard;
}

function drawBookCard(bookObj){
    bookCard = createBookCard(bookObj);
    cardsContainer.appendChild(bookCard);
}

function addBook(){
    const newBook = new Book(title.value, author.value, pages.value, status_.value);
    if (!myLibrary.isInLibrary(newBook)){
        myLibrary.addBook(newBook)
        console.log(newBook.title);

        drawBookCard(newBook);
        hideForm();
    }

}