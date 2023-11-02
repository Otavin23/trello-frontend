import { createContext, useState } from 'react'

export const TrelloContext = createContext({})

function TrelloProvider({ children }) {
  const [data, setData] = useState()

  const valor = {
    setData,
    data,
  }

  return <TrelloContext.Provider value={valor}>{children}</TrelloContext.Provider>
}

export { TrelloProvider }
