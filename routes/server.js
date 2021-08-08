const router = require('express').Router();
const fetch = require('node-fetch');


router.get('/', (req, res) => {
  res.render('index', {
    city: null,
    des: null,
    icon: null,
    temp: null,
    country: null
  });
});
const apiKey = 'bbab0118e21b09664577b83aaa90536b';

router.post('/', async (req, res) => {
  const city = req.body.city;
  const country = req.body.country;
  const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city},${city.country}&units=imperial&timezone=standard&appid=${apiKey}`;

  try {
    await fetch(url_api)
      .then(res => res.json())
      .then(data => {
        if (data.message === 'city not found') {
          res.render('result', {
            city: data.message,
            country: null,
            des: null,
            icon: null,
            temp: null,
          })
        } else {
          const city = data.name;
          const des = data.weather[0].description;
          const icon = data.weather[0].icon;
          const temp = data.main.temp;
          const country = data.sys.country;

          res.render('result', {
            city, des, icon, temp, country
          });
        }
      });

  } catch (err) {
    res.render('index', {
      city: 'There has been an error!',
      des: null,
      icon: null,
      temp: null,
      country: null
    })
  }

})


module.exports = router;