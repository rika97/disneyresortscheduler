const PORT = process.env.PORT || 5000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment')

const app = express();

var cors = require('cors')
app.use(cors())

app.get('/', (req, res) => {
    res.json('Welcome to Tokyo Disney Resort Scheduler API')
});


// Get predicted wait times
app.get('/waitTimes/:attractionId/:dateId', (req, res) => {
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


// Get disney sea stopped attractions info
app.get('/seaStop/:dateId', (req, res) => {
    const { dateId } = req.params;

    axios.get(`https://www.tokyodisneyresort.jp/tds/daily/stop/${dateId.replace(/[^0-9]+/g, '')}`)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const allData = [];

            $('.linkList6', html).each(function () {
                    const detail = $(this).find('p').text().replace(/\n/g, '').replace(/\s+/g, ",");
                    
                    allData.push(
                        detail.split(',')
                    )
                });

            res.json(allData)
        }).catch((err) => console.log(err));
});


// Get disney land stopped attractions info
app.get('/landStop/:dateId', (req, res) => {
    const { dateId } = req.params;

    axios.get(`https://www.tokyodisneyresort.jp/tdl/daily/stop/${dateId.replace(/[^0-9]+/g, '')}`)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const allData = [];

            $('.linkList6', html).each(function () {
                    const detail = $(this).find('p').text().replace(/\n/g, '').replace(/\s+/g, ",");
                    
                    allData.push(
                        detail.split(',')
                    )
                });

            res.json(allData)
        }).catch((err) => console.log(err));
});

// Get disney sea stopped attractions info--ENGLISH
app.get('/seaStopEN/:dateId', (req, res) => {
    const { dateId } = req.params;

    axios.get(`https://www.tokyodisneyresort.jp/en/tds/daily/stop/${dateId.replace(/[^0-9]+/g, '')}`)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const allData = [];
            const cleanedData =[];

            $('.linkList6', html).each(function () {
                    const detail = $(this).find('p').text().replace(/\n/g, ",");
                    
                    allData.push(
                        detail.split(',')
                    )

                    for (let i=0; i < allData.length; i++) {
                        let cleanedArray = []
                        for (let j=0; j < allData[i].length; j++) {
                            cleanedArray.push(allData[i][j].trim())
                        }
                        cleanedData.push(cleanedArray)
                    }
                });

            res.json(cleanedData)
        }).catch((err) => console.log(err));
});


// Get disney land stopped attractions info--ENGLISH
app.get('/landStopEN/:dateId', (req, res) => {
    const { dateId } = req.params;

    axios.get(`https://www.tokyodisneyresort.jp/en/tdl/daily/stop/${dateId.replace(/[^0-9]+/g, '')}`)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const allData = [];
            const cleanedData =[];

            $('.linkList6', html).each(function () {
                    const detail = $(this).find('p').text().replace(/\n/g, ",");
                    
                    allData.push(
                        detail.split(',')
                    )

                    for (let i=0; i < allData.length; i++) {
                        let cleanedArray = []
                        for (let j=0; j < allData[i].length; j++) {
                            cleanedArray.push(allData[i][j].trim())
                        }
                        cleanedData.push(cleanedArray)
                    }
                });

            res.json(cleanedData)
        }).catch((err) => console.log(err));
});



// Get weather forecast
app.get('/forecast/:dateId', (req, res) => {
    const { dateId } = req.params;
    const entryDate = moment(dateId)
    const today = moment(new Date().setHours(0,0,0,0));
    const dayDiff = entryDate.diff(today, 'days')

    axios.get('https://tenki.jp/forecast/3/15/4510/12227/10days.html')
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const allWeather = [];
            const allPrecip = [];
            const cleanPrecip = [];
            const allHighTemp = [];
            const allLowTemp = [];
            
            $('.forecast-telop', html).each(function () {
                    const detail = $(this).text();
                    allWeather.push(detail)
                });

            $('.prob-precip', html).each(function () {
                const detail = $(this).text();
                allPrecip.push(detail)
            });

            $('.high-temp', html).each(function () {
                const detail = $(this).text();
                allHighTemp.push(detail)
            });

            $('.low-temp', html).each(function () {
                const detail = $(this).text();
                allLowTemp.push(detail)
            });
            for (let i=0; i < allPrecip.length; i++) {
                if (allPrecip[i] != '降水確率') {
                    cleanPrecip.push(allPrecip[i])
                }
            }

            const weather = allWeather[dayDiff];
            const precip = cleanPrecip[dayDiff];
            const highTemp = allHighTemp[dayDiff];
            const lowTemp = allLowTemp[dayDiff];

            const allData = [weather, precip, highTemp, lowTemp]
            for (let i=0; i < allData.length; i++) {
                if (allData[i] === undefined) {
                    allData[i] = "?"
                    console.log(allData[i])
                }
            }
            res.json(allData)
        }).catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));

