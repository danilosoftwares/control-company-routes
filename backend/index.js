const express = require('express');
const cors = require('cors');
const app = express();

const clientsRouter = require('./src/routes/ClientsRoute');

const messageServerActive = 'server control company routes online!';

app.use(cors());
app.use(express.json());

app.use('/clients', clientsRouter);
app.use('/', (req,res)=>res.json({status:true, message:messageServerActive}));

app.listen(3000, function () {
    console.log(messageServerActive);
});
