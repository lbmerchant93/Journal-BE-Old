const graphql = require('graphql');
const _ = require('lodash');
const JournalEntry = require('../models/journalEntry');

const { 
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLObjectType,  
    GraphQLSchema,
    GraphQLError,
    GraphQLNonNull 
} = graphql;

// dummy data
// let journalEntries = [
//     {id: '1', date: '03/05/2021', waterIntake: 80, prenatalVitamins: true, probiotics: false, proteinIntake: 50, exercise: 30, kegels: 50, garlandPose: 6, userId: 1},
//     {id: '2', date: '04/05/2021', waterIntake: 75, prenatalVitamins: true, probiotics: true, proteinIntake: 60, exercise: 10, kegels: 60, garlandPose: 7, userId: 1},
//     {id: '3', date: '05/05/2021', waterIntake: 85, prenatalVitamins: false, probiotics: true, proteinIntake: 70, exercise: 20, kegels: 70, garlandPose: 8, userId: 1},
// ];

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
        userId: { type: GraphQLID }
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
                // return _.find(journalEntries, { id: args.id });
            }
        },
        journalEntries: {
            type: new GraphQLList(JournalEntryType),
            resolve(parent, args) {
                // return journalEntries
            }
        },
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addJournalEntry: {
            type: JournalEntryType,
            args: {
                date: { type: new GraphQLNonNull(GraphQLString) },
                waterIntake: { type: new GraphQLNonNull(GraphQLInt) },
                prenatalVitamins: {type: new GraphQLNonNull(GraphQLBoolean) },
                probiotics: { type: new GraphQLNonNull(GraphQLBoolean) },
                proteinIntake: { type: new GraphQLNonNull(GraphQLInt) },
                exercise: { type: new GraphQLNonNull(GraphQLInt) },
                kegels: { type: new GraphQLNonNull(GraphQLInt) },
                garlandPose: { type: new GraphQLNonNull(GraphQLInt) },
                userId: { type: new GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
                let journalEntry = new JournalEntry({
                    date: args.date,
                    waterIntake: args.waterIntake,
                    prenatalVitamins: args.prenatalVitamins,
                    probiotics: args.probiotics,
                    proteinIntake: args.proteinIntake,
                    exercise: args.exercise,
                    kegels: args.kegels,
                    garlandPose: args.garlandPose,
                    userId: args.userId
                })

                try {
                    const savedJournalEntry = await journalEntry.save();
                    return journalEntry;
                } catch (err) {
                    const error = new GraphQLError(err)
                }
            }
        }
    }
})

module.exports =  new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})