import { themeChakra } from '../styles/theme'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'
import { TrelloProvider } from '@/context/TrelloContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <TrelloProvider>
        <ChakraProvider theme={themeChakra}>{children}</ChakraProvider>
      </TrelloProvider>
      <Toaster />
    </CacheProvider>
  )
}
