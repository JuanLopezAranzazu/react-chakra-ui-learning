import {
  Box,
  Button,
  Badge,
  HStack,
  Flex,
  Text,
  Table,
  Pagination,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight, LuPen, LuTrash2 } from "react-icons/lu";

import type { User } from "@/types/user";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getRoleBadge = (role: string) => {
    const colors = {
      admin: "red",
      moderator: "orange",
      user: "blue",
    };
    return (
      <Badge colorPalette={colors[role as keyof typeof colors]}>
        {role === "admin"
          ? "Admin"
          : role === "moderator"
            ? "Moderador"
            : "Usuario"}
      </Badge>
    );
  };

  return (
    <Box>
      <Box overflowX="auto" borderWidth="1px" borderRadius="lg">
        <Table.Root size="sm" striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Nombre</Table.ColumnHeader>
              <Table.ColumnHeader>Email</Table.ColumnHeader>
              <Table.ColumnHeader>Rol</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="right">
                Acciones
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell fontWeight="medium">{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{getRoleBadge(user.role)}</Table.Cell>
                <Table.Cell textAlign="right">
                  <HStack gap={2} justify="flex-end">
                    <Button
                      size="sm"
                      colorPalette="blue"
                      onClick={() => onEdit(user)}
                    >
                      <LuPen />
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      colorPalette="red"
                      onClick={() => onDelete(user)}
                    >
                      <LuTrash2 />
                      Eliminar
                    </Button>
                  </HStack>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      <Flex justify="space-between" align="center" mt={4}>
        <Text fontSize="sm">
          Página {currentPage} de {totalPages}
        </Text>

        <Pagination.Root
          count={totalPages}
          pageSize={1}
          defaultPage={currentPage}
        >
          <ButtonGroup variant="ghost" size="sm">
            <Pagination.PrevTrigger asChild>
              <IconButton
                aria-label="Anterior"
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              >
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(page) => (
                <IconButton
                  key={page.value}
                  variant={{ base: "ghost", _selected: "outline" }}
                  onClick={() => onPageChange(page.value)}
                  aria-label={`Página ${page.value}`}
                >
                  {page.value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton
                aria-label="Siguiente"
                onClick={() =>
                  currentPage < totalPages && onPageChange(currentPage + 1)
                }
              >
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Flex>
    </Box>
  );
};
