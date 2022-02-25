const { Schema } = require("mongoose");
const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: [280, "Reaction must be less than 280 characters long"],
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
        default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);
reactionSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
module.exports = reactionSchema;