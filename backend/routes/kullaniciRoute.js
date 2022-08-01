const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { registerKullanici, loginKullanici, getKullanici } = require('../controllers/kullaniciController');
const { kullaniciKontrol } = require('../middlewares/authMiddleware');

router.post('/', registerKullanici);
router.post('/login', loginKullanici);
router.get('/kullanici', kullaniciKontrol, getKullanici);

module.exports = router;
