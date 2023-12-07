import { Flex, Container } from '@chakra-ui/react'

interface IProps {
  children: JSX.Element
}

const Layout = ({ children }: IProps) => {
  return (
    <Flex as="main" justify="center" align="center" height="100vh">
      <Container
        display="flex"
        bg="#fff"
        boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 10px"
        borderRadius="0.5rem"
        w="400px"
        p="2.5rem"
      >
        {children}
      </Container>
    </Flex>
  )
}
export default Layout
