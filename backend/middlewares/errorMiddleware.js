const hataYakalama = (err, req, res, next) => {
	const statusKod = res.statusCode ? res.statusCode : 500;
	//yukarida statusCode varsa onu alir yoksa 500 yapar

	res.status(statusKod);

	res.json({
		mesaj: err.message,
		aciklama: process.env.NODE_ENV === 'production' ? null : err.stack,
		//yukarida ? if : ise elsedir
		//NODE_ENV development ise hata aciklama gosterilir production ise gosterilmez
	});
};

module.exports = {
	hataYakalama,
};
