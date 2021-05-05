const graphql = require('graphql');
const _ = require('lodash');

const { 
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLObjectType,  
    GraphQLSchema 
} = graphql;

// dummy data
let journalEntries = [
    {id: '1', date: '03/05/2021', waterIntake: 80, prenatalVitamins: true, probiotics: false},
    {id: '2', date: '04/05/2021', waterIntake: 75, prenatalVitamins: true, probiotics: true},
    {id: '3', date: '05/05/2021', waterIntake: 85, prenatalVitamins: false, probiotics: true},
];

const JournalEntryType = new GraphQLObjectType({
    name: 'JournalEntry',
    fields: () => ({
        id: { type: GraphQLID },
        date: { type: GraphQLString },
        waterIntake: { type: GraphQLInt },
        prenatalVitamins: {type: GraphQLBoolean },
        probiotics: { type: GraphQLBoolean }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        journalEntry: {
            type: JournalEntryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //code to get data from db / other source
                return _.find(journalEntries, { id: args.id });
            }
        }
    }
})

module.exports =  new GraphQLSchema({
    query: RootQuery
})