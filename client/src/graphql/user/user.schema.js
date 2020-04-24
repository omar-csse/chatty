import gql from 'graphql-tag'


export const GET_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            username,
            bio,
            profile_img
        },
    }
`