const graphql = require('graphql');
const _ = require('lodash');

const { 
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLObjectType,  
    GraphQLSchema 
} = graphql;

// dummy data
let journalEntries = [
    {id: '1', date: '03/05/2021', waterIntake: 80, prenatalVitamins: true, probiotics: false, proteinIntake: 50, exercise: 30, kegels: 50, garlandPose: 6},
    {id: '2', date: '04/05/2021', waterIntake: 75, prenatalVitamins: true, probiotics: true, proteinIntake: 60, exercise: 10, kegels: 60, garlandPose: 7},
    {id: '3', date: '05/05/2021', waterIntake: 85, prenatalVitamins: false, probiotics: true, proteinIntake: 70, exercise: 20, kegels: 70, garlandPose: 8},
];

const JournalEntryType = new GraphQLObjectType({
    name: 'JournalEntry',
    fields: () => ({
        id: { type: GraphQLID },
        date: { type: GraphQLString },
        waterIntake: { type: GraphQLInt },
        prenatalVitamins: {type: GraphQLBoolean },
        probiotics: { type: GraphQLBoolean },
        proteinIntake: { type: GraphQLInt },
        exercise: { type: GraphQLInt },
        kegels: { type: GraphQLInt },
        garlandPose: { type: GraphQLInt },
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
        },
        journalEntries: {
            type: new GraphQLList(JournalEntryType),
            resolve(parent, args) {
                return journalEntries
            }
        },
    }
})

module.exports =  new GraphQLSchema({
    query: RootQuery
})