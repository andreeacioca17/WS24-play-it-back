const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Game = require('../models/Game');
//I think I should leave here the code in case of future issues?
async function run() {
    try {
        dotenv.config();
        await mongoose.connect(process.env.MONGO_URI, {
            family: 4
        });
        console.log('Connected to MongoDB');

        const fields = ['genres', 'tags', 'platforms'];
        let totalUpdates = 0;

        for (const field of fields) {
            console.log(`\nProcessing ${field}...`);

            const uniqueBadValues = await Game.aggregate([
                { $group: { _id: `$${field}` } },
                { $project: { _id: false, badValue: '$_id' } },
            ]);

            console.log(`Found ${uniqueBadValues.length} unique values for ${field}`);

            for (const { badValue } of uniqueBadValues) {
                if (typeof badValue !== 'string') {
                    continue;
                }

                try {
                    // Clean and parse the string
                    const stringifiedJson = /"/.test(badValue)
                        ? badValue
                            .replaceAll(/"([^,\]]*)"([,\]])/g, '\"$1\"$2')
                            .replaceAll(/'([^,\]]*)'([,\]])/g, '\"$1\"$2')
                        : badValue.replaceAll(/'([^,\]]*)'([,\]])/g, '\"$1\"$2');

                    const goodValue = JSON.parse(stringifiedJson);

                    // Log the transformation
                    console.log({
                        field,
                        from: badValue,
                        to: goodValue
                    });

                    // Perform the update
                    const result = await Game.updateMany(
                        { [field]: badValue },
                        { [field]: goodValue }
                    );

                    totalUpdates += result.modifiedCount;
                    console.log(`Updated ${result.modifiedCount} documents for value`);

                } catch (error) {
                    console.error(`Error processing value for ${field}:`, badValue);
                    console.error(error);
                }
            }
        }

        console.log(`\nTotal updates performed: ${totalUpdates}`);

    } catch (error) {
        console.error('Script error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Run the script
run().catch(console.error); 