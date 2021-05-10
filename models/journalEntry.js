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

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

module.exports = { JournalEntry };