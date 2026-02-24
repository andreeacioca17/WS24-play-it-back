const Game = require('../models/Game');

const validateGameInput = async (req, res, next) => {
    try {
        const errors = [];
        let { id, title, release_year, url, genres, tags, developer } = req.body;

        // Required fields validation
        if (!id) errors.push('id is required');
        if (!title) errors.push('title is required');
        if (!release_year) errors.push('release_year is required');
        if (!url) errors.push('url is required');
        if (!developer) errors.push('developer is required');

        if (errors.length > 0) {
            return res.status(400).json({ error: 'Missing required fields', missing: errors });
        }

        // Type conversion
        id = Number(id);
        release_year = Number(release_year);

        if (isNaN(id) || isNaN(release_year)) {
            errors.push('Invalid id or release_year, must be numbers');
        }

        if (id <= 0) {
            errors.push('ID must be a positive number');
        }

        // Check for duplicate ID
        const existingGame = await Game.findOne({ id });
        if (existingGame) {
            errors.push('Game with this ID already exists');
        }

        if (title.length < 1 || title.length > 200) {
            errors.push('Title must be between 1 and 200 characters');
        }

        if (!isValidUrl(url)) {
            errors.push('Invalid URL format');
        }

        // Optional genres validation
        if (genres) {
            if (!Array.isArray(genres) && typeof genres !== 'string') {
                errors.push('Genres must be an array or a string representation of an array');
            }
        }

        // Optional tags validation
        if (tags) {
            if (!Array.isArray(tags) && typeof tags !== 'string') {
                errors.push('Tags must be an array or a string representation of an array');
            }
        }

        const currentYear = new Date().getFullYear();
        if (release_year < 1950 || release_year > currentYear + 5) {
            errors.push('Invalid release year');
        }

        if (errors.length > 0) {
            return res.status(400).json({ error: 'Validation failed', details: errors });
        }

        // Trim strings
        req.body.title = title.trim();
        req.body.developer = developer.trim();

        next();
    } catch (error) {
        console.error("Validation error:", error);
        res.status(500).json({ error: 'Server error during validation' });
    }
};

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

const validateDebugAccess = (req, res, next) => {
    try {
        // Check for debug mode in environment
        const isDebugMode = process.env.DEBUG_MODE === 'true';

        // Check for debug token in headers
        const debugToken = req.headers['x-debug-token'];
        const validDebugToken = process.env.DEBUG_TOKEN;

        // Check both debug mode and valid token
        if (!isDebugMode || !debugToken || debugToken !== validDebugToken) {
            return res.status(403).json({
                error: 'Debug access denied',
                message: 'Invalid or missing debug credentials'
            });
        }

        // Log debug access attempts (optional)
        console.log(`Debug route accessed: ${req.method} ${req.path}`);

        next();
    } catch (error) {
        console.error('Debug validation error:', error);
        res.status(500).json({ error: 'Server error during debug validation' });
    }
};

module.exports = {
    validateGameInput,
    validateDebugAccess
};
