import { loginTypes } from "../types/loginTypes";
const initialState = {
    user: {
        name: '',
        email: '',
        location: [],
        birthday: '',
        administrator: false,
        phoneNumer: '',
        photo: '',
        cellphone:'',
        cards:[]
    },
    error: {
        status: undefined,
        message: ''
    },
    loading: false,
    isLogged: false
}

export const loginReducer = (state = initialState, action ) =>{
    switch(action.type){
        case loginTypes.CREATE_USER:
            return {
                ...state,
                user: {
                    name: action.payload.user.name,
                    email: action.payload.user.email,
                    location: action.payload.user.location,
                    birthday: action.payload.user.birthday,
                    administrator: action.payload.user.administrator,
                    phoneNumer: action.payload.user.phoneNumer,
                    photo: action.payload.user.photo,
                    cellphone: action.payload.user.cellphone,
                    cards:action.payload.user.cards,
                },
                error: {
                    status: action.payload.error.status,
                    message: action.payload.error.message
                }
            }
        case loginTypes.LOGIN_USER:
            return {
                ...state,
                ...action.payload
            }
        case loginTypes.UPDATE_USER:
            return {
                ...state,
                ...action.payload,
            };
        case loginTypes.LOGOUT_USER:
            return{
                ...initialState
            }  
        case loginTypes.TOGGLE_LOADING:
            return {
                ...state,
                loading: !state.loading
            }
        case loginTypes.TOGGLE_LOGIN:
            return {
               ...state,
                isLogged: !state.isLogged
            }

        default:
            return state;
    }
}