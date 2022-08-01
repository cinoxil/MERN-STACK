const mongoose = require('mongoose');

const baglan = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);

		console.log(`MongoDB baglandi --> ${conn.connection.name}`.blue.inverse);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

module.exports = baglan;
