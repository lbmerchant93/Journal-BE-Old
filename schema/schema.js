const graphql = require('graphql');
// const _ = require('lodash');
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
                return JournalEntry.findById(args.id)
            }
        },
        journalEntries: {
            type: new GraphQLList(JournalEntryType),
            resolve(parent, args) {
                return JournalEntry.find({})
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