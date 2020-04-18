import gql from 'graphql-tag'


export const LOGIN_USER = gql`
    query login($identifier: String!, $password: String!) {
        login(identifier: $identifier, password: $password) {
            token,
            refToken,
            username,
            email,
            bio,
            profile_img,
        }
    }
`

export const SIGNUP_USER = gql`
    mutation signup($email: String!, $username: String! , $password: String!) {
        signup(email: $email, username: $username, password: $password) {
            token,
            refToken,
            username,
            email,
            bio,
            profile_img,
        }
    }
`

export const LOGOUT_USER = gql`
    query logout($email: String!, $username: String! , $password: String!) {
        logout(email: $email, username: $username, password: $password) {
            ok,
        }
    }
`

export const GET_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            username,
            bio,
            profile_img
        },
    }
`

export const FORGET_PASSWORD = gql`
    query forget_password($email: String!) {
        forget_password(email: $email) {
            ok,
        }
    }
`

export const RESET_PASSWORD = gql`
    query reset_password($email: String!, $oldPass: String!, $newPass: String!) {
        reset_password(email: $email, oldPass: $oldPass, newPass: $newPass) {
            ok,
        }
    }
`