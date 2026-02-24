const express = require("express");
const Game = require("../models/Game");
const { validateGameInput } = require("../middleware/gameValidation");
const router = express.Router();

// GET all games with pagination
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;

        const query = {};

        // Search title
        if (req.query.title) {
            query.title = { $regex: req.query.title, $options: "i" };
        }

        // Search by tags
        if (req.query.tags) {
            query.tags = { $in: [req.query.tags] };
        }

        // Search by genres
        if (req.query.genres) {
            query.genres = { $in: [req.query.genres] };
        }

        // Search release year
        if (req.query.year) {
            query.release_year = parseInt(req.query.year);
        } else if (req.query.yearFrom || req.query.yearTo) {
            query.release_year = {};
            if (req.query.yearFrom) {
                query.release_year.$gte = parseInt(req.query.yearFrom);
            }
            if (req.query.yearTo) {
                query.release_year.$lte = parseInt(req.query.yearTo);
            }
        }

        const games = await Game.find(query)
            .sort({ release_year: -1 })
            .skip(skip)
            .limit(limit)
            .select({
                _id: 0,
                id: 1,
                title: 1,
                release_year: 1,
                url: 1,
                genres: 1,
                developer: 1,
                platforms: 1,
                sample_cover: 1,
                sample_screenshots: 1,
                description: 1,
                country: 1,
                tags: 1,
                createdAt: 1,
                updatedAt: 1
            });

        const total = await Game.countDocuments(query);

        res.status(200).json({
            games,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalGames: total,
        });
    } catch (error) {
        console.error("Error fetching games:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// GET game by ID
router.get("/:id", async (req, res, next) => {
    // Skip this route if id is not numeric
    if (isNaN(req.params.id)) {
        return next();
    }

    try {
        const game = await Game.findOne({ id: req.params.id })
            .select({
                _id: 0,
                id: 1,
                title: 1,
                release_year: 1,
                developer: 1,
                genres: 1,
                tags: 1,
                platforms: 1,
                sample_cover: 1,
                country: 1,
                sample_screenshots: 1,
                description: 1,
                url: 1
            })
            .lean();

        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }

        res.status(200).json(game);
    } catch (error) {
        console.error("Error fetching game:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Get recently added games with pagination (sorted by creation date)
router.get("/recent", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const skip = (page - 1) * limit;

    const latestGames = await Game.find({ sample_cover: { $ne: null } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select({ _id: 0 });

    const total = await Game.countDocuments({ sample_cover: { $ne: null } });
    const totalPages = Math.min(Math.ceil(total / limit), 10);

    res.status(200).json({
      games: latestGames,
      currentPage: page,
      totalPages: totalPages,
      totalGames: total,
    });
  } catch (error) {
    console.error("Error fetching recent games:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get genres only (no tags)
router.get("/genres", async (req, res) => {
    try {
        console.log("Fetching genres...");
        const genresWithCount = await Game.aggregate([
            { $unwind: '$genres' },
            {
                $group: {
                    _id: '$genres',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    genre: '$_id',
                    count: 1
                }
            },
            { $sort: { count: -1 } }
        ]);

        console.log("Genres found:", genresWithCount);
        res.status(200).json(genresWithCount);
    } catch (error) {
        console.error('Detailed error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET platforms data
router.get("/platforms", async (req, res) => {
    try {
        const platformCounts = await Game.aggregate([
            { $unwind: "$platforms" },
            {
                $group: {
                    _id: "$platforms",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    count: 1
                }
            },
            { $sort: { count: -1 } }
        ]);

        res.status(200).json(platformCounts);
    } catch (error) {
        console.error("Error fetching platforms:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// GET tags
router.get("/tags", async (req, res) => {
    try {
        const tagsWithCount = await Game.aggregate([
            { $unwind: '$tags' },
            {
                $group: {
                    _id: '$tags',
                    count: { $sum: 1 },
                }
            },
            {
                $project: {
                    _id: 0,
                    tag: '$_id',
                    count: 1,
                    games: 1
                }
            },
            { $sort: { count: -1 } }
        ]).allowDiskUse(true);

        res.status(200).json(tagsWithCount);
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST new game
router.post("/", validateGameInput, async (req, res) => {
    try {
        const newGame = new Game(req.body);
        const savedGame = await newGame.save();
        res.status(201).json(savedGame);
    } catch (error) {
        console.error("Error adding game:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// DELETE game by ID
router.delete("/:id", async (req, res) => {
    try {
        const game = await Game.findOneAndDelete({ id: req.params.id });

        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }

        res.status(200).json({ message: "Game successfully deleted" });
    } catch (error) {
        console.error("Error deleting game:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;