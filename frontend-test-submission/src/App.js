import React,{useState} from 'react';
import {Container,Typography,TextField,Button,Box,Card,CardContent,Grid,Divider} from '@mui/material';
import axios from 'axios';

function App() 
{
  const [urls,setUrls]=useState([{longUrl:'',validity:'',shortcode:'' }]);
  const [shortenedUrls,setShortenedUrls]=useState([]);

  const handleChange=(index,e)=>{
    const {name,value}=e.target;
    const newUrls=[...urls];
    newUrls[index][name]=value;
    setUrls(newUrls);
  };

  const validateUrl=(url)=>{
    const pattern=/^(https?):\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!$&'()*+,;=.]+$/;
    return pattern.test(url);
  };

  const handleSubmit=async()=>{
    const results=await Promise.all(
      urls.map(async (entry)=>{
        let url=entry.longUrl.trim();
        if (!url.startsWith('http://')&&!url.startsWith('https://')) 
          url='https://'+url;

        if (!validateUrl(url)) 
          return {error:'Invalid URL',...entry };
        
        try{
          const res=await axios.post('http://localhost:5000/shorturls',{
            longUrl:url,
            validity:entry.validity,
            shortcode:entry.shortcode
          });
          return res.data;
        } catch (err){
          return {error:err.response?.data?.message ||'Server error',...entry };
        }
      })
    );

    setShortenedUrls((prev)=>[...prev,...results]);
    setUrls([{longUrl: '',validity: '',shortcode:'' }]); 
  };

  const addMoreInput=()=>{
    if (urls.length < 5) 
      setUrls([...urls,{ longUrl:'', validity:'', shortcode:'' }]);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom mt={3}>React URL Shortener</Typography>
      {urls.map((entry, index)=>(
        <Box key={index} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Original URL"
                name="longUrl"
                value={entry.longUrl}
                onChange={(e)=>handleChange(index,e)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Validity (min)"
                name="validity"
                type="number"
                value={entry.validity}
                onChange={(e)=>handleChange(index,e)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Custom Shortcode"
                name="shortcode"
                value={entry.shortcode}
                onChange={(e)=>handleChange(index, e)}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button onClick={addMoreInput} disabled={urls.length>=5} sx={{ mt:2 }}>+ Add Another</Button>
      <br />
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>Shorten URLs</Button>

      <Divider sx={{my:4}} />

      <Typography variant="h5" gutterBottom>Shortened URLs</Typography>
      {shortenedUrls.map((item, idx)=>(
        <Card key={idx} sx={{ mb: 2 }}>
          <CardContent>
            {item.error ?(
              <Typography color="error">{item.error}-{item.longUrl}</Typography>
            ) : (
              <>
                <Typography><strong>Original:</strong> {item.originalUrl}</Typography>
                <Typography><strong>Short:</strong> http://localhost:5000/{item.shortcode}</Typography>
                <Typography><strong>Expiry:</strong> {item.expiry ? new Date(item.expiry).toLocaleString():'No Expiry'}</Typography>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default App;
