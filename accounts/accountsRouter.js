const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

// GET "/" -- tested via insomni and working!
router.get('/', async (req, res, next) => {
  try {
    res.json(await db.select('*').from('accounts'));
  } catch (err) {
    next(err);
  }
});

// GET "/:id" -- tested via insomni and working!
router.get('/:id', async (req, res, next) => {
  try {
    res.json(
      await db
        .select('*')
        .from('accounts')
        .where('id', req.params.id)
    );
  } catch (err) {
    next(err);
  }
});

// POST "/" -- tested via insomni and working!
router.post('/', async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    };
    const [id] = await db('accounts').insert(payload);
    res.json(
      await db('accounts')
        .where('id', id)
        .first()
    );
  } catch (err) {
    next(err);
  }
});

// PUT "/:id" -- tested via insomni and working!
router.put('/:id', async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    };
    await db('accounts')
      .where('id', req.params.id)
      .update(payload);
    res.json(
      await db('accounts')
        .where('id', req.params.id)
        .first()
    );
  } catch (err) {
    next(err);
  }
});

// DELETE "/:id" -- tested via insomni and working!
router.delete('/:id', async (req, res, next) => {
  try {
    await db('accounts')
      .where('id', req.params.id)
      .del()
      .then(response => {
        res
          .status(200)
          .json({ message: 'Account successfully deleted', response });
      });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
