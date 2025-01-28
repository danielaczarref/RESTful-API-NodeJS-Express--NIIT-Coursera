const express = require('express');
const config = require("../config");
const router = express.Router();
const oauthCtrl = require("./auth.controller");

router.get('/login', (req, res) => {
	res.redirect(`https://github.com/login/oauth/authorize?client_id=${config.CLIENT_ID}`)
});

router.get('/callback', (req, res) => {
	const code = req.query.code;
	if (!code) {
        return res.status(401).send({ err: 'Missing authorization code' });
    }
	try {
		oauthCtrl.oauthProcessor(code, (err,data) => {
			if (err) {
				return res.status(401).send({ err: 'Bad request '})
			}
			return res.redirect(`/welcome.html?token=${data}`)
		})
	} catch(err) {
		return res.status(500).send('Unexpected system error')
	}
});

module.exports = router;