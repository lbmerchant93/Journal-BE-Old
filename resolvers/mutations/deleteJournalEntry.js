const { ApolloError } = require('apollo-server');

module.exports = async(_, {id}, {models}) => {

    const deleteJournalEntry = await models.JournalEntry.deleteOne({_id: id})

    if(deleteJournalEntry.deletedCount) {
        return {id: id}
    } else {
        throw new ApolloError('Failed to delete.');
    }
}