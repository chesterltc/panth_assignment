// routes/images.js
const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const router = express.Router();

router.get('/:keyword', async (req, res) => {
    const keyword = req.params.keyword;

    try {
        // Start all search functions concurrently
        const [unSplashResult, pixabayResult, storyblocksResult] = await Promise.all([
            searchByUnsplash(keyword),
            searchByPixabay(keyword),
            searchByStoryblocks(keyword)
        ]);

        const result = {
            unSplashResult: unSplashResult,
            pixabayResult: pixabayResult,
            storyblocksResult: storyblocksResult,
        };
        res.json(result); 
    }
    catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ error: 'Error fetching results' });
    }
});

async function searchByUnsplash(query) {
    return new Promise(async (resolve) => {
        const accessKey = process.env.UNSPLASH_ACCESS_KEY;
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
            query,
            client_id: accessKey,
        },
        });
        
        resolve(response.data);
    });
};

async function searchByPixabay(query) {
    return new Promise(async (resolve) => {
        const apiKey = process.env.PIXABAY_API_KEY;
        const response = await axios.get(`https://pixabay.com/api/`, {
        params: {
            key: apiKey,
            q: query,
            image_type: 'photo',
        },
        });
        
        resolve(response.data);
    });
};

async function searchByStoryblocks(query) {
    return new Promise(async (resolve) => {
        const expires = Math.floor(Date.now() / 1000);
        const hmacBuilder = crypto.createHmac('sha256', process.env.STORYBLOCKS_API_PRIVATE_KEY + expires);
        hmacBuilder.update('/api/v1/stock-items/search/');
        const hmac = hmacBuilder.digest('hex');
        const response = await axios.get('https://api.graphicstock.com/api/v1/stock-items/search/', {
        params: {
            keywords: query,
            APIKEY: process.env.STORYBLOCKS_API_PUBLIC_KEY,
            EXPIRES: expires,
            HMAC: hmac,
        },
        });
    
        resolve(response.data);   
    });
}

module.exports = router;