'use client'
import { Header } from '@/components/header'
import { api } from '@/service/api'
import {
  Flex,
  Container,
  Heading,
  UnorderedList,
  ListItem,
  Text,
  Button,
} from '@chakra-ui/react'
import { toast } from 'react-hot-toast'
import useSWR from 'swr'

const myPage = () => {
  const { data: user } = JSON.parse(localStorage.getItem('user') || '{}')

  const { data, isLoading } = useSWR(`/board/invites/all/${user.id}`, async (url) => {
    const { data } = await api.get(url)

    return data
  })

  const acceptInvite = async (idBoard: string) => {
    try {
      await api.post('/board/invite/accept', {
        idBoard,
        idUser: user.id,
      })

      toast.success('invitation accepted')
    } catch (err) {
      toast.error('invitation declined')
    }
  }

  return (
    <>
      <Header />
      <Flex as="main" justify="center">
        <Container maxW="1800px" w="95%" p="0" m="0">
          <Heading mt="3.5rem" fontSize="30px">
            Invitations to join the board
          </Heading>

          <UnorderedList m="0">
            {isLoading ? (
              <h1>carregando</h1>
            ) : (
              data.map((board, index) => (
                <ListItem
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom="1px solid #c1c1c197"
                  py="1rem"
                >
                  <Text>{board.name}</Text>
                  <Button bg="green" color="#fff" onClick={() => acceptInvite(board.id)}>
                    Entrar
                  </Button>
                </ListItem>
              ))
            )}
          </UnorderedList>
        </Container>
      </Flex>
    </>
  )
}

export default myPage
