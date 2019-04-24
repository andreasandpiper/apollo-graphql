import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { GET_CONTACTS } from './Contacts'

const CREATE_CONTACT = gql`
  mutation addContact($firstName: String!, $lastName: String!) {
    addContact(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

const AddContact = () => {
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')

  const optimisticResponse = {
    addContact: {
      id: require('crypto').randomBytes(5).toString('hex'),
      __typename: 'Book', // changing the __typename doesnt seem to matter
      firstName,
      lastName
    }
  }

  const writeToCache = (cache, { data: {addContact} }) => {
    // update is called AFTER completion of mutation
    // yet is also called with the optimisticResponse
    const { contacts } = cache.readQuery({ query: GET_CONTACTS })
    cache.writeQuery({
      query: GET_CONTACTS,
      data: { contacts: contacts.concat([addContact])}
    })
    setLastName('')
    setFirstName('')
  }

  return (
    <Mutation
      mutation={CREATE_CONTACT}
      variables={{ firstName, lastName }}
      optimisticResponse={optimisticResponse}
      update={writeToCache}
    >
      {(addContact) => (
        <div>
          <input value={firstName} placeholder='first name' onChange={(e) => setFirstName(e.target.value)} />
          <input value={lastName} placeholder='last name' onChange={(e) => setLastName(e.target.value)} />
          <button onClick={addContact}>Submit</button>
        </div>
      )}
    </Mutation>
  )
}

export default AddContact
