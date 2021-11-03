const express = require('express');
const router = express.Router();
const key = '0ece401e-c6aa-449c-b802-68c913265294';

// Load Book model
const Art = require('../../models/Art');

// @route GET api/art/test
// @description tests art route
// @access Public
router.get('/test', (req, res) => res.send('art route testing!'));

// @route GET api/art
// @description Get all art
// @access Public
router.get('/', (req, res) => {
  Art.find()
    .then(art => res.json(art))
    .catch(err => res.status(404).json({ noartfound: 'No Art found' }));
});

// @route GET api/art/:id
// @description Get single art by id
// @access Public
router.get('/:id', (req, res) => {
  Art.findById(req.params.id)
    .then(art => res.json(art))
    .catch(err => res.status(404).json({ noartfound: 'No Art found' }));
});

// @route POST api/art
// @description add/save art
// @access Public
router.post('/', (req, res) => {
console.log(req.body);
  Art.create(req.body)
    .then(art => res.json({ msg: 'Art added successfully' }))
    .catch(err => {
    res.status(400);
    console.log(err);
    }
    );
});

// @route PUT api/art/:id
// @description Update art
// @access Public
router.put('/:id', (req, res) => {
  Art.findOneAndUpdate({"_id": req.params.id}, req.body)
    .then(art => res.json({ msg: 'Updated successfully' }))
    .catch(err => {
       console.log(err);
      res.status(400).json({ error: 'Unable to update the Database' });
      }
    );
});

// @route DELETE api/art/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
  Art.findOneAndDelete({"_id": req.params.id})
    .then(art => res.json({ mgs: 'Art entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such art' }));
});

module.exports = router;