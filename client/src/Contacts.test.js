import React from "react";
import Contacts, { GET_CONTACTS } from "./Contacts";
import { MockedProvider } from 'react-apollo/test-utils';
import TestRenderer from 'react-test-renderer'; // ES6


describe(Contacts, () => {
  const mocks = [
    {
      request: { GET_CONTACTS },
      result: {
        data: [
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
      }
    }
  ]

  it('renders without error', () => {
    TestRenderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Contacts />
      </MockedProvider>,
    );
  });

  //
  // it('render contacts component', () => {
  //   const wrapper = mount(
  //     <MockedProvider mocks={[]} addTypename={false}>
  //       <Contacts />
  //     </MockedProvider>
  //   )
  //
  //   expect(wrapper.text()).to.equal('Loading')
  // })
})
