require('dotenv').config();
const mongoose = require('mongoose');
const Game = require('../models/Game');

async function addTimestamps() {
    try {
        console.log('Running migration to add timestamps');

        await mongoose.connect(process.env.MONGO_URI, {
            family: 4
        });
        console.log('Connected to MongoDB');

        // Update all documents that don't have timestamps
        const result = await Game.updateMany(
            { createdAt: { $exists: false } },
            {
                $set: {
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            }
        );

        console.log(`Updated ${result.modifiedCount} documents with timestamps`);
        console.log(`${result.matchedCount} documents matched the query`);

        // Verify some documents
        const sample = await Game.find()
            .limit(3)
            .select('title createdAt updatedAt');

        console.log('\nSample documents after update:');
        console.log(JSON.stringify(sample, null, 2));

    } catch (error) {
        console.error('Migration error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

addTimestamps(); 