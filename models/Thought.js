const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      unique: true,
      required: true,
      minlength: [1, "Thought must be at least 1 character long"],
      maxlength: [280, "Thought must be less than 280 characters long"],
    },
    createdAt: {
      type: Date,
        default: Date.now,
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
  }
);
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
const Thought = model("thought", thoughtSchema);
module.exports = Thought;