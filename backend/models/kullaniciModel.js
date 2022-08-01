const mongoose = require('mongoose');

const kullaniciSchema = mongoose.Schema(
	{
		kullaniciAd: {
			type: String,
			required: [true, 'Lutfen kullanici adi giriniz'],
		},
		email: {
			type: String,
			required: [true, 'Lutfen email giriniz'],
			unique: true,
		},
		parola: {
			type: String,
			required: [true, 'Lutfen parola giriniz'],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Kullanicis', kullaniciSchema);
