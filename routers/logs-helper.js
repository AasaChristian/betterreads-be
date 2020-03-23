const userLogs = require("../models/user-logs.js")
const userShelves = require("../models/user-shelves.js")
const booksOnShelf = require("../models/user-books-on-a-shelf.js")
module.exports = {
    logAdd,
    logPutDel
};

function logAdd(res, req, book, bookTo, successMessage, errMessage){
    userLogs.findBy(book.bookId, book.userId).then(oldBook => {
       const logObj = {
    userId: book.userId,
    bookId: book.bookId,
    bookFrom: (oldBook !== undefined)?  oldBook.bookTo : null,
    bookTo: bookTo,
    statusFrom: (oldBook !== undefined)? oldBook.statusTo : null,
    statusTo: book.readingStatus,
    shelfFrom: (oldBook !== undefined)? oldBook.shelfTo : null,
    shelfTo: book.shelfId,
    favoriteFrom: (oldBook !== undefined)? oldBook.favoriteTo : null,
    favoriteTo: book.favorite
  }
  userLogs.add(logObj)
  .then(log => {
    res.status(201).json({message: successMessage, log: log}) 
  }).catch(err => {
    res.status(400).json({err: errMessage})
    })   
    })
   
}

function logPutDel(res, bookId, shelfId, successMessage, errMessage, oldShelfId, newShelfId){
    userShelves.findBy(shelfId)
    .then(shelf => {
        const userId = shelf[0].userId;
        userLogs.findBy(bookId, userId).then(oldBook => {
            const logObj = {
                        userId: userId,
                        bookId: bookId,
                        bookFrom: (oldBook !== undefined)?  oldBook.bookTo : null,
                        bookTo: "library",
                        statusFrom: (oldBook !== undefined)? oldBook.statusTo : null,
                        statusTo: (oldBook !== undefined)? oldBook.readingStatus: null,
                        shelfFrom: oldShelfId,
                        shelfTo: newShelfId,
                        favoriteFrom: (oldBook !== undefined)? oldBook.favoriteTo : null,
                        favoriteTo:(oldBook !== undefined)? oldBook.favorite : null
                    }
                    userLogs.add(logObj).then(log => {
                res.status(201).json({message: successMessage, log: log})    
                    })
                    .catch(err => {
                        res.status(400).json({message: errMessage})
                    })
        })
        

    })
    .catch(err => {
        res.status(400).json(err)
    })
}

