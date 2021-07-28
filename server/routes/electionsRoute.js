const express = require('express');
const electionsService = require('../services/electionsService');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
  const elections = await electionsService.getElections();
  res.json(elections);
});

router.get('/:username', async (req, res) => {
  const { username } = req.params;
  const activeElections = await electionsService.getActiveUnvotedElections(username);
  res.json(activeElections);
});

router.get('/:id/options', async (req, res) => {
  const { id } = req.params;
  const options = await electionsService.getOptions(id);
  res.json(options);
});

router.post('/', async (req) => {
  const election = req.body;
  await electionsService.newElection(election);
});

module.exports = router;