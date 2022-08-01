const asyncHandler = require('express-async-handler');
const notModel = require('../models/notModel');
const kullaniciModel = require('../models/kullaniciModel');

module.exports = {
	getNotlar: asyncHandler(async (req, res) => {
		const notlar = await notModel.find({
			kullanici: req.user.id,
		});
		res.status(200).json(notlar);
	}),

	setNotlar: asyncHandler(async (req, res) => {
		if (!req.body.baslik || !req.body.aciklama) {
			res.status(400);
			throw new Error('Lutfen baslik ve aciklama alanlarini giriniz');
		}

		const not = await notModel.create({
			baslik: req.body.baslik,
			aciklama: req.body.aciklama,
			oncelik: req.body.oncelik,
			kullanici: req.user.id,
		});

		res.status(200).json(not);
	}),

	updateNotlar: asyncHandler(async (req, res) => {
		const not = await notModel.findById(req.params.id);
		const kullanici = await kullaniciModel.findById(req.user.id);

		if (!kullanici) {
			res.status(400);
			throw new Error(`Kullanici Bulunamadi`);
		}
		if (!not) {
			res.status(400);
			throw new Error(`Not bulunamadi`);
		}
		if (not.kullanici.toString() !== kullanici.id) {
			res.status(401);
			throw new Error(`Kullanici yetkili degil`);
		}
		if (!req.body.baslik && !req.body.aciklama && !req.body.oncelik) {
			res.status(400);
			throw new Error('Lutfen guncellenecek bir alan giriniz');
		}
		if (!req.body.baslik) {
			req.body.baslik = not.baslik;
		}
		if (!req.body.aciklama) {
			req.body.aciklama = not.aciklama;
		}
		if (!req.body.oncelik) {
			req.body.oncelik = not.oncelik;
		}
		const guncellendi = await notModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
		//new:true diyince guncellendi'ye yeni degistirilmis veri gelir false dersek eski veri gelir

		res.status(200).json(guncellendi);
	}),

	deleteNotlar: asyncHandler(async (req, res) => {
		const not = await notModel.findById(req.params.id);
		const kullanici = await kullaniciModel.findById(req.user.id);

		if (!kullanici) {
			res.status(400);
			throw new Error(`Kullanici Bulunamadi`);
		}
		if (!not) {
			res.status(400);
			throw new Error(`Not bulunamadi`);
		}
		if (not.kullanici.toString() !== kullanici.id) {
			res.status(401);
			throw new Error(`Kullanici yetkili degil`);
		}
		await not.remove();
		res.status(200).json(not._id + ' silindi');
	}),
};
