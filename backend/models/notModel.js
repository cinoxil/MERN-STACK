const mongoose = require('mongoose');

//burasi db'de o table'da hangi fieldlar olacak onu olusturuyoruz schema deniyor
const notSchema = mongoose.Schema(
	{
		//bu kullanici field'i kullanicimodel'e referans ediyor
		kullanici: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Kullanicis',
		},
		baslik: {
			type: String,
			required: [true, 'Lutfen not basligini giriniz'],
		},
		aciklama: {
			type: String,
			required: [true, 'Lutfen not aciklamasini giriniz'],
		},
		oncelik: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
);
//timestamps true olunca db otamatik olarak her eklene kayitta tarih tutar ne zaman eklendi diye

module.exports = mongoose.model('Not', notSchema);
//adini Not olarak export ettik ve notSchemayi schema olarak kullandik
