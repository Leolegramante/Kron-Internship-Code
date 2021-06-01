import { Text } from "@chakra-ui/react";
import { Box, Stack } from "@chakra-ui/layout";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number
  registersPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [... new Array(to - from)].map((_, index) => {
    return from + index + 1
  }).filter(page => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange
}: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage)

  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : []

  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []

  return (
    <Stack
      direction={["column", "row"]}
      marginTop="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>25</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > (2 + siblingsCount) && (
              <Text color="grey.300" width="8" textAlign="center">...</Text>
            )}
          </>
        )}

        {previousPages.length > 0 && previousPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}

        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent={true} />

        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}

        {lastPage > (currentPage + siblingsCount) && (
          <>
            {lastPage > (currentPage + 1 + siblingsCount) && (
              <Text color="grey.300" width="8" textAlign="center">...</Text>
            )}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </Stack>
    </Stack>
  )
}