import express from 'express';
import fetch from 'node-fetch';
const solarsSystem = (await import('npm-solarsystem')).default
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));


//root route
app.get('/', async (req, res) => {

   let url= "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar%20system";
   let response = await fetch(url);
   let data = await response.json();
   //console.log(data);
   const randInt = Math.floor(Math.random() * data.hits.length);
   let randImg = data.hits[randInt].webformatURL;
   res.render('home.ejs',{randImg})
});


//planet route
app.get('/planet', (req, res) => {
    let planetName = req.query.planetName
    let planetInfo = solarsSystem[`get${planetName}`]();
    res.render('planetInfo.ejs', {planetInfo, planetName})
});

app.get('/nasaPOD', (req, res) => {
    res.render('nasaPOD.ejs')
});

app.listen(3000, () => {
   console.log('server started');
});