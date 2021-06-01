import NextLink from 'next/link'
import { Text, Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td, useBreakpointValue, Spinner, Link } from '@chakra-ui/react'
import { RiAddLine, RiPencilLine } from 'react-icons/ri'

import { Header } from "../../components/Header"
import { Pagination } from "../../components/Pagination/index"
import { Sidebar } from "../../components/Sidebar/index"
import { getUsers, useUsers } from '../../services/hooks/useUsers'
import { useState } from 'react'
import { queryClient } from '../../services/queryClient'
import { api } from '../../services/api'
import { GetServerSideProps } from 'next'

export default function UserList({users, totalCount}) {
  const [page, setPage] = useState(1)

  const { data, isLoading, error, isFetching } = useUsers(page, {
    initialData: users,
  })

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  async function handlePrefetchUser(userId: number) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`user/${userId}`)

      return response.data
    }, {
      staleTime: 1000 * 60 * 10
    })
  }

  return (
    <Box>
      <Header />

      <Flex width="100%" my="6" maxW={1480} mx="auto" px="1.5">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8" >
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários

              {!isLoading && isFetching && <Spinner size="sm" color="grey.500" ml="4" />}
            </Heading>
            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="orange"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
            </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Text>Falha em obter os dados dos usuários</Text>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="green.300" w="8">
                      <Checkbox colorScheme="orange" />
                    </Th>
                    <Th>Usuario</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users.map(user => {
                    return (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="orange" />
                        </Td>
                        <Td>
                          <Box>
                            <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(Number(user.id))}>
                              <Text fontWeight="bold">{user.name}</Text>
                            </Link>
                            <Text fontSize="small" color="gray.300">{user.email}</Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.createdAt}</Td>}

                        <Td>
                          {isWideVersion && <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="yellow"
                            leftIcon={<Icon as={RiPencilLine} />}
                          >
                            Editar
                       </Button>
                          }
                        </Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )
          }
        </Box>
      </Flex>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { users, totalCount } = await getUsers(1)

  return {
    props: {
      users,
      totalCount
    }
  }
}