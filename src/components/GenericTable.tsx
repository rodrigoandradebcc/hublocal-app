import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, TableCaption } from "@chakra-ui/react";
import { ReactNode } from "react";

interface TableProps<T> {
  data: Record<string, unknown>[];
  columns: string[];
}


export function MyTable<T>({ data, columns }: TableProps<T>) {
  return (
    <TableContainer>
    <Table variant='simple'>
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead>
        <Tr>
          {columns.map(column => (
            <Th key={column}>{column}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          {Object.values(data).map((item, index) => (
            <Td>{item as unknown as ReactNode}</Td>
          ))}
        </Tr>
      </Tbody>
    </Table>
  </TableContainer>
  );
}