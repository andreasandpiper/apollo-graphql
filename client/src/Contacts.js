import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

// the standard to name the query is the COmponent name + Query
export const GET_CONTACTS = gql`
  {
    contacts {
      id
      firstName
      lastName
    }
  }
`

const Contacts = () => (
  <Query query={GET_CONTACTS}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      return (
        <ul>
          {data.contacts.map( item => {
            return <li key={item.id}>{item.firstName} {item.lastName}</li>
          })}
        </ul>
      )

    }}
  </Query>
)

export default Contacts
