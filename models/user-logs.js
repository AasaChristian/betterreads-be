const db = require("../database/db-config.js");

module.exports = {
	add,
	findById,
	findBy
};


async function add(log) {
	const [id] = await db("userLogs")
		.insert(log)
		.returning("id");
	return findById(id);
}

function findById(id) {
	return db("userLogs")
    .where( "userLogs.id", id )
    .select("*")
}

function findBy(bookId, userId) {
	return db("userLogs")
	.where( "userLogs.bookId", bookId )
	.where( "userLogs.userId", userId )
	.orderBy("id", "desc").first()
	.select("*")
	
}

