import { createContext, useState } from 'react'

interface IUser {
  sucess: Boolean
  data: {
    name: string
    id: string
    email: string
    iat: number
  }
}

interface IContext {
  data: IUser
  setData: React.Dispatch<React.SetStateAction<IUser>>
}

interface IProps {
  children: JSX.Element
}

export const TrelloContext = createContext<IContext>({} as IContext)

function TrelloProvider({ children }: IProps) {
  const [data, setData] = useState<IUser>({
    sucess: false,
    data: {
      id: '',
      email: '',
      name: '',
      iat: 0,
    },
  })

  const valor = {
    setData,
    data,
  }

  return <TrelloContext.Provider value={valor}>{children}</TrelloContext.Provider>
}

export { TrelloProvider }
