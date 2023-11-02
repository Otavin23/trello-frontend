import { Text, Box, Heading, Image, ListItem, UnorderedList } from '@chakra-ui/react'

interface IProps {
  image: string
  title: string
  personArray: string[]
}

const BoardCard = ({ image, title, personArray }: IProps) => {
  return (
    <Box
      w="280px"
      bg="#fff"
      boxShadow="0px 4px 12px 0px rgba(0, 0, 0, 0.05)"
      p="1rem"
      borderRadius="0.6rem"
    >
      <Image
        src={image}
        alt="background image card"
        w="100%"
        h="160px"
        borderRadius="1rem"
        objectFit="cover"
      />

      <Heading as="h3" fontSize="18px" my="1rem" fontWeight="600">
        {title}
      </Heading>

      <UnorderedList
        display="flex"
        alignItems="center"
        listStyleType="none"
        m="2rem 0 0 0"
      >
        {personArray.map((person) => (
          <ListItem key={person}>
            <Image
              src={person}
              alt=""
              w="40px"
              h="40px"
              mr="0.5rem"
              borderRadius="0.5rem"
              objectFit="cover"
            />
          </ListItem>
        ))}
        <Text as="span" ml="0.5rem" color="#BDBDBD" fontSize="15px">
          + 5 others
        </Text>
      </UnorderedList>
    </Box>
  )
}

export { BoardCard }
