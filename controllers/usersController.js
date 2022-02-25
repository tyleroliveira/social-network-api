const { User } = require("../models");
module.exports = {
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  createUser(req, res) {
    User.create(req.body)
      .then(async (user) => {
        return res.json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
      .then(async (user) => {
        return res.json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then(async (user) => {
        return res.json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.body.friendId } },
      { new: true }
    )
      .then(async (user) => {
        return res.json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.body.friendId } },
      { new: true }
    )
      .then(async (user) => {
        return res.json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  }
};
