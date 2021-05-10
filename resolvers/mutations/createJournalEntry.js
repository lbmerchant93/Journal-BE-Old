const { ApolloError } = require('apollo-server');

module.exports = async (_, {input}, {models}) => {

    try{
        newJournalEntry = await models.JournalEntry.create(input);
        return newJournalEntry;
    }
    catch(e) {
        throw new ApolloError(e)
    }
    
}