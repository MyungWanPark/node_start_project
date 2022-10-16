const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello User!');
});



router.route('/abc')
    .get((req, res) => {
        res.send('GET user/abc');
    })
    .post((req, res) => {
        res.send('POST user/abc');
    });

router.get('/:id', (req, res) => {
    console.log(req.params, req.query);
})

module.exports = router;    