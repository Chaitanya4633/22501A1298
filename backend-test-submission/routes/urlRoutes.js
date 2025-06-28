const express=require('express');
const router=express.Router();
const {shortenUrl, getStats}=require('../controllers/urlController');

router.post('/shorturls',shortenUrl);
router.get('/stats/:shortUrl',getStats);
module.exports=router;
