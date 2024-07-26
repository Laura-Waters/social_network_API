const { Schema } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function(v) {
        return v.toLocaleString();
      },
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true, 
    },
    id: false,
  },
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});


module.exports = thoughtSchema;

