const { ObjectId } = require('mongoose').Types;
const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
      reactionId: {
          type: Schema.Types.ObjectId,
          default: new ObjectId,
      },
      reactionBody: {
          type: String,
          required: true,
          maxlength: 280, 
      },
      username: {
          type: String,
          required: true,
      },
      createdAt: {
          type: Date,
          default: Date.now,   
          get: function(v) {
              return v.toLocaleString();
          },
      },
    },
    {
      toJSON: {
          getters: true,
          virtuals: true, 
      },
      id: false,
    },
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;