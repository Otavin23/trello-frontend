import { Box, Skeleton, Stack, UnorderedList, ListItem } from '@chakra-ui/react'

const SkeletonLoading = () => {
  return (
    <Box
      w="280px"
      bg="#fff"
      boxShadow="0px 4px 12px 0px rgba(0, 0, 0, 0.05)"
      p="1rem"
      borderRadius="0.6rem"
    >
      <Stack>
        <Skeleton h="160px" />
        <Skeleton h="20px" my="1rem" />
        <UnorderedList display="flex" m="0" listStyleType="none">
          <ListItem mr="0.5rem">
            <Skeleton w="40px" h="40px" borderRadius="0.5rem" />
          </ListItem>
          <ListItem mr="0.5rem">
            <Skeleton w="40px" h="40px" borderRadius="0.5rem" />
          </ListItem>
          <ListItem>
            <Skeleton w="40px" h="40px" borderRadius="0.5rem" />
          </ListItem>
        </UnorderedList>
      </Stack>
    </Box>
  )
}
export { SkeletonLoading }
