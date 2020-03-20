
exports.up = function(knex) {
	return knex.schema.table("userBooks", tbl => {
		tbl.boolean("recommended").defaultTo(false);
	})
};

exports.down = function(knex) {
	return knex.schema.table("userBooks", tbl => {
		tbl.dropColumn("recommended");
	})
};
