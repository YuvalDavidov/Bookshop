
function onInit() {
    _creatBooks()
    renderBooks()
    onSetFilterBy(50)
}
function onNextPage(el) {
    nextPage(el)
    renderBooks()
}

function renderBooks() {
    var books = getBooks()
    var strHtmls = books.map(book => `
    <tr class="book ${book.title}">
    <td>${book.id}</td>
    <td>${book.title}</td>
    <td>${book.price} $</td>
    <td>
        <button class="read" onclick="onReadBook('${book.id}')">Read</button>
        <button class="update" onclick="onUpdateBook('${book.id}')">Update</button>
        <button class="delete" onclick="onDeleteBook('${book.id}')">Delete</button>
    </td>
</tr>`
    )
    document.querySelector('.books-container').innerHTML = strHtmls.join('')
}

function onSetSortBy(sortBy) {


    console.log(sortBy);
    setSortBy(sortBy)
    renderBooks()
}

function onUpdateRate(el) {
    var elButtonCliked = el.innerText
    var elBookId = document.querySelector('.book-id').innerText
    var book = getBookById(elBookId)

    var bookRate = book.rate
    book = updateRate(elButtonCliked, bookRate, elBookId)

    document.querySelector('.rate span').innerText = book.rate
}

function onUpdateBook(bookId) {

    var newPrice = +prompt('new price?')
    if (newPrice && newPrice > 0) {
        const book = updateBook(bookId, newPrice)
        renderBooks()
    }

}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.title
    elModal.querySelector('p').innerText = book.brif
    elModal.querySelector('span').innerText = book.rate
    elModal.querySelector('.book-id').innerText = book.id
    elModal.classList.add('open')
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}

function onAddBook() {
    var title = prompt('what is the title?')
    var price = prompt('what is the price?')

    if (title && price) {
        const book = addBook(title, price)
        renderBooks()
    }

}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}

function onSetFilterBy(filterBy) {

    setFilter(filterBy)
    renderBooks()

    document.querySelector('.books-filter span').innerText = filterBy
}