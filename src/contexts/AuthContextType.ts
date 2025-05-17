

export type User =  {
    displayName: string | null;
    photoURL: string | null;
}

export type State = {
    user: User | null;
    isAuthenticated: boolean
    error: boolean
    isLoading: boolean
}

type LoginAction = {
    type: 'login'
    payload: User | null
}

type ErrorAction = {
    type: 'errorAuth'
}

type LogoutAction = {
    type: 'logout'
}

type LoadingAction = {
    type: 'loading'
}

export type AuthAction = LoginAction | LogoutAction | ErrorAction | LoadingAction


export type AuthContextType  = {
    user: User | null
    isAuthenticated: boolean
    error: boolean
    login: ( user: User ) => void
    logout: () => void
    isLoading: boolean
}