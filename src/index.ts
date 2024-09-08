import express from 'express';



const app = express();

const PORT  = Number(process.env.PORT) || 3001;


app.listen(PORT, ()=> console.log('App listening on port  ', PORT));
