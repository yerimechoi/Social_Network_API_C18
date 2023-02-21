const { User, Thought } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate("thoughts")
            .populate("friends")
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this id!' })
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this id!' })
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this id!' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } }))
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this id!' })
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this id!' })
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
};
