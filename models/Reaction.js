const { Schema, ObjectId } = require('mongoose');

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

module.exports = reactionSchema;