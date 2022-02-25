const {Thought} = require('../models');
module.exports = {
    getThoughts(req, res) {
        Thought.find()
          .then(async (thoughts) => {
            return res.json(thoughts);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
      getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .then(async (thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
      createThought(req, res) {
        Thought.create(req.body)
          .then(async (thought) => {
            return res.json(thought);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
        updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true })
          .then(async (thought) => {
            return res.json(thought);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
        deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then(async (thought) => {
            return res.json(thought);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
    }