import { useRouter } from 'next/navigation'
import {
  UnorderedList,
  Box,
  ListItem,
  Image,
  Text,
  Heading,
  Flex,
} from '@chakra-ui/react'
import '../../styles/animations/animation.css'

const PeriflMenu = () => {
  const Router = useRouter()

  const leaveAccount = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return Router.push('/user/signin')
  }
  return (
    <Box
      pos="absolute"
      bg="#fff"
      filter="drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.10));"
      top="85px"
      right="50px"
      borderRadius="0.5rem"
      listStyleType="none"
      border="1px solid #E1E1E1"
      p="0.3rem"
      zIndex="2"
      className="zoom-in-left"
    >
      <Flex align="center" mt="0.5rem" mx="1rem">
        <Image
          w="60px"
          h="60px"
          borderRadius="50%"
          mr="0.5rem"
          src="../assets/header/logoavatar.png"
          alt=""
        />
        <Box>
          <Heading as="h3" fontSize="17px">
            teste12
          </Heading>
          <Text fontSize="15px">teste@gmail.com</Text>
        </Box>
      </Flex>
      <UnorderedList bg="#F5F5F5" borderRadius="0.5rem" m="1rem 0 0 0" p="0.5rem">
        <ListItem
          display="flex"
          alignItems="center"
          fontWeight="500"
          color="#383838"
          bg="#E3E3E3"
          p="0.6rem"
          borderRadius="0.5rem"
          cursor="pointer"
        >
          <Image
            src="../assets/menuPerfil/dashboard.png"
            alt=""
            w="25px"
            h="25px"
            mr="0.5rem"
          />
          Dashboard
        </ListItem>

        <ListItem
          display="flex"
          alignItems="center"
          fontWeight="500"
          color="#383838"
          p="0.6rem"
          borderRadius="0.5rem"
          cursor="pointer"
          transition="0.3s"
          _hover={{
            color: '#383838',
            bg: '#E3E3E3',
          }}
        >
          <Image
            src="../assets/menuPerfil/settings.png"
            alt=""
            w="25px"
            h="25px"
            mr="0.5rem"
          />
          Settings
        </ListItem>

        <ListItem
          display="flex"
          alignItems="center"
          fontWeight="500"
          p="0.6rem"
          borderRadius="0.5rem"
          cursor="pointer"
          onClick={() => leaveAccount()}
          transition="0.3s"
          _hover={{
            color: '#383838',
            bg: '#E3E3E3',
          }}
        >
          <Image src="../assets/header/sair.png" alt="" w="25px" h="25px" mr="0.5rem" />
          Sair da conta
        </ListItem>
      </UnorderedList>
    </Box>
  )
}

export { PeriflMenu }
