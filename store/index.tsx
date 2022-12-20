import React, { createContext, useReducer, type Dispatch } from 'react'
import Cookies from 'js-cookie'

export const Store = createContext(null);

const initialState: {
    favorites: string[],
} = {
    favorites: Cookies.get("favorites") ? JSON.parse(Cookies.get("favorites")) : []
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'ADD':
            const wordExist = state.favorites.find((word: string) => word == action.payload.word)
            const newFavorites = wordExist ? [...state.favorites] : [ ...state.favorites, action.payload.word]
            Cookies.set("favorites", JSON.stringify(newFavorites))
            return { ...state, favorites: newFavorites}
        case 'REMOVE':
            const favorites = state.favorites.filter(word => word != action.payload.word)
            Cookies.set("favorites", JSON.stringify(favorites))
            return { ...state, favorites: favorites}
    }
}

function StoreProvider({children}: any) {

    const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Store.Provider value={{state, dispatch}}>
        {children}
    </Store.Provider>
  )
}

export default StoreProvider