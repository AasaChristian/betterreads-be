// MARK: -- third party
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const passportSetup = require("../config/passport-setup");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);
const config = require("../database/db-config");

// MARK: -- restricted middleware
const restricted = require("../auth/restricted-middleware.js");

// MARK: -- routers
const authRouter = require("../auth/auth-router.js");
const booksRouter = require("../routers/book-router.js");
const userBooksRouter = require("../routers/user-books-router.js");
<<<<<<< HEAD
const userBooksOnShelfRouter = require ("../routers/user-books-on-a-shelf-router.js");
=======
const userShelvesRouter = require("../routers/user-shelves-router")
>>>>>>> 58c4bec441ce76d803bd3aa981ba83e0e097e133

// MARK: -- server
const server = express();

server.use(express.json());
server.use(helmet());

// MARK: -- cors
server.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// MARK: -- session and cookie configuration
server.use(
	session({
		name: process.env.SESSION_NAME,
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 7,
			secure: false
		},
		store: new knexSessionStore({
			knex: config
		})
	})
);

// MARK: -- passport
server.use(passport.initialize());
server.use(passport.session());

server.use("/api/auth", authRouter);
server.use("/api/books", restricted, booksRouter);
server.use("/api", restricted, userBooksRouter);
<<<<<<< HEAD
server.use("/api/shelves", restricted, userBooksRouter)
=======
server.use("/api/shelves", restricted, userShelvesRouter);
>>>>>>> 58c4bec441ce76d803bd3aa981ba83e0e097e133

server.get("/", (request, response) =>
	response.status(200).json({ message: "server is working" })
);

module.exports = server;
