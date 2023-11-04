'use client'
import { useContext } from 'react'
import { Header } from '../components/header'
import {
  Image,
  Heading,
  Button,
  Container,
  Flex,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Input,
  Text,
} from '@chakra-ui/react'
import { BoardCard } from '../components/boardCard'
import useSWR from 'swr'
import { api } from '../service/api'
import { SkeletonLoading } from '../components/Skeleton'
import { useForm, SubmitHandler } from 'react-hook-form'
import { BoardCreate } from '../utils/schema/BoardCreate'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-hot-toast'
import { TrelloContext } from '../context/TrelloContext'
import { PrivateRouter } from './PrivateRouter'

interface IBoardCard {
  id: string
  image: string
  name: string
}

interface ICreateBoard {
  title: string
  image?: string
  visiblied?: string
}

const MyPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateBoard>({
    resolver: yupResolver(BoardCreate),
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: user } = useContext(TrelloContext)

  const { data, isLoading, mutate } = useSWR(
    `/board/list/${user?.data.id}`,
    async (url) => {
      const { data } = await api.get(url)
      return data
    },
  )

  const createBoardSubmit: SubmitHandler<ICreateBoard> = async ({ title }) => {
    try {
      await api.post('/board/create', { title, id: user.data.id })

      toast.success('Card Creation Complete')
      mutate()
    } catch (error) {
      toast.error('Card already present on the board')
    }
  }

  return (
    <>
      <PrivateRouter>
        <Header />
        <Flex as="section" justify="center">
          <Container m="0" p="0" maxW="1400px" w="95%" mt="4rem" data-aos="fade-right">
            <Flex justify="space-between" align="center">
              <Heading as="h3" fontSize="20px" fontWeight="600">
                All Boards
              </Heading>

              <Box>
                <Button
                  onClick={onOpen}
                  bg="#2F80ED"
                  color="#fff"
                  fontWeight="400"
                  w="100px"
                  py="1.3rem"
                  borderRadius="0.8rem"
                >
                  <Image
                    src="../assets/add.png"
                    alt="white cross image, to add card"
                    h="15px"
                    w="15px"
                    mr="0.5rem"
                  />
                  Add
                </Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent
                    as="form"
                    onSubmit={handleSubmit(createBoardSubmit)}
                    p="2rem"
                    borderRadius="1rem"
                  >
                    <ModalBody p="0">
                      <Image
                        src="../assets/trabalho.jpg"
                        alt=""
                        w="100%"
                        h="150px"
                        objectFit="cover"
                        borderRadius="0.8rem"
                      />

                      <Input
                        type="text"
                        placeholder="Add board title"
                        filter="drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.10))"
                        mt="1rem"
                        h="50px"
                        borderRadius="0.6rem"
                        bg={errors['title'] ? '#fff0f0' : '#fff'}
                        border={errors['title'] ? '2px solid red' : '2px solid #E0E0E0'}
                        _placeholder={{
                          color: '#6B778C',
                        }}
                        {...register('title')}
                      />

                      <Text fontWeight="500" color="#fc3535" fontSize="13px">
                        {errors['title']?.message}
                      </Text>

                      <Flex justify="space-between" mt="2rem">
                        <Button
                          w="100%"
                          bg="#F2F2F2"
                          mr="1rem"
                          py="1.5rem"
                          color="#828282"
                          fontWeight="500"
                          display="flex"
                          justifyContent="start"
                          borderRadius="0.7rem"
                        >
                          <Image
                            src="../assets/modalBoard/fotografia.png"
                            alt="image of an entirely gray landscape, with a white triangle looking like a mountain"
                            w="20px"
                            h="20px"
                            mr="0.5rem"
                          />
                          Cover
                        </Button>
                        <Button
                          w="100%"
                          bg="#F2F2F2"
                          ml="1rem"
                          py="1.5rem"
                          color="#828282"
                          fontWeight="500"
                          display="flex"
                          justifyContent="start"
                          borderRadius="0.7rem"
                        >
                          <Image
                            src="../assets/modalBoard/privado.png"
                            alt="image of a private all gray padlock"
                            w="20px"
                            h="20px"
                            mr="0.5rem"
                          />
                          Private
                        </Button>
                      </Flex>
                    </ModalBody>

                    <ModalFooter p="0" mt="2rem">
                      <Button variant="ghost" mr={3} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        bg="#2F80ED"
                        color="#fff"
                        fontWeight="400"
                        borderRadius="0.6rem"
                        type="submit"
                      >
                        <Image
                          src="../assets/add.png"
                          alt="white cross image, to add card"
                          h="15px"
                          w="15px"
                          mr="0.5rem"
                        />
                        Create
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Box>
            </Flex>

            <Flex justify="space-between" mt="2rem" data-aos="fade-right">
              {isLoading ? (
                <>
                  <SkeletonLoading />
                  <SkeletonLoading />
                  <SkeletonLoading />
                  <SkeletonLoading />
                </>
              ) : (
                <>
                  {data?.length <= 0 && (
                    <Text as="span" color="#303030" fontSize="18px">
                      Até o momento, não há nenhum card disponível. Crie um clicando no
                      botão Criar
                    </Text>
                  )}

                  {data?.map(({ id, image, name }: IBoardCard) => (
                    <BoardCard
                      key={id}
                      image={image}
                      title={name}
                      personArray={[
                        '../assets/header/logoavatar.png',
                        '../assets/header/avatar3.jpg',
                        '../assets/header/avatar4.png',
                      ]}
                    />
                  ))}
                </>
              )}
            </Flex>
          </Container>
        </Flex>
      </PrivateRouter>
    </>
  )
}

export default MyPage
