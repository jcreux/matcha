const db = require('../db/database');

async function getReports()
{
	const sql = [
		'SELECT reported_id FROM reports'
	].join(' ');
	const params = [];
	try {
		return db.query(sql, params);
	}
	catch(err) {
		throw err;
	}
}

module.exports = {	getReports,
				};