const { Thought, Reaction, User } = require('../models');

module.exports = {
  // Get all thoughts 
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.error({ message: err });
      res.status(500).json(err);
    }
  },
  // Get a single thought 
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a new thought 
  async createThought(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const thought = await Thought.create(req.body);
      // update the associated User 
      user.thoughts.push(thought._id);
      await user.save();

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought 
  async updateThought(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
        );

        if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  },
  // Delete a thought 
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete(
        { _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought deleted, but no user with that id',
        });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a new reaction   
  async createReaction(req, res) {
    console.log('You are adding a reaction!');
    console.log(req.body);

    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      console.log('Thought found');

      const reaction = await Reaction.create(req.body);
      // update the associated Thought 
      await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: reaction._id } },
        { new: true }
      );

      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a reaction   
  async deleteReaction(req, res) {
    try {
      const reaction = await Reaction.findOneAndRemove(
        { _id: req.params.reactionId });

      if (!reaction) {
        return res.status(404).json({ message: 'No reaction with that ID' });
      }

      const thought = await Thought.findOneAndUpdate(
        { reactions: req.params.reactionId },
        { $pull: { reactions: req.params.reactionId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: 'Reaction deleted, but no thought with that id',
        });
      }

      res.json({ message: 'Reaction successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
