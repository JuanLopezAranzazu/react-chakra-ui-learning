import {
  Button,
  Container,
  Heading,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
import { ColorModeButton } from "@/components/ui/color-mode";

import { useState } from "react";
import type { User } from "@/types/user";
import { UserTable } from "@/components/UserTable";
import { UserForm } from "@/components/UserForm";
import { DeleteConfirm } from "@/components/DeleteConfirm";

import { toaster } from "@/components/ui/toaster";

const initialUsers: User[] = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com", role: "admin" },
  { id: 2, name: "María García", email: "maria@example.com", role: "user" },
  {
    id: 3,
    name: "Carlos López",
    email: "carlos@example.com",
    role: "moderator",
  },
  { id: 4, name: "Ana Martínez", email: "ana@example.com", role: "user" },
  { id: 5, name: "Luis Rodríguez", email: "luis@example.com", role: "user" },
  { id: 6, name: "Sofía Gómez", email: "sofia@example.com", role: "moderator" },
  { id: 7, name: "Miguel Sánchez", email: "miguel@example.com", role: "admin" },
];

export function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const itemsPerPage = 5;

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const handleSaveUser = (user: User) => {
    if (selectedUser) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
      toaster.create({
        description: `El usuario ${user.name} ha sido actualizado exitosamente.`,
        type: "success",
      });
    } else {
      setUsers([...users, user]);
      toaster.create({
        description: `El usuario ${user.name} ha sido creado exitosamente.`,
        type: "success",
      });
    }
    setSelectedUser(null);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter((u) => u.id !== userToDelete.id));
      toaster.create({
        description: `El usuario ${userToDelete.name} ha sido eliminado exitosamente.`,
        type: "success",
      });

      setUserToDelete(null);
      setIsDeleteOpen(false);

      if (currentUsers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleCreateNew = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={6} align="stretch">
        <Flex justify="space-between" align="center">
          <Heading size="2xl">Gestión de Usuarios</Heading>
          <HStack gap={4}>
            <ColorModeButton />
            <Button colorPalette="green" onClick={handleCreateNew}>
              <LuPlus />
              Crear Usuario
            </Button>
          </HStack>
        </Flex>

        <UserTable
          users={currentUsers}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <UserForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedUser(null);
          }}
          onSave={handleSaveUser}
          user={selectedUser}
        />

        <DeleteConfirm
          isOpen={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false);
            setUserToDelete(null);
          }}
          onConfirm={confirmDelete}
          userName={userToDelete?.name || ""}
        />
      </VStack>
    </Container>
  );
}
