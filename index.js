const express = require('express');
const axios = require('axios');

const app = express();

app.get('/data', async (req, res) => {
    const url = 'https://www.wildberries.ru/webapi/spa/product/deliveryinfo?latitude=55.753737&longitude=37.6201';

    try {
        const response = await axios.get(url);
        const data = response.data.value.times; //! Access the array of objects
        const filteredData = data.filter(item => item.storeName === 'Казань WB'); //! Filter based on storeName

        //! Calculate the sum of inMinutes values using reduce
        const totalInMinutes = filteredData.reduce((acc, item) => acc + item.inMinutes, 0);

        res.json({ filteredData, totalInMinutes }); //! Send the filtered data and totalInMinutes as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
