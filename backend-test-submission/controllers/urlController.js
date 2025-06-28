const Url=require('../models/Url');
const {nanoid}=require('nanoid');

exports.shortenUrl=async (req,res) =>{
  const {longUrl,validity,shortcode}=req.body;
  const finalCode=shortcode||nanoid(6);

  try {
    const exists=await Url.findOne({ shortcode: finalCode });
    if (exists) 
      return res.status(400).json({ message: 'Shortcode already exists' });

    const expiryDate=validity ? new Date(Date.now() + validity * 60000) : null;

    const newUrl=new Url({
      originalUrl: longUrl,
      shortcode: finalCode,
      expiry: expiryDate
    });

    await newUrl.save();

    res.json({
      originalUrl:newUrl.originalUrl,
      shortcode:newUrl.shortcode,
      expiry:newUrl.expiry
    });
  } catch (err) {
    res.status(500).json({message:'Server error'});
  }
};

exports.getStats=async (req, res)=>{
  const {shortUrl}=req.params;
  try {
    const url=await Url.findOne({shortcode: shortUrl});
    if (!url) 
      return res.status(404).json({message:'Short URL not found'});

    res.json({
      originalUrl:url.originalUrl,
      shortcode:url.shortcode,
      expiry:url.expiry,
      createdAt:url.createdAt,
      totalClicks:url.clicks.length,
      clicks:url.clicks
    });
  } 
  catch (err) {
    res.status(500).json({ message:'Error fetching stats'});
  }
};
