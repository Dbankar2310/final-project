var db = require('./database')
const { ConnectableObserveble } = require ('rxjs');
const express = require ('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');



app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

db.connect(err => {
  if (err) { console.log('err'); }
  console.log('database Connected....');
})



app.get('/user', (req, res) => {

  let qr = `Select * from public."products"`

  db

      .query({

          // rowMode: "array",

          text: qr

      })

      .then(result => {



          var data1 = [];

          for (var i = 0; i < result.rows.length; i++) {

              data1.push({

                  product_id: result.rows[i].product_id,

                  title: result.rows[i].title,

                  image: result.rows[i].image,

                  images: result.rows[i].images,

                  description: result.rows[i].description,

                  price: result.rows[i].price,

                  quantity: result.rows[i].quantity,

                  categorie_id: result.rows[i].categorie_id

              });

          }

          // console.log(result);

          // if(result.length > 0)

          // {

          // console.log(result.rows[0].Name);

          res.send(

              // message: 'all user data',

              // data: result.rows

              data1

          );

          // }

      })

      .catch(err => console.log(err, 'errs'));

});

app.listen(3000, () => {

  console.log('Server Running');

})