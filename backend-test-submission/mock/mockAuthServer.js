const express=require('express');
const app=express();
app.use(express.json());

app.post('/evaluation-service/auth',(req, res)=>{
  const {email,name,rollNo,accessCode,clientID,clientSecret}=req.body;

  if (
    email==='p.chaitanyapyla@gmail.com' &&
    rollNo==='22501a1298' &&
    accessCode==='eHWNzt' &&
    clientID==='07ce7a50-bf6e-4810-be8b-02d91c755c49' &&
    clientSecret==='sGMSkGQMHSarxPGy'
  ) {
    return res.status(200).json({
      token_type:'Bearer',
      access_token:'mocked-access-token-123456789',
      expires_in:3600,
    });
  }

  res.status(401).json({ error:'Invalid credentials'});
});

app.listen(3001,() =>{
  console.log('Mock Auth Server running at http://localhost:3001');
});
