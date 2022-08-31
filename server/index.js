const PORT = process.env.PORT || 5000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

var cors = require('cors')
app.use(cors())

app.get('/', (req, res) => {
    res.json('Welcome to Tokyo Disney Resort Scheduler API')
});

// show all related data (samples, sampled, covers)
app.get('/:attractionId/:dateId', (req, res) => {
    const { attractionId, dateId } = req.params;
    axios.get(`https://tdls.tokyo/detail/${attractionId}/${dateId}`)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const allData = [];

            $('.opahalf', html).each(function () {
                    const detail = $(this).find('td').text().replace("分混雑予想", "").match(/.{1,5}/g);
                    
                    allData.push(
                        parseInt(detail[1])
                    )
                });

            res.json(allData)
        }).catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));

