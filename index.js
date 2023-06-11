const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');


const app = express();
app.use(express.json())
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client')));

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webPush.setVapidDetails('mailto:test@gmail.com', publicVapidKey, privateVapidKey);

app.post('/subscribe', (req, res) => {
  const subscription = req.body

  res.status(201).json({});

  const payload = JSON.stringify({
    title: 'Push notifications with Service Workers',
    body: 'This is a test notification',
    
  });

  webPush.sendNotification(subscription, payload)
  .then(result => console.log(result))
    .catch(error => console.error(error));
});

app.listen(process.env.PORT||5000, () => {
  console.log('Server started on port 5000');
});