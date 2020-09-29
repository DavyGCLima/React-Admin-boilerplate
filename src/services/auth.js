import { gql } from 'apollo-boost';

export const TOKEN_KEY = "@laucher-admin-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

/**
 * Append Auth functions to client
 * @param {ApolloClient} client apollo
 */
export default function setAuthTransactions(client) {

  client.resetPassword = async (email) => {
    return client.query({
      query: gql`
        query forgotPasswordSendEmail($email: String!) {
          userForgotPasswordSendEmail(email: $email)
        }
      `,
      variables: {
        email: email,
      },
    });
  }

  client.userLogin = async (email, password) => {
    return client.query({
      query: gql`
        query userLogin(
          $email: String!
          $password: String!
        ) {
          userLogin(
            email: $email,
            password: $password
          ) {
            token
          }
        }
      `,
      variables: {
        email,
        password
      },
      context: {
        headers: {
          application: 'default',
         }
      }
    });
  }

  client.userVerifyToken = async (token) => {
    return client.query({
      query: gql`
        query userVerifyToken(
          $token: String!
        ) {
          userVerifyToken(
            token: $token,
          ) {
            id,
            name,
            email,
            status,
            role,
            entity,
          }
        }
      `,
      variables: {
        token,
      },
    });
  }
}

/**
 * Store the JWT token to login user
 * @param {String} token JWT to be store
 */
export function login(token) {
  localStorage.setItem(TOKEN_KEY, token);
};

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
};
