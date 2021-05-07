const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalEntrySchema = new Schema({
    date: String,
    waterIntake: Number,
    prenatalVitamins: Boolean,
    probiotics: Boolean,
    proteinIntake: Number,
    exercise: Number,
    kegels: Number,
    garlandPose: Number,
    userId: String
})

module.exports = mongoose.model('JournalEntry', journalEntrySchema);