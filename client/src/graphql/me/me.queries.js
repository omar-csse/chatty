import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { LOGIN_USER, SIGNUP_USER } from './me.schema'


export const useLoginQuery = (values) => {
    return useLazyQuery(LOGIN_USER, { variables: values })
}

export const useSignupMutation = (values) => {
    return useMutation(SIGNUP_USER, { variables: values })
}