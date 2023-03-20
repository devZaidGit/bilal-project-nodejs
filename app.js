const express = require('express');
const bodyParser = require('body-parser');
const Crypto = require('crypto');
var cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));

const port = 7070

app.get('/', (req, res) => res.send('Welcome to the Nodejs Project'))


app.post('/auth', (req, res) => {
    try {
        const accessKey = 'HZNwQfMQueiTQob1XRXJ';
       let query = '';
      query += `accessId=ruO7vifU7wzB2fVw9uSA`;
      query += `&merchantId=1029`;
      query += `&description=transaction description`;
      query += `&currency=USD`;
      query += `&amount=9.98`;
      query += `&displayAmount=0.00`;
      query += `&minimumBalance=0.00`;
      query += `&merchantReference=1679160133`;
      query += `&paymentType=Deferred`;
      query += `&timeZone=`;

        // const { accessKey, query } = req.body;
        const requestSignature = Crypto.createHmac('sha1', accessKey).update(query).digest('base64');

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({
            message:'Successfully',
            code: 200,
            data: {
                requestSignature
            }
        });
    }catch(err){
        console.log('err', err)
        return res.status(500).json(err)
    }
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))