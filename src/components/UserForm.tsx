import {
  Dialog,
  Field,
  VStack,
  Input,
  NativeSelectRoot,
  NativeSelectField,
  Button,
  Portal,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import type { User } from "@/types/user";

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  user?: User | null;
}

type FormErrors = {
  name?: string;
  email?: string;
  role?: string;
};

export const UserForm: React.FC<UserFormProps> = ({
  isOpen,
  onClose,
  onSave,
  user,
}) => {
  const [formData, setFormData] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    role: "user",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      setFormData({ name: "", email: "", role: "user" });
    }
    setErrors({});
  }, [user, isOpen]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    } else if (formData.name.length < 3) {
      newErrors.name = "Debe tener al menos 3 caracteres";
    } else if (formData.name.length > 50) {
      newErrors.name = "No puede superar los 50 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.role) {
      newErrors.role = "El rol es obligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const userData: User = {
      id: user?.id ?? Date.now().toString(),
      ...formData,
    };

    onSave(userData);
    onClose();
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(details) => {
        if (!details.open) {
          onClose();
        }
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {user ? "Editar Usuario" : "Crear Usuario"}
              </Dialog.Title>
              <Dialog.CloseTrigger />
            </Dialog.Header>

            <Dialog.Body>
              <VStack gap={4}>
                <Field.Root invalid={!!errors.name}>
                  <Field.Label>Nombre</Field.Label>
                  <Input
                    placeholder="Ingrese el nombre"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  {errors.name && (
                    <Field.ErrorText>{errors.name}</Field.ErrorText>
                  )}
                </Field.Root>

                <Field.Root invalid={!!errors.email}>
                  <Field.Label>Email</Field.Label>
                  <Input
                    type="email"
                    placeholder="Ingrese el email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  {errors.email && (
                    <Field.ErrorText>{errors.email}</Field.ErrorText>
                  )}
                </Field.Root>

                <Field.Root invalid={!!errors.role}>
                  <Field.Label>Rol</Field.Label>
                  <NativeSelectRoot>
                    <NativeSelectField
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          role: e.target.value as User["role"],
                        })
                      }
                    >
                      <option value="">Seleccione un rol</option>
                      <option value="user">Usuario</option>
                      <option value="moderator">Moderador</option>
                      <option value="admin">Administrador</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                  {errors.role && (
                    <Field.ErrorText>{errors.role}</Field.ErrorText>
                  )}
                </Field.Root>
              </VStack>
            </Dialog.Body>

            <Dialog.Footer>
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button colorPalette="blue" onClick={handleSubmit}>
                {user ? "Actualizar" : "Crear"}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
