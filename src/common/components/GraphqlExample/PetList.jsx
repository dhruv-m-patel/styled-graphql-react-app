import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Table from 'react-bootstrap/Table';

const PETS_BY_USERS = gql`
  query Pets($ownerId: String) {
    pets (ownerId: $ownerId) {
      id
      name
      type
      owner {
        username
      }
    }
  }
`;

export default function PetList({
  ownerId,
}) {
  const { data, loading, error } = useQuery(PETS_BY_USERS, {
    variables: { ownerId },
  });

  if (loading) {
    return (
      <p>Loading pets data...</p>
    );
  }

  if (error) {
    return (
      <p style={{ color: 'red' }}>Error retrieving pets data: {JSON.stringify(error)}</p>
    );
  }

  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Pet Name</th>
          <th>Type</th>
          <th>Owner</th>
        </tr>
      </thead>
      <tbody>
        {data.pets.map(pet => (
          <tr key={pet.id}>
            <td>{pet.id}</td>
            <td>{pet.name}</td>
            <td>{pet.type}</td>
            <td>{pet.owner.username}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

PetList.propTypes = {
  ownerId: PropTypes.string,
};

PetList.defaultProps = {
  ownerId: undefined,
};
