import { useEffect, useState, useContext, ReactNode, FC } from 'react'
import { api } from '../service/api'
import { TrelloContext } from '../context/TrelloContext'
import { useRouter } from 'next/navigation'

interface IProps {
  children: ReactNode
}

const PrivateRouter: FC<IProps> = ({ children }: IProps): JSX.Element => {
  const { setData } = useContext(TrelloContext)
  const Router = useRouter()

  const token = localStorage.getItem('token')
  const [navigate, setNavigate] = useState(false)

  useEffect(() => {
    const authenticated = async () => {
      try {
        const { data } = await api.get('/user/me/verify', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (data.sucess) {
          localStorage.setItem('user', JSON.stringify(data))
          setData(data)
        }
      } catch (error) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setNavigate(!navigate)
      }
    }
    authenticated()
  }, [navigate, setData, token])

  if (!token) {
    localStorage.removeItem('user')
    Router.push('/user/signin')
  }

  if (navigate) Router.push('/user/signin')

  return <>{children}</>
}

export { PrivateRouter }
