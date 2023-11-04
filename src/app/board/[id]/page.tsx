'use client'

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
} from '@chakra-ui/react'
import { Header } from '@/components/header'

interface Iprops {
  params: {
    id: string
  }
}

const MyPage = ({ params }: Iprops) => {
  return (
    <>
      <Header />

      <Flex as="main" justify="center" w="100%" h="calc(100vh - 0vh)" bg="#fff">
        <Container maxW="1800px" w="95%" p="0" m="0" h="100%">
          <Flex as="section" justify="space-between" w="100%" my="2rem">
            <Flex align="center">
              <Button
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
                    src="../assets/header/avatar2.jpg"
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

              <Button bg="#2F80ED" p="0" borderRadius="30%">
                <Image src="../assets/add.png" alt="" w="20px" h="20px" />
              </Button>
            </Flex>

            <Box>
              <Button
                bg="#F2F2F2"
                color="#828282"
                fontWeight="500"
                py="1.3rem"
                borderRadius="0.7rem"
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
            </Box>
          </Flex>

          <Flex as="section" bg="#F8F9FD" h="100%" borderRadius="2rem" p="2rem">
            <Box w="300px">
              <Flex align="center" justify="space-between">
                <Heading as="h3" fontSize="20px" fontWeight="500" lineHeight="21px">
                  Backlog 🤔
                </Heading>
                <Box>
                  <Button variant="unstyled">
                    <Image src="../assets/boards/menu.png" alt="" w="25px" h="25px" />
                  </Button>
                </Box>
              </Flex>

              <Box>
                <Box
                  as="article"
                  my="1rem"
                  p="1rem"
                  bg="#fff"
                  boxShadow="0px 4px 12px 0px #0000000D"
                  borderRadius="1rem"
                >
                  <Text fontWeight="500" fontSize="20px">
                    ✋🏿 Add what you d like to work on below
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

                  <Button bg="#2F80ED" p="0.5rem" h="100%" borderRadius="0.7rem">
                    <Image src="../assets/add.png" alt="" w="20px" h="20px" />
                  </Button>
                </Box>

                <Box
                  as="article"
                  my="1rem"
                  p="1rem"
                  bg="#fff"
                  boxShadow="0px 4px 12px 0px #0000000D"
                  borderRadius="1rem"
                >
                  <Image src="../assets/trabalho.jpg" alt="" borderRadius="1rem" />
                  <Text fontWeight="500" fontSize="20px" mt="1rem">
                    ✋🏿 Add what you d like to work on below
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

                  <Button bg="#2F80ED" p="0.5rem" h="100%" borderRadius="0.7rem">
                    <Image src="../assets/add.png" alt="" w="20px" h="20px" />
                  </Button>
                </Box>
              </Box>

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
                Add another add
                <Image src="../assets/boards/add.png" alt="" w="20px" h="20px" />
              </Button>
            </Box>
          </Flex>
        </Container>
      </Flex>
    </>
  )
}

export default MyPage
