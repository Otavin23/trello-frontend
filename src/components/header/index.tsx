import { useState, useContext } from 'react'
import { Flex, Container, Box, Image, Input, Button, Heading } from '@chakra-ui/react'
import { TrelloContext } from '../../context/TrelloContext'
import { PeriflMenu } from '../perfilMenu'

const Header = () => {
  const { data } = useContext(TrelloContext)
  const [modal, setModal] = useState(false)

  return (
    <Flex
      as="header"
      bg="#fff"
      py="1rem"
      justify="center"
      boxShadow=" 0px 2px 2px 0px #0000000D"
      borderBottom="1px solid #dfdfdf"
    >
      <Container
        maxW="1800px"
        w="95%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p="0"
        m="0"
      >
        <Box>
          <Image
            src="../assets/Logo.svg"
            alt="trullho logo two blue squares and a trullo name"
          />
        </Box>

        <Flex align="center">
          <Flex
            align="center"
            bg="#fff"
            filter="drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.10));"
            mr="3rem"
            h="50px"
            w="430px"
            borderRadius="0.8rem"
          >
            <Input
              type="text"
              placeholder="keyword..."
              variant="unstyled"
              border="none"
              h="100%"
              borderRadius="2rem"
              px="1rem"
              fontSize="15px"
              _placeholder={{
                color: '#BDBDBD',
                fontWeight: '400',
              }}
            />
            <Button
              bg="#2F80ED"
              color="#fff"
              borderRadius="0.8rem"
              w="125px"
              mr="0.3rem"
              fontWeight="400"
              fontSize="14px"
              _hover={{
                bg: '#105bbe',
              }}
            >
              Search
            </Button>
          </Flex>

          <Flex align="center">
            <Image
              src="../assets/header/logoavatar.png"
              alt="avatar person"
              w="40px"
              h="40px"
              objectFit="cover"
              borderRadius="0.5rem"
            />
            <Flex align="center" cursor="pointer" onClick={() => setModal(!modal)}>
              <Heading mx="1rem" fontSize="16px" color="#333">
                {data?.data?.name}
              </Heading>
              <Image
                src="../assets/header/setaBaixo.png"
                alt="gray triangle pointing down"
                w="20px"
                h="20px"
              />
            </Flex>
            {modal && <PeriflMenu />}
          </Flex>
        </Flex>
      </Container>
    </Flex>
  )
}
export { Header }
