'use client'
import { useState } from 'react'
import {
  Flex,
  Container,
  Box,
  Button,
  Image,
  UnorderedList,
  ListItem,
  Heading,
  Text,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Input,
} from '@chakra-ui/react'
import { Header } from '@/components/header'
import useSWR from 'swr'
import { api } from '@/service/api'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { BoardCreate } from '@/utils/schema/BoardCreate'
import { toast } from 'react-hot-toast'
import '../../../styles/animations/animation.css'

interface Iprops {
  params: {
    id: string
  }
}

interface ICreateBoard {
  title: string
  image?: string
  visiblied?: string
}

interface ITaskCreate {
  title: string
}

const MyPage = ({ params }: Iprops) => {
  const [boardActive, setBoardActive] = useState({
    id: '',
    active: false,
  })

  const [crateColumn, setCreateColumn] = useState({
    id: '',
    active: false,
  })

  const [menu, setMenu] = useState(false)
  const [menuCard, setMenuCard] = useState({
    id: '',
    active: false,
  })
  const [rename, setRename] = useState({
    userId: '',
    id: '',
    active: false,
  })
  const [visibility, setVisibility] = useState(false)

  const [invite, setInvite] = useState(false)
  const [infoCard, setInfoCard] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateBoard>({
    resolver: yupResolver(BoardCreate),
  })

  const { data, isLoading, mutate } = useSWR(
    `/board/listOne/${params.id}`,
    async (url) => {
      const { data } = await api.get(url)
      return data
    },
  )

  const createTask: SubmitHandler<ITaskCreate> = async (task) => {
    try {
      await api.post('/board/sub/create', {
        idColumn: !isLoading && data.id,
        id: boardActive.id,
        title: task.title,
      })

      toast.success('Task created successfully')
      mutate()
    } catch (error) {
      toast.error('Error creating task')
    }
  }

  const createColumn: SubmitHandler<ITaskCreate> = async (task) => {
    try {
      await api.post('/board/column', {
        id: crateColumn.id,
        title: task.title,
      })

      toast.success('Column created successfully')
      mutate()
    } catch (error) {
      toast.error('Error creating column')
    }
  }

  const deleteColumn = async (id: string, userId: string) => {
    try {
      await api.post('/board/delete', {
        userId,
        id,
      })

      toast.success('column removed')

      mutate()
    } catch (error) {
      toast.error('Error removing column')
    }
  }

  const renameColumn: SubmitHandler<ITaskCreate> = async (task) => {
    try {
      await api.post('board/rename', {
        id: rename.id,
        userId: rename.userId,
        title: task.title,
      })

      toast.success('Column renamed successfully')
      mutate()
    } catch (error) {
      toast.error('problem renaming column')
    }
  }

  return (
    <>
      <Header />
      <Flex as="main" justify="center" w="100%" bg="#fff">
        <Container maxW="1800px" w="95%" p="0" m="0" h="calc(100vh - 200px)">
          <Flex as="section" justify="space-between" w="100%" my="2rem">
            <Flex align="center">
              <Box pos="relative">
                <Button
                  onClick={() => setVisibility(!visibility)}
                  bg="#F2F2F2"
                  color="#828282"
                  fontWeight="500"
                  py="1.3rem"
                  px="1.5rem"
                  borderRadius="0.7rem"
                >
                  <Image
                    src="../assets/modalBoard/privado.png"
                    alt=""
                    w="20px"
                    h="20px"
                    mr="1rem"
                  />
                  Private
                </Button>
                {visibility && (
                  <Box
                    boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.05)"
                    border="1px solid #E0E0E0"
                    bg="#FFFFFF"
                    pos="absolute"
                    zIndex="2"
                    mt="1rem"
                    w="350px"
                    borderRadius="0.8rem"
                    p="1rem"
                  >
                    <Heading as="h4" fontSize="20px" color="#4F4F4F" fontWeight="600">
                      Visibility
                    </Heading>
                    <Text mt="0.5rem" mb="1.5rem" color="#828282">
                      Choose who can see to this board.
                    </Text>
                    <Box bg="#F2F2F2" p="1rem" borderRadius="0.6rem">
                      <Heading
                        as="h4"
                        fontSize="17px"
                        fontWeight="500"
                        color="#4F4F4F"
                        display="flex"
                        alignItems="center"
                      >
                        <Image
                          src="../assets/globo.png"
                          alt=""
                          w="20px"
                          h="20px"
                          mr="0.5rem"
                        />
                        Public
                      </Heading>
                      <Text mt="0.5rem" color="#828282">
                        Anyone on the internet can see this.
                      </Text>
                    </Box>

                    <Box bg="transparent" p="1rem" borderRadius="0.6rem" mt="1rem">
                      <Heading
                        as="h4"
                        fontSize="17px"
                        fontWeight="500"
                        color="#4F4F4F"
                        display="flex"
                        alignItems="center"
                      >
                        <Image
                          src="../assets/cadeado.png"
                          alt=""
                          w="20px"
                          h="20px"
                          mr="0.5rem"
                        />
                        Private
                      </Heading>
                      <Text mt="0.5rem" color="#828282">
                        Only board members can see this
                      </Text>
                    </Box>
                  </Box>
                )}
              </Box>

              <UnorderedList
                display="flex"
                alignItems="center"
                m="0 0 0 1.5rem"
                listStyleType="none"
              >
                <ListItem mr="1rem">
                  <Image
                    src="../assets/header/logoavatar.png"
                    alt=""
                    w="40px"
                    h="40px"
                    borderRadius="30%"
                  />
                </ListItem>

                <ListItem mr="1rem">
                  <Image
                    src="../assets/header/avatar3.jpg"
                    alt=""
                    w="40px"
                    h="40px"
                    borderRadius="30%"
                  />
                </ListItem>

                <ListItem mr="1rem">
                  <Image
                    src="../assets/header/avatar4.png"
                    alt=""
                    w="40px"
                    h="40px"
                    borderRadius="30%"
                  />
                </ListItem>
              </UnorderedList>

              <Box>
                <Button
                  bg="#2F80ED"
                  p="0"
                  borderRadius="30%"
                  onClick={() => setInvite(!invite)}
                >
                  <Image src="../assets/add.png" alt="" w="20px" h="20px" />
                </Button>

                {invite && (
                  <Box
                    pos="absolute"
                    bg="#FFFFFF"
                    border="1px solid #E0E0E0"
                    boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.05)"
                    p="0.8rem"
                    zIndex="2"
                    borderRadius="0.8rem"
                    mt="0.5rem"
                    w="320px"
                  >
                    <Heading as="h3" fontSize="17px" color="#4F4F4F" fontWeight="700">
                      Invite to Board
                    </Heading>

                    <Text mt="0.5rem" mb="1rem" color="#828282">
                      Search users you want to invite to
                    </Text>

                    <Flex
                      bg="#fff"
                      p="0.2rem"
                      filter="drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.10))"
                      borderRadius="0.5rem"
                      h="45px"
                    >
                      <Input
                        type="text"
                        placeholder="User..."
                        variant="unstyled"
                        px="0.5rem"
                      />
                      <Button bg="#2F80ED" h="100%" p="0.5rem 0" borderRadius="0.7rem">
                        <Image src="../assets/lupa.png" alt="" w="20px" h="20px" />
                      </Button>
                    </Flex>

                    <UnorderedList
                      border="1px solid #E0E0E0"
                      filter="drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.10))"
                      bg="#fff"
                      m="1rem 0"
                      borderRadius="0.5rem"
                      p="1rem"
                      pt="0"
                    >
                      <ListItem mt="1rem" display="flex" alignItems="center">
                        <Image
                          src="../assets/header/avatar3.jpg"
                          alt=""
                          w="50px"
                          h="50px"
                          borderRadius="0.5rem"
                          objectFit="cover"
                          mr="1rem"
                        />

                        <Heading as="h4" fontSize="17px" color="#333333">
                          Morris Croft
                        </Heading>
                      </ListItem>

                      <ListItem mt="1rem" display="flex" alignItems="center">
                        <Image
                          src="../assets/header/avatar2.jpg"
                          alt=""
                          w="50px"
                          h="50px"
                          borderRadius="0.5rem"
                          objectFit="cover"
                          mr="1rem"
                        />

                        <Heading as="h4" fontSize="17px" color="#333333">
                          Kunal Hough
                        </Heading>
                      </ListItem>

                      <ListItem mt="1rem" display="flex" alignItems="center">
                        <Image
                          src="../assets/header/avatar1.jpg"
                          alt=""
                          w="50px"
                          h="50px"
                          borderRadius="0.5rem"
                          objectFit="cover"
                          mr="1rem"
                        />

                        <Heading as="h4" fontSize="17px" color="#333333">
                          Kierran Salinas
                        </Heading>
                      </ListItem>
                    </UnorderedList>

                    <Button w="100%" bg="#2F80ED" color="#fff" fontSize="18px">
                      Invite
                    </Button>
                  </Box>
                )}
              </Box>
            </Flex>

            <Box pos="relative">
              <Button
                bg="#F2F2F2"
                color="#828282"
                fontWeight="500"
                py="1.3rem"
                borderRadius="0.7rem"
                onClick={() => setMenu(!menu)}
              >
                <Image
                  src="../assets/boards/menu.png"
                  alt=""
                  w="25px"
                  h="25px"
                  mr="1rem"
                />
                Show Menu
              </Button>

              {menu && (
                <Box
                  as="aside"
                  pos="fixed"
                  top="83px"
                  w="400px"
                  right="1px"
                  zIndex="2"
                  h="100%"
                  p="1.5rem"
                  bg="#fff"
                  overflow="auto"
                  boxShadow="0px 4px 12px 0px #0000000D"
                  animation="slideIn 0.3s ease-out;"
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    borderBottom="1px solid #E0E0E0"
                    pb="1rem"
                  >
                    <Heading fontSize="18px">Devchallenges Board</Heading>
                    <Image
                      src="../assets/excluir.png"
                      alt=""
                      w="20px"
                      h="20px"
                      cursor="pointer"
                      onClick={() => setMenu(!menu)}
                    />
                  </Flex>

                  <Flex my="0.5rem" align="center">
                    <Image src="../assets/avatar.png" alt="" w="30px" h="30px" />
                    <Text as="span" ml="0.5rem" fontWeight="500" color="#BDBDBD">
                      Made by
                    </Text>
                  </Flex>

                  <Flex align="center" my="1.5rem">
                    <Image
                      src="../assets/header/logoavatar.png"
                      alt=""
                      w="55px"
                      h="55px"
                      borderRadius="1rem"
                    />
                    <Flex display="flex" direction="column" justify="center" ml="1rem">
                      <Heading fontSize="20px">Daniel Jensen</Heading>
                      <Text as="span" pt="0.2rem" color="#BDBDBD" fontSize="15px">
                        on 4 july, 2020
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex align="center">
                    <Flex align="center" mr="1.5rem">
                      <Image
                        src="../assets/nota.png"
                        alt=""
                        mr="0.5rem"
                        w="25px"
                        h="25px"
                      />
                      <Text as="span" color="#BDBDBD" fontWeight="500" fontSize="15px">
                        Description
                      </Text>
                    </Flex>

                    <Button
                      bg="transparent"
                      borderRadius="0.8rem"
                      border="1px solid #BDBDBD"
                      color="#828282"
                      fontSize="16px"
                    >
                      <Image
                        src="../assets/lapis.png"
                        alt=""
                        w="20px"
                        h="20px"
                        mr="0.8rem"
                      />
                      Edit
                    </Button>
                  </Flex>

                  <Text my="1rem">
                    Simple board to start on a project. Each list can hold items (cards)
                    that represent ideas or tasks. There 4 lists here:
                    {''}* Backlog 🤔 : Ideas are created here. Here people can describe
                    the idea following three simple questions: Why you wish to do it, What
                    it is, how can you do it.
                    {''}* In Progress📚: Once the ideas is clearly defined, the task can
                    move to #todo stage. Here the owner of the idea can move to #doing
                    once s/he is ready. He can also wait a bit for other members to join.
                    * In Review ⚙️: On-going * Completed 🙌🏽**: Finished You could add
                    other lists like labels holding labels (with colors) in order to tag
                    each card by a label if you wish.
                  </Text>

                  <Box>
                    <Flex align="center">
                      <Image src="../assets/nota.png" alt="" w="30px" h="30px" />
                      <Text as="span" color="#BDBDBD" ml="0.3rem" fontWeight="500">
                        Team
                      </Text>
                    </Flex>
                    <UnorderedList m="0">
                      <ListItem
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt="1.5rem"
                      >
                        <Flex align="center">
                          <Image
                            src="../assets/header/logoavatar.png"
                            alt=""
                            w="40px"
                            h="40px"
                            borderRadius="0.5rem"
                          />
                          <Heading as="h3" fontSize="16px" ml="1rem">
                            Daniel Jensen
                          </Heading>
                        </Flex>

                        <Button
                          border="1px solid #EB5757"
                          color="#EB5757"
                          py="0.5rem"
                          px="1em"
                          bg="transparent"
                          borderRadius="1rem"
                          fontSize="14px"
                        >
                          Remove
                        </Button>
                      </ListItem>

                      <ListItem
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt="1.5rem"
                      >
                        <Flex align="center">
                          <Image
                            src="../assets/header/avatar1.jpg"
                            alt=""
                            w="40px"
                            h="40px"
                            borderRadius="0.5rem"
                          />
                          <Heading as="h3" fontSize="16px" ml="1rem">
                            Jensen Cloves
                          </Heading>
                        </Flex>

                        <Button
                          border="1px solid #EB5757"
                          color="#EB5757"
                          py="0.5rem"
                          px="1em"
                          bg="transparent"
                          borderRadius="1rem"
                          fontSize="14px"
                        >
                          Remove
                        </Button>
                      </ListItem>

                      <ListItem
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt="1.5rem"
                      >
                        <Flex align="center">
                          <Image
                            src="../assets/header/avatar2.jpg"
                            alt=""
                            w="40px"
                            h="40px"
                            borderRadius="0.5rem"
                          />
                          <Heading as="h3" fontSize="16px" ml="1rem">
                            Otavio Zung
                          </Heading>
                        </Flex>

                        <Button
                          border="1px solid #EB5757"
                          color="#EB5757"
                          py="0.5rem"
                          px="1em"
                          bg="transparent"
                          borderRadius="1rem"
                          fontSize="14px"
                        >
                          Remove
                        </Button>
                      </ListItem>
                    </UnorderedList>
                  </Box>
                </Box>
              )}
            </Box>
          </Flex>

          <Flex
            bg="#F8F9FD"
            justify="space-between"
            borderRadius="2rem"
            p="2rem"
            h="100%"
          >
            <Grid
              as="section"
              gridTemplateColumns={`repeat(${!isLoading && data.isDo?.length}, 320px)`}
              columnGap="2.5rem"
              overflow="auto"
              h="100%"
              w="100%"
              justifyContent="start"
              pb="2rem"
            >
              {isLoading ? (
                <h1>carregando</h1>
              ) : (
                <>
                  {data.isDo?.map((board, index) => (
                    <>
                      <Box>
                        <Box key={index}>
                          <Flex align="center" justify="space-between">
                            <Heading
                              as="h3"
                              fontSize="20px"
                              fontWeight="500"
                              lineHeight="21px"
                            >
                              {board.title}
                            </Heading>
                            <Box pos="relative">
                              <Button
                                variant="unstyled"
                                onClick={() =>
                                  setMenuCard({
                                    id: board.id,
                                    active:
                                      board.id === menuCard.id
                                        ? !menuCard.active
                                        : !false,
                                  })
                                }
                              >
                                <Image
                                  src="../assets/boards/menu.png"
                                  alt=""
                                  w="25px"
                                  h="25px"
                                />
                              </Button>
                              {menuCard.id === board.id && menuCard.active && (
                                <Box
                                  pos="absolute"
                                  bg="#fff"
                                  boxShadow="0px 2px 4px 0px #0000000D"
                                  border="1px solid #E0E0E0"
                                  zIndex="1"
                                  w="220px"
                                  borderRadius="1rem"
                                  p="1rem"
                                >
                                  <Button
                                    onClick={() =>
                                      setRename({
                                        userId: data.id,
                                        id: board.id,
                                        active: !rename.active,
                                      })
                                    }
                                    w="100%"
                                    display="flex"
                                    justifyContent="start"
                                    bg="transparent"
                                    py="1.5rem"
                                    pt="1rem"
                                    px="0"
                                    color="#828282"
                                    fontWeight="500"
                                    borderRadius="0"
                                    borderBottom="1px solid #E0E0E0"
                                    _hover={{
                                      bg: 'none',
                                      color: '#000',
                                    }}
                                  >
                                    Rename
                                  </Button>

                                  <Button
                                    onClick={() => deleteColumn(board.id, data.id)}
                                    w="100%"
                                    display="flex"
                                    justifyContent="start"
                                    bg="transparent"
                                    py="1rem"
                                    px="0"
                                    color="#828282"
                                    fontWeight="500"
                                    _hover={{
                                      bg: 'none',
                                      color: '#000',
                                    }}
                                  >
                                    Delete this list
                                  </Button>
                                </Box>
                              )}
                              {rename.active && (
                                <Modal
                                  isCentered
                                  isOpen={rename.active}
                                  onClose={() =>
                                    setRename({
                                      ...rename,
                                      active: !rename.active,
                                    })
                                  }
                                >
                                  <ModalOverlay />
                                  <ModalContent
                                    as="form"
                                    onSubmit={handleSubmit(renameColumn)}
                                    p="2rem"
                                    borderRadius="1rem"
                                  >
                                    <ModalBody p="0">
                                      <Heading fontSize="25px">Rename Column</Heading>

                                      <Input
                                        type="text"
                                        placeholder="Rename column title"
                                        filter="drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.10))"
                                        mt="1rem"
                                        h="50px"
                                        borderRadius="0.6rem"
                                        bg={errors['title'] ? '#fff0f0' : '#fff'}
                                        border={
                                          errors['title']
                                            ? '2px solid red'
                                            : '2px solid #E0E0E0'
                                        }
                                        _placeholder={{
                                          color: '#6B778C',
                                        }}
                                        {...register('title')}
                                      />

                                      <Text
                                        fontWeight="500"
                                        color="#fc3535"
                                        fontSize="13px"
                                      >
                                        {errors['title']?.message}
                                      </Text>
                                    </ModalBody>

                                    <ModalFooter p="0" mt="2rem">
                                      <Button
                                        variant="ghost"
                                        mr={3}
                                        onClick={() =>
                                          setRename({ ...rename, active: !rename.active })
                                        }
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        type="submit"
                                        bg="#2F80ED"
                                        color="#fff"
                                        fontWeight="400"
                                        borderRadius="0.6rem"
                                      >
                                        Rename
                                      </Button>
                                    </ModalFooter>
                                  </ModalContent>
                                </Modal>
                              )}
                            </Box>
                          </Flex>

                          <Box>
                            {board.card?.map((card) => (
                              <Box
                                key={card.id}
                                onClick={() => setInfoCard(!infoCard)}
                                cursor="pointer"
                                as="article"
                                my="1rem"
                                p="1rem"
                                bg="#fff"
                                boxShadow="0px 4px 12px 0px #0000000D"
                                borderRadius="1rem"
                              >
                                <Text fontWeight="500" fontSize="20px">
                                  ✋🏿 {card.title}
                                </Text>

                                <UnorderedList w="100%" m="1rem 0" listStyleType="none">
                                  <ListItem>
                                    <Text
                                      as="span"
                                      w="100%"
                                      bg="#EBDCF9"
                                      px="0.8rem"
                                      py="0.3rem"
                                      fontSize="14px"
                                      fontWeight="500"
                                      borderRadius="1rem"
                                      color="#9B51E0"
                                    >
                                      Concept
                                    </Text>
                                  </ListItem>
                                </UnorderedList>

                                <Button
                                  bg="#2F80ED"
                                  p="0.5rem"
                                  h="100%"
                                  borderRadius="0.7rem"
                                >
                                  <Image
                                    src="../assets/add.png"
                                    alt=""
                                    w="20px"
                                    h="20px"
                                  />
                                </Button>
                              </Box>
                            ))}
                          </Box>

                          <Button
                            onClick={() =>
                              setBoardActive({
                                id: board.id,
                                active: !boardActive.active,
                              })
                            }
                            w="100%"
                            display="flex"
                            justifyContent="space-between"
                            bg="#DAE4FD"
                            color="#2F80ED"
                            fontWeight="500"
                            py="1.4rem"
                            borderRadius="0.8rem"
                            mt="2rem"
                          >
                            Add another add
                            <Image
                              src="../assets/boards/add.png"
                              alt=""
                              w="20px"
                              h="20px"
                            />
                          </Button>

                          <Modal
                            isOpen={boardActive.active}
                            onClose={() =>
                              setBoardActive({ ...boardActive, active: false })
                            }
                          >
                            <ModalOverlay />
                            <ModalContent
                              as="form"
                              onSubmit={handleSubmit(createTask)}
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
                                  border={
                                    errors['title']
                                      ? '2px solid red'
                                      : '2px solid #E0E0E0'
                                  }
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
                                <Button
                                  variant="ghost"
                                  mr={3}
                                  onClick={() => {
                                    setBoardActive({ ...boardActive, active: false })
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  type="submit"
                                  bg="#2F80ED"
                                  color="#fff"
                                  fontWeight="400"
                                  borderRadius="0.6rem"
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

                        <Modal isOpen={infoCard} onClose={() => setInfoCard(!infoCard)}>
                          <ModalOverlay />
                          <ModalContent
                            p="1.5rem"
                            borderRadius="0.5rem"
                            w="50%"
                            maxW="900px"
                            my="2rem"
                          >
                            <ModalBody p="0">
                              <Image
                                src="../assets/trabalho.jpg"
                                alt=""
                                w="100%"
                                h="200px"
                                objectFit="cover"
                                borderRadius="1rem"
                              />
                              <Flex
                                as="section"
                                justifyContent="space-between"
                                mt="2.5rem"
                              >
                                <Box w="100%">
                                  <Heading as="h2" fontWeight="400" fontSize="20px">
                                    ✋🏿 Move anything that is actually started here
                                  </Heading>
                                  <Text mt="0.5rem" fontWeight="600" color="#BDBDBD">
                                    in list
                                    <Text as="span" color="#333333" ml="0.5rem">
                                      In Progress
                                    </Text>
                                  </Text>

                                  <Flex align="center" mt="2rem" mb="1rem">
                                    <Flex align="center" mr="1.5rem">
                                      <Image
                                        src="../assets/nota.png"
                                        alt=""
                                        mr="0.5rem"
                                        w="25px"
                                        h="25px"
                                      />
                                      <Text
                                        as="span"
                                        color="#BDBDBD"
                                        fontWeight="500"
                                        fontSize="15px"
                                      >
                                        Description
                                      </Text>
                                    </Flex>

                                    <Button
                                      bg="transparent"
                                      borderRadius="0.9rem"
                                      border="1px solid #BDBDBD"
                                      color="#828282"
                                      fontSize="16px"
                                    >
                                      <Image
                                        src="../assets/lapis.png"
                                        alt=""
                                        w="20px"
                                        h="20px"
                                        mr="0.8rem"
                                      />
                                      Edit
                                    </Button>
                                  </Flex>

                                  <Text fontSize="19px" color="#000">
                                    Ideas are created and share here through a card. Here
                                    you can describe what youd like to accomplish. For
                                    example you can follow three simple questions to
                                    create the card related to your idea: * Why ? (Why do
                                    you wish to do it ?) * What ? (What it is it, what are
                                    the goals, who is concerned) * How ? (How do you think
                                    you can do it ? What are the required steps ?) After
                                    creation, you can move your card to the todo list.
                                  </Text>

                                  <Box as="article">
                                    <Flex
                                      direction="column"
                                      align="end"
                                      border="1px solid #E0E0E0"
                                      boxShadow="0px 2px 8px 0px rgba(0, 0, 0, 0.10)"
                                      borderRadius="0.8rem"
                                      my="2rem"
                                      p="1rem"
                                    >
                                      <Flex align="center" w="100%" h="60px">
                                        <Image
                                          src="../assets/header/logoavatar.png"
                                          alt=""
                                          w="50px"
                                          h="50px"
                                          objectFit="cover"
                                          borderRadius="0.5rem"
                                          mr="1rem"
                                        />
                                        <Input
                                          type="text"
                                          placeholder="Write a comment..."
                                          h="100%"
                                          border="none"
                                          variant="unstyled"
                                          _placeholder={{
                                            fontSize: '23px',
                                            color: '#BDBDBD',
                                          }}
                                          p="0.5rem"
                                        />
                                      </Flex>

                                      <Button
                                        bg="#2F80ED"
                                        color="#fff"
                                        fontWeight="500"
                                        borderRadius="1rem"
                                        mt="1rem"
                                      >
                                        Comment
                                      </Button>
                                    </Flex>

                                    <UnorderedList m="0">
                                      <ListItem
                                        listStyleType="none"
                                        mt="2.5rem"
                                        py="2rem"
                                        borderBottom="1px solid #F2F2F2"
                                      >
                                        <Flex justify="space-between" align="center">
                                          <Flex align="center">
                                            <Image
                                              src="../assets/header/logoavatar.png"
                                              alt=""
                                              w="50px"
                                              h="50px"
                                              objectFit="cover"
                                              borderRadius="0.5rem"
                                            />

                                            <Box ml="1rem">
                                              <Heading
                                                as="h3"
                                                fontSize="18.5px"
                                                fontWeight="500"
                                              >
                                                Mikael Stanley
                                              </Heading>
                                              <Text
                                                as="span"
                                                color="#BDBDBD"
                                                letterSpacing="-0.35px"
                                              >
                                                24 August at 20:43
                                              </Text>
                                            </Box>
                                          </Flex>

                                          <Flex align="center">
                                            <Button
                                              variant="unstyled"
                                              color="#828282"
                                              fontWeight="500"
                                              fontSize="15px"
                                            >
                                              Edit
                                            </Button>
                                            <Box
                                              mx="0.5rem"
                                              w="10px"
                                              h="2px"
                                              bg="#828282"
                                            ></Box>
                                            <Button
                                              variant="unstyled"
                                              color="#828282"
                                              fontWeight="500"
                                              fontSize="15px"
                                            >
                                              Delete
                                            </Button>
                                          </Flex>
                                        </Flex>

                                        <Text mt="1rem" color="#4F4F4F" fontSize="20px">
                                          “The gladdest moment in human life, methinks, is
                                          a departure into unknown lands.” – Sir Richard
                                          Burton
                                        </Text>
                                      </ListItem>

                                      <ListItem listStyleType="none" mt="2.5rem">
                                        <Flex justify="space-between" align="center">
                                          <Flex align="center">
                                            <Image
                                              src="../assets/header/logoavatar.png"
                                              alt=""
                                              w="50px"
                                              h="50px"
                                              objectFit="cover"
                                              borderRadius="0.5rem"
                                            />

                                            <Box ml="1rem">
                                              <Heading
                                                as="h3"
                                                fontSize="18.5px"
                                                fontWeight="500"
                                              >
                                                Mikael Stanley
                                              </Heading>
                                              <Text
                                                as="span"
                                                color="#BDBDBD"
                                                letterSpacing="-0.35px"
                                              >
                                                24 August at 20:43
                                              </Text>
                                            </Box>
                                          </Flex>

                                          <Flex align="center">
                                            <Button
                                              variant="unstyled"
                                              color="#828282"
                                              fontWeight="500"
                                              fontSize="15px"
                                            >
                                              Edit
                                            </Button>
                                            <Box
                                              mx="0.5rem"
                                              w="10px"
                                              h="2px"
                                              bg="#828282"
                                            ></Box>
                                            <Button
                                              variant="unstyled"
                                              color="#828282"
                                              fontWeight="500"
                                              fontSize="15px"
                                            >
                                              Delete
                                            </Button>
                                          </Flex>
                                        </Flex>

                                        <Text mt="1rem" color="#4F4F4F" fontSize="20px">
                                          “The gladdest moment in human life, methinks, is
                                          a departure into unknown lands.” – Sir Richard
                                          Burton
                                        </Text>
                                      </ListItem>
                                    </UnorderedList>
                                  </Box>
                                </Box>

                                <Box as="aside" w="35%" ml="2rem">
                                  <Heading
                                    as="h4"
                                    display="flex"
                                    alignItems="center"
                                    fontSize="15px"
                                    color="#BDBDBD"
                                    fontWeight="600"
                                  >
                                    <Image
                                      src="../assets/avatar.png"
                                      alt=""
                                      w="30px"
                                      h="30px"
                                      mr="0.5rem"
                                    />
                                    Actions
                                  </Heading>

                                  <Box mt="1rem">
                                    <Button
                                      w="100%"
                                      bg="#F2F2F2"
                                      display="flex"
                                      justifyContent="start"
                                      px="1rem"
                                      py="1.5rem"
                                      color="#828282"
                                    >
                                      <Image
                                        src="../assets/bandeira.png"
                                        alt=""
                                        w="20px"
                                        h="20px"
                                        mr="1rem"
                                      />
                                      Labels
                                    </Button>
                                  </Box>

                                  <Box mt="1rem">
                                    <Button
                                      w="100%"
                                      bg="#F2F2F2"
                                      display="flex"
                                      justifyContent="start"
                                      px="1rem"
                                      py="1.5rem"
                                      color="#828282"
                                    >
                                      <Image
                                        src="../assets/modalBoard/fotografia.png"
                                        alt=""
                                        w="20px"
                                        h="20px"
                                        mr="0.5rem"
                                      />
                                      Cover
                                    </Button>
                                  </Box>

                                  <Box mt="2rem">
                                    <Text
                                      as="span"
                                      display="flex"
                                      alignItems="center"
                                      fontSize="15px"
                                      color="#BDBDBD"
                                      fontWeight="600"
                                    >
                                      <Image
                                        src="../assets/pessoas.png"
                                        alt=""
                                        w="20px"
                                        h="20px"
                                        mr="1rem"
                                      />
                                      Members
                                    </Text>

                                    <UnorderedList m="0">
                                      <ListItem
                                        display="flex"
                                        alignItems="center"
                                        mt="1rem"
                                      >
                                        <Image
                                          src="../assets/header/avatar1.jpg"
                                          alt=""
                                          w="45px"
                                          h="45px"
                                          borderRadius="0.5rem"
                                          mr="1rem"
                                        />
                                        <Heading as="h4" fontSize="15px">
                                          Daniel Jensen
                                        </Heading>
                                      </ListItem>

                                      <ListItem
                                        display="flex"
                                        alignItems="center"
                                        mt="1rem"
                                      >
                                        <Image
                                          src="../assets/header/avatar2.jpg"
                                          alt=""
                                          w="45px"
                                          h="45px"
                                          borderRadius="0.5rem"
                                          mr="1rem"
                                        />
                                        <Heading as="h4" fontSize="15px">
                                          Bianca Sosa
                                        </Heading>
                                      </ListItem>

                                      <ListItem
                                        display="flex"
                                        alignItems="center"
                                        mt="1rem"
                                      >
                                        <Image
                                          src="../assets/header/avatar3.jpg"
                                          alt=""
                                          w="45px"
                                          h="45px"
                                          borderRadius="0.5rem"
                                          mr="1rem"
                                        />
                                        <Heading as="h4" fontSize="15px">
                                          Waqar Bloom
                                        </Heading>
                                      </ListItem>
                                    </UnorderedList>

                                    <Button
                                      w="100%"
                                      display="flex"
                                      justifyContent="space-between"
                                      bg="#DAE4FD"
                                      color="#2F80ED"
                                      fontWeight="500"
                                      py="1.4rem"
                                      borderRadius="0.8rem"
                                      mt="2rem"
                                    >
                                      Assign a member
                                      <Image
                                        src="../assets/boards/add.png"
                                        alt=""
                                        w="20px"
                                        h="20px"
                                      />
                                    </Button>
                                  </Box>
                                </Box>
                              </Flex>
                            </ModalBody>
                          </ModalContent>
                        </Modal>
                      </Box>
                    </>
                  ))}
                </>
              )}
            </Grid>

            <Button
              onClick={() =>
                setCreateColumn({
                  id: `${!isLoading && data.id}`,
                  active: !crateColumn.active,
                })
              }
              w="100%"
              maxW="250px"
              display="flex"
              justifyContent="space-between"
              bg="#DAE4FD"
              color="#2F80ED"
              fontWeight="500"
              py="1.4rem"
              borderRadius="0.8rem"
              ml="2.5rem"
            >
              Add another this
              <Image src="../assets/boards/add.png" alt="" w="20px" h="20px" />
            </Button>

            <Modal
              isCentered
              isOpen={crateColumn.active}
              onClose={() => setCreateColumn({ ...crateColumn, active: false })}
            >
              <ModalOverlay />
              <ModalContent
                as="form"
                onSubmit={handleSubmit(createColumn)}
                p="2rem"
                borderRadius="1rem"
              >
                <ModalBody p="0">
                  <Heading fontSize="25px">Create column task</Heading>

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
                </ModalBody>

                <ModalFooter p="0" mt="2rem">
                  <Button
                    variant="ghost"
                    mr={3}
                    onClick={() => setCreateColumn({ ...crateColumn, active: false })}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    bg="#2F80ED"
                    color="#fff"
                    fontWeight="400"
                    borderRadius="0.6rem"
                  >
                    <Image
                      src="../assets/add.png"
                      alt="white cross image, to add card"
                      h="15px"
                      w="15px"
                      mr="0.5rem"
                    />
                    Column task Create
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>
        </Container>
      </Flex>
    </>
  )
}

export default MyPage
