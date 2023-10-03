const express = require('express');
const TabModel = require('../models/model');
const router = express.Router();

// get tabs
router.get('/get-tabs/:username', async (req, res) => {
    // code to retrieve tabs from db
    console.log('get request received')
    try {
        const { username } = req.params;
        const tabs = await TabModel.find({ username: username });
        res.status(200).json(tabs);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/cheese', async (req, res) => {
    // code to retrieve tabs from db
    try {
        res.status(200).json({ "message": "cheese" });
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/addtab', async (req, res) => {
    // code to add tab to db 
    try {
        const { username, title, url } = req.body;
        const tab = new TabModel({
            username: username,
            title: title,
            url: url
        });
        const newTab = await tab.save();
        // may want to rethink this. Sending this and updating array client side MIGHT be ok
        // or send back all records with this username back so that we can update the list cleint-side
        res.status(200).json(newTab);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/remove-tab', async (req, res) => {
    // code to remove tab by id which will be in req.params
    try {
        const givenId = req.body.id;
        const deletedTab = await TabModel.findByIdAndDelete(givenId);
        res.status(200).json({ message: deletedTab });
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;