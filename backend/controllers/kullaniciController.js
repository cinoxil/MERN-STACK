const asyncHandler = require('express-async-handler');
const kullaniciModel = require('../models/kullaniciModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const tokenOlustur = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
		//30 gun kalacak bir token olusturuyor
	});
};
module.exports = {
	registerKullanici: asyncHandler(async (req, res) => {
		const { kullaniciAd, email, parola } = req.body;
		if (!kullaniciAd || !email || !parola) {
			res.status(400);
			throw new Error('Lutfen gerekli alanlari doldurun');
		}

		const kullanici = await kullaniciModel.findOne({ email });
		if (kullanici) {
			res.status(400);
			throw new Error('Bu email zaten var');
		}
		//salt sifreleme zorluk seviyesi
		const salt = await bcrypt.genSalt(10);
		const sifrelenmisParola = await bcrypt.hash(parola, salt);

		const yeniKullanici = await kullaniciModel.create({
			kullaniciAd,
			email,
			parola: sifrelenmisParola,
		});

		if (yeniKullanici) {
			res.status(201).json({
				id: yeniKullanici._id,
				kullaniciAd: yeniKullanici.kullaniciAd,
				enail: yeniKullanici.email,
				token: tokenOlustur(yeniKullanici._id),
			});
		} else {
			res.status(400);
			throw new Error('Gecersiz kullanici verisi');
		}
	}),
	loginKullanici: asyncHandler(async (req, res) => {
		const { email, parola } = req.body;

		const kullanici = await kullaniciModel.findOne({ email });

		if (kullanici && (await bcrypt.compare(parola, kullanici.parola))) {
			res.json({
				id: kullanici._id,
				kullaniciAd: kullanici.kullaniciAd,
				email: kullanici.email,
				token: tokenOlustur(kullanici._id),
			});
		} else {
			res.status(400);
			throw new Error('Gecersiz email yada parola');
		}
	}),
	getKullanici: asyncHandler(async (req, res) => {
		const { _id, kullaniciAd, email } = await kullaniciModel.findById(req.user.id);

		res.status(200).json({
			id: _id,
			kullaniciAd,
			email,
		});
	}),
};
