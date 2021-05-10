const { gql } = require('apollo-server');

module.exports = gql`
  type JournalEntry {
    id: ID!
    date: String!
    waterIntake: Int
    prenatalVitamins: Boolean!
    probiotics: Boolean!
    proteinIntake: Int
    exercise: Int
    kegels: Int
    garlandPose: Int
    userId: String!
  }
  input CreateJournalEntryInput {
    date: String!
    waterIntake: Int
    prenatalVitamins: Boolean!
    probiotics: Boolean!
    proteinIntake: Int
    exercise: Int
    kegels: Int
    garlandPose: Int
    userId: String!
  }
  input DeleteJournalEntryInput {
    id: ID!
  }
  type DeletePayload{
    id: ID!
  }
  type Query {
    journalEntries: [JournalEntry]
  }
  type Mutation {
    createJournalEntry(input: CreateJournalEntryInput!): JournalEntry!
    deleteJournalEntry(id: ID!): DeletePayload!
  }
  
`;