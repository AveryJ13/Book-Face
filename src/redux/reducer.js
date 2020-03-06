const initialState = {
    user: {}
}

const GET_USER = 'GET_USER'
const LOGOUT = 'LOGOUT'

export function logout() {
    return {
        type: LOGOUT,
        payload: null
    }
}

export function get_user(userObj) {
    return {
        type: GET_USER,
        payload: userObj
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case LOGOUT:
            return { ...state, user: {} }
        case GET_USER:
            return { ...state, user: payload }
        default:
            return state
    }
}