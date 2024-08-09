const { Schema, model } = require('mongoose');
const { ObjectId } = require('mongoose').Types;

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
    reactions: [{ type: Schema.Types.ObjectId, ref: 'reaction' }],
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

const Thought = model('thought', thoughtSchema);


module.exports = Thought;

