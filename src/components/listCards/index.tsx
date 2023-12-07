import { Text, Grid, Heading } from '@chakra-ui/react'
import { BoardCard } from '../boardCard'
import { useFetcher } from '@/hooks/useFetcher'

import useSWR from 'swr'
import Link from 'next/link'

interface IProps {
  url: string
  column?: string
}

interface ICardProps {
  id: string
  image: string
  name: string
  members: [
    {
      id: string
      image: string
      name: string
    },
  ]
}

const ListsCards = ({ url, column }: IProps) => {
  const { data, isLoading: isLoadingBoard } = useSWR(url, useFetcher)

  return (
    <>
      <Heading as="h3" mt="3rem" fontSize="20px" fontWeight="500">
        {column}
      </Heading>

      <Grid
        justifyContent="space-between"
        gridTemplateColumns="280px 280px 280px 280px"
        mt="2rem"
      >
        {!isLoadingBoard && (
          <>
            {data?.length <= 0 && (
              <Text as="span" color="#303030" fontSize="18px">
                Até o momento, não há nenhum card disponível
              </Text>
            )}

            {data?.map(({ id, image, name, members }: ICardProps) => (
              <Link href={`/board/${id}`} key={id}>
                <BoardCard image={image} title={name} personArray={members} />
              </Link>
            ))}
          </>
        )}
      </Grid>
    </>
  )
}
export { ListsCards }
