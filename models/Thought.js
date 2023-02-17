const { Schema, model } = require('mongoose');
var moment = require('moment');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: {?}
        },
        username: {
            type: String,
            required: true
        },
        reactions: {
            type: Schema.Types.ObjectId,
            ref: 'Reaction'
        }
    },
    {
        //dk if timestamp is needed if createdAt is already there
        timestamps: true,
        toJSON: {
            virtuals: true,
            getters: true
        },
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.length;
    });


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;