import { ApolloClient } from 'apollo-client';
import { gql } from 'apollo-boost';

/**
 * Append User functions to client
 * @param {ApolloClient} client apollo
 */
export default function setUserTransactions(client) {

  client.updateUser = async ( user ) => {
    return client.mutate({
      mutation: gql`
        mutation userMutation(
          $id: ID!,
          $name: String,
          $email: String,
          $role: UserRole,
          $status: UserStatus,
          $entity: String,
        ) {
          updateUser(
            id: $id,
            payload: {
              name: $name,
              email: $email,
              role: $role,
              status: $status,
              entity: $entity,
            }
          ) {
            id,
            name,
            email,
            role,
            status,
            entity,
          }
        }
      `,
      variables: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.toUpperCase(),
        status: user.status.toUpperCase(),
        entity: user.entity,
      },
    });
  };

  client.updateUserPassword = async (password) => {
    return client.mutate({
      mutation: gql`
        mutation updateUserPassword($password: String!) {
          updateUserPassword(password: $password)
        }
      `,
      variables: {
        password: password,
      },
    });
  }

  client.findUserByManufacturer = async (id) => {
    return client.query({
      query: gql`
        query userByManufacturer(
          $id: String!
        ) {
          userByManufacturer(id: $id) {
            id,
            name,
            email,
            role,
            entity,
          }
        }
      `,
      variables: { id }
    });
  };

  client.userVrifyToken = async (token) => {
    return client.query({
      query: gql`
        query userVerifyToken($token: String!) {
          userVerifyToken(token: $token) {
            id
          }
        }
      `,
      variables: {
        token,
      },
    });
  };

};
