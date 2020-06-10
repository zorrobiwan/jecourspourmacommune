const express = require('express');
const app = express();

const webserver = app.listen(5000, '127.0.0.1', function () {
    console.log('Node web server loaded and listening');
});

var scraper = require('table-scraper');

var data;

async function scrap() {
    return scraper
  .get('https://prod.chronorace.be/virtualchallenge/ChallengeJCPMF.aspx?lng=FR&chal=4&id=1187927824713503&hash=AGQXJMAVL7XWkcvIVA6z5B97Ehs')
  .then(function(tableData) {
    data = tableData[1];
    data.shift();
    data.forEach(people => {
        people["5"] = people["5"].slice(0, -2);
    });
    console.log("Scrapped");
  })
  .catch(function (error) {
      console.log(error);
  });
}

scrap();
setInterval(scrap, 300000);


app.get('/data', function (req, res) {
    var dataToSend = {data : data};
    res.send(dataToSend);
});

app.use(express.static('public'));