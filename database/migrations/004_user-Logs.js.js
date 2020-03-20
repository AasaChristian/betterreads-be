exports.up = function(knex) {
	return knex.schema.createTable("userLogs", tbl => {
		tbl.increments();
		tbl.integer("bookId")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("books")
			.onDelete("CASCADE")
			.onUpdate("CASCADE");

		tbl.integer("userId")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("users")
			.onDelete("CASCADE")
			.onUpdate("CASCADE");

        tbl.string("bookFrom");
        tbl.string("bookTo");
        tbl.string("statusFrom");
        tbl.string("statusTo");
        tbl.string("shelfFrom");
        tbl.string("shelfTo");
        tbl.string("favoriteFrom");
        tbl.string("favoriteTo");
		tbl.timestamp("logTime", 20).defaultTo(knex.fn.now());
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists("userLogs");
};
