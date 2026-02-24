const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    release_year: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    genres: [String],
    tags: {
        type: [String],
        required: false
    },
    developer: {
        type: String,
        required: true
    },
    platforms: {
        type: [String],
        required: false
    },
    sample_cover: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    sample_screenshots: {
        type: [String],
        required: false
    },
    country: {
        type: String,
        required: false
    }
}, {
    collection: 'Gamesall',
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

GameSchema.index({ id: 1 });
GameSchema.index({ release_year: -1 });
GameSchema.index({ title: 1 });

const Game = mongoose.model('Game', GameSchema, 'Gamesall');

module.exports = Game;
