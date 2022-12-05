'use script'
const STORAGE_KEY = 'bookShopDB'
const gTitles = ['harry potter', 'Avenger', 'Puki and Muki', 'Nights at the Circus', 'Superintelligence', 'The Trial', 'The Body Snatchers', 'Disorder', 'Half a World Away', 'Found', 'The Lido']
const PAGE_SIZE = 5

var gPageIdx = 0
var gFilterBy
var gBooks

function nextPage(el) {
    // console.log(el.innerText);

    if (gPageIdx <= 0 && el.innerText === '<'
        || gPageIdx * PAGE_SIZE > gBooks.length && el.innerText === '>') return

    if (el.innerText === '>') gPageIdx++
    else gPageIdx--
    document.querySelector('.page-num').innerText = gPageIdx
}

function getBooks() {
    var books = gBooks
    var startIdx = gPageIdx * PAGE_SIZE

    return books.slice(startIdx, startIdx + PAGE_SIZE)
}

function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function addBook(title, price) {
    const book = _creatBook(title, price)
    gBooks.unshift(book)
    _saveBooksToStorage()
    return book
}

function updateBook(bookId, newPrice) {
    const book = getBookById(bookId)
    book.price = newPrice
    _saveBooksToStorage()
    return book
}

function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function updateRate(elButtonCliked, bookRate, bookId) {
    var book = getBookById(bookId)
    if (elButtonCliked === '+' && bookRate < 10) bookRate++
    else if (elButtonCliked === '-' && bookRate > 0) bookRate--

    book.rate = bookRate
    _saveBooksToStorage()
    return book
}

function setFilter(filterBy) {
    gBooks = _loadBooksFromStorage()
    gBooks = gBooks.filter(book => +book.price < filterBy)
}

function setSortBy(sortBy) {
    if (sortBy === 'title') {
        gBooks.sort((book1, book2) => {
            const nameA = book1.title.toUpperCase()
            const nameB = book2.title.toUpperCase()
            return (nameA < nameB) ? -1 : 1
        })
    } else if (sortBy === 'price') {
        gBooks.sort((book1, book2) => {
            const priceA = book1.price
            const priceB = book2.price
            return (priceA < priceB) ? -1 : 1
        })
    } else {
        gBooks = _loadBooksFromStorage()
    }
}

function _creatBook(title, price) {
    return {
        id: makeId(length = 3),
        title,
        price: price,
        brif: makeLorem(10),
        rate: 0
    }
}

function _creatBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 50; i++) {
            var title = gTitles[getRandomIntInclusive(0, gTitles.length - 1)]
            var price = getRandomIntInclusive(1, 100)

            books.push(_creatBook(title, price))
        }
    }
    gBooks = books
    _saveBooksToStorage()
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function _loadBooksFromStorage() {
    return loadFromStorage(STORAGE_KEY)
}