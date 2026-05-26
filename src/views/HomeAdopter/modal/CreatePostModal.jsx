import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
  Textarea,
  ModalOverflow,
} from "@mui/joy";
import { useState } from "react";
import api from "../../../services/api";

export function CreatePostModal({ open, setOpen, onPostCreated }) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      await api.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Postagem criada com sucesso!");

      setTitle("");
      setContent("");
      setPhoto(null);
      setOpen(false);

      if (onPostCreated) onPostCreated();
    } catch (error) {
      console.error("Erro ao criar postagem:", error.response?.data);
      alert(error.response?.data?.message || "Erro ao criar a postagem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalOverflow>
        <ModalDialog
          minWidth={400}
          maxWidth={550}
          sx={{ borderRadius: "md", p: 3, my: 6 }}
        >
          <ModalClose />
          <Typography level="h4" component="h2">
            Nova Postagem
          </Typography>
          <Divider sx={{ my: 2 }} />

          <form onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <FormControl required>
                <FormLabel>Título da Postagem</FormLabel>
                <Input
                  placeholder="Ex: Tarde divertida no parque!"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>

              <FormControl required>
                <FormLabel>Conteúdo</FormLabel>
                <Textarea
                  minRows={3}
                  placeholder="Escreva como foi a atividade, comportamento ou rotina..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Foto do Momento</FormLabel>
                <Input
                  type="file"
                  slotProps={{
                    input: {
                      accept: "image/*",
                    },
                  }}
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </FormControl>

              <Button
                className="btn-submit"
                type="submit"
                size="lg"
                loading={loading}
                sx={{ mt: 1 }}
              >
                Publicar
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
}
