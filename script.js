class Book{
    constructor(title="", author="", pages=0, status=""){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    toString(){
        return `title: ${this.title}, author: ${this.author}, pages: ${this.pages}, status: ${this.status}`;
    }
  
}

class Library{
    constructor() {
        this.books = [
            new Book("The 48 Laws of Power","Robert Greene", "452", "reading"),
            new Book("Surrounded by Idiots","Thomas Erikson", "282", "read"),
            new Book("Harry Potter","J. K. Rowling", "254", "dropped"),

        ]
        //this.books = [];
    }

    printBooks(){
        this.books.forEach(book=>console.log(book.title))
    }

    isInLibrary(newBook){
        return this.books.some((book)=>book.title === newBook.title);
    }

    addBook(newBook) {
        if (!this.isInLibrary(newBook)) this.books.push(newBook);
        console.log(`New book was added: ${newBook.toString()}`);
    }

    removeBook(title){
        this.books = this.books.filter((book) => book.title !== title);
        console.log(`Book was removed: ${title}`);
    }

    getBook(title){
        return this.books.find((book) => (book.title === title));
    }

    changeBookStatus(title, newStatus){
        const book = this.getBook(title);
        book.status = newStatus;
        console.log(`New status (${newStatus}) has been set for book '${title}'`);
    }
}

//My Library
myLibrary = new Library()

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

const errorText = document.querySelector(".error-text");

//EVENTS

addBookBtn.onclick = displayForm;
overlay.onclick = hideForm;
continueBtn.onclick = addBook;


//FUNCTIONS

function setActive(element){
    element.classList.add("active")
}

function removeActive(element){
    element.classList.remove("active")
}

function displayForm(){
    setActive(addBookForm);
    setActive(overlay);
}

function hideForm(){
    removeActive(addBookForm);
    removeActive(overlay);
    clearForm();
}

function clearForm(){
    title.value = "";
    author.value = "";
    pages.value = "";
    status_.selectedIndex = 0;
}

function createBookCard(bookObj){
    //creating card html element
    const newBookCard = document.createElement("div");
    newBookCard.classList.add("card");
    newBookCard.innerHTML = `
    <img class="delete-icon" src="./res/delete.svg" alt="">
    <h3 class="title">${bookObj.title}</h3>
    <p class="author">${bookObj.author}</p>
    <p class="pages">${bookObj.pages}</p>
    <p class="card-status ${bookObj.status}"></p>
    <div class="status-container">
        <h4>Change status</h4>
        <div class="status">
            <button value="read" class="status-button read">Read</button>
            <button value="reading" class="status-button reading">Reading</button>
            <button value="dropped" class="status-button dropped">Dropped</button>
        </div>
    </div>
    `;
    //selecting the active button based on book.status and setting it active
    const activeStatusButton = newBookCard.querySelector(".status-container").querySelector(`.${bookObj.status}`);
    setActive(activeStatusButton);

    //if one of the three status buttons is clicked then status changes
    newBookCard.querySelectorAll(".status-button").forEach(btn=>btn.addEventListener("click", ()=>changeStatus(newBookCard, btn)))
    //if delete icon is clicked deleteBook
    newBookCard.querySelector(".delete-icon").addEventListener("click", ()=>deleteBook(newBookCard))

    return newBookCard;
}

function deleteBook(bookCard){
    bookCard.remove()
    myLibrary.removeBook(bookCard.querySelector("h3").textContent)
}

function drawBookCard(bookObj){
    bookCard = createBookCard(bookObj);
    cardsContainer.appendChild(bookCard);
}

function addBook(){
    const newBook = new Book(title.value, author.value, pages.value, status_.value);
    if (!myLibrary.isInLibrary(newBook)){
        myLibrary.addBook(newBook)

        drawBookCard(newBook);
        hideForm();
    }
    else{
        errorText.textContent = "This book has already been added"
    }
    //todo validation 
}

function changeStatus(card, button){
    const activeStatusButton = button.parentNode.querySelector(".active");
    const cardStatus = card.querySelector(".card-status")

    const oldStatus = activeStatusButton.value
    const newStatus = button.value
    const title = card.querySelector(".title").textContent;
    removeActive(activeStatusButton);
    setActive(button);
    cardStatus.classList.remove(oldStatus);
    cardStatus.classList.add(newStatus);

    myLibrary.changeBookStatus(title, newStatus);
}

//function to load existing books
function loadBooksFromLibrary(lib){
    lib.books.forEach(book=>{
        drawBookCard(book)
    })
}

window.onload = ()=>{
    loadBooksFromLibrary(myLibrary);
}