const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const kullaniciModel = require('../models/kullaniciModel');

const kullaniciKontrol = asyncHandler(async (req, res, next) => {
	let sifrelenmisToken;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			sifrelenmisToken = req.headers.authorization.split(' ')[1];

			const token = jwt.verify(sifrelenmisToken, process.env.JWT_SECRET);

			req.user = await kullaniciModel.findById(token.id).select('-parola');
			//yukaridaki .select('-parola') basinda - oldugu icin parola dieldini haric tutar, + yaparsak onuda ekler

			next();
		} catch (err) {
			res.status(401);
			throw new Error('Giris yapilamaz');
		}
	}
	if (!sifrelenmisToken) {
		res.status(401);
		throw new Error('Giris yapilamaz token bulunamadi');
	}
});

module.exports = {
	kullaniciKontrol,
};
