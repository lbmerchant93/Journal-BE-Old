module.exports = async (_, {}, {models}) => {
    return await models.JournalEntry.find()
}