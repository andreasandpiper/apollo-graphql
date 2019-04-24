const contacts = [
  {
    id: 1,
    firstName: 'Bob',
    lastName: 'Bark'
  },
  {
    id: 2,
    firstName: 'Joe',
    lastName: 'Job'
  }
]

export const resolvers = {
  Query: {
    contacts: () => contacts,
  },
  Mutation: {
    addContact: (root, args) => {
      const newId = require('crypto').randomBytes(5).toString('hex')
      const newContact = { id: newId, firstName: args.firstName, lastName: args.lastName}
      contacts.push(newContact)
      return newContact
    }
  }
}
