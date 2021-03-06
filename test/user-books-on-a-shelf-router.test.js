const server = require("../api/server.js");
const request = require("supertest");
const db = require("../database/db-config.js");
const TestObject = require("./test-objects.js");
const knexCleaner = require('knex-cleaner');

const shelfObj = TestObject.shelfObj;
const bookObject = TestObject.bookObject;
const auth = TestObject.auth;
const setCookie = TestObject.setCookie;
const send = TestObject.send;
const promisedCookie = TestObject.promisedCookie;

var options = {
	mode: 'truncate',
	restartIdentity: true,
    ignoreTables: ['userShelves', 'userBooks', 'userBooksOnAShelf']
    
};

describe("user-books-on-a-shelf", function() {

	beforeAll(async function() {
		await knexCleaner.clean(db, options)
        return auth("/api/auth/signup", { 
            fullName: "Seeder Apple", emailAddress: "seedemail", password: "seedpassword" 
        })
        .then(res => { return setCookie(res, "/api/shelves/user/1", shelfObj)
            .then(res => { return send(res, "/api/booksonshelf/shelves/1", { book: bookObject, readingStatus: 2 })
            });
        });
	});
    
    describe("GET user books on shelf user shelfId", function() {
		it("GET /booksonshelf/shelves/:shelfId", function() {
			return promisedCookie({ emailAddress: "seedemail", password: "seedpassword" }).then(cookie => {
				const req = request(server)
                    .get("/api/booksonshelf/shelves/1")
					.send({ bookId: 1 })
					.set("cookie", cookie)
					.then(res => {
						expect(res.status).toBe(200);
					});
                return req;
            
			});
        });

        it("GET /booksonshelf/shelves/user/:userId/shelves/:shelfId/allbooks", function() {
            return promisedCookie({ emailAddress: "seedemail", password: "seedpassword" }).then(cookie => {
                const req = request(server)
                    .get("/api/booksonshelf/user/1/shelves/1/allbooks")
                    .set("cookie", cookie)
                    .then(res => {
                        expect(res.status).toBe(200);
                    });
                return req;
            
            });
        });

        it("GET /booksonshelf/user/:userId/shelves/allbooks", function() {
            return promisedCookie({ emailAddress: "seedemail", password: "seedpassword" }).then(cookie => {
                const req = request(server)
                    .get("/api/booksonshelf/user/1/shelves/allbooks")
                    .set("cookie", cookie)
                    .then(res => {
                        expect(res.body[0].shelfName).toBe('Test shelf');
                    });
                return req;
            
            });
        });
    });

    describe("PUT user books on shelf", function() {
        it("PUT /booksonshelf/shelves/:shelfId", function() {
            return promisedCookie({ emailAddress: "seedemail", password: "seedpassword" }).then(cookie => {
                const req = request(server)
                    .put("/api/booksonshelf/shelves/1")
                    .send({ bookId: 1, newShelfId: 2 })
                    .set("cookie", cookie)
                    .then(res => {
                        expect(res.body.message).toBe("error in moving book to shelf");
                    });
                return req;
            
            });
        });
    })
    
    describe("DELETE from shelf", function() {
        it("Delete book from shelf", function () {
            return promisedCookie({ emailAddress: "seedemail", password: "seedpassword" }).then(cookie => {
            const req = request(server)
                .delete("/api/booksonshelf/shelves/1")
                .send({ bookId: 1 })
                .set("cookie", cookie)
                .then(res => {
                    expect(res.status).toBe(200)
                });
            return req;

            });
        });
	});

});