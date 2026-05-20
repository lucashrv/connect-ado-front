import {
    Divider,
    Modal,
    ModalClose,
    ModalDialog,
    Stack,
    Typography,
    Card,
    AspectRatio,
    IconButton,
    ModalOverflow,
} from "@mui/joy";
import { Heart } from "lucide-react";
import { useState } from "react";

export function AdopterPostsModal({ open, setOpen, childId }) {

    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "Primeiro dia de aula!",
            image_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
            content: "Hoje foi o primeiro dia de aula adaptada. A integração com os novos colegas foi super tranquila e o desenvolvimento nas atividades lúdicas superou as expectativas!",
            date: "2026-05-10T10:00:00.000Z",
            likes: 12
        },
        {
            id: 2,
            title: "Oficina de Pintura",
            image_url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
            content: "Passamos a tarde testando novas cores na oficina de artes. A atividade ajudou bastante na concentração e na expressão criativa através das tintas.",
            date: "2026-05-15T14:30:00.000Z",
            likes: 8
        },
        {
            id: 3,
            title: "Passeio no Parque",
            image_url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=600&q=80",
            content: "Um dia perfeito de sol para correr ao ar livre, observar a natureza e interagir com outros grupos. O gasto de energia foi excelente para a rotina do sono.",
            date: "2026-05-19T17:00:00.000Z",
            likes: 15
        }
    ]);


    const handleLike = (postId) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId ? { ...post, likes: post.likes + 1 } : post
            )
        );
    };

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalOverflow>
                <ModalDialog
                    minWidth={400}
                    maxWidth={600}
                    sx={{ borderRadius: "md", p: 3, my: 4 }}
                >
                    <ModalClose />
                    <Typography level="h3" component="h2">
                        Mural de Postagens da Criança
                    </Typography>
                    <Typography level="body-sm">
                        Histórico de atividades, rotinas e momentos compartilhados.
                    </Typography>

                    <Divider sx={{ my: 2 }} />


                    <Stack spacing={3}>
                        {posts.length === 0 ? (
                            <Typography level="body-md" sx={{ textAlign: "center", color: "neutral.500", py: 2 }}>
                                Nenhuma postagem encontrada.
                            </Typography>
                        ) : (
                            posts.map((post) => (
                                <Card key={post.id} variant="outlined" sx={{ p: 2 }}>

                                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                                        <Typography level="title-lg">{post.title}</Typography>
                                        <Typography level="body-xs" sx={{ color: "neutral.500", pt: 0.5 }}>
                                            {new Date(post.date).toLocaleDateString("pt-BR")}
                                        </Typography>
                                    </Stack>


                                    {post.image_url && (
                                        <AspectRatio ratio="16/9" sx={{ borderRadius: "xs", mb: 1.5 }}>
                                            <img
                                                src={post.image_url}
                                                loading="lazy"
                                                alt={post.title}
                                                style={{ objectFit: "cover" }}
                                            />
                                        </AspectRatio>
                                    )}


                                    <Typography level="body-sm" sx={{ mb: 2 }}>
                                        {post.content}
                                    </Typography>

                                    <Divider />


                                    <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1} sx={{ mt: 1 }}>
                                        <IconButton
                                            variant="plain"
                                            color="danger"
                                            onClick={() => handleLike(post.id)}
                                            size="sm"
                                        >
                                            <Heart size={20} fill={post.likes > 0 ? "currentColor" : "none"} />
                                        </IconButton>
                                        <Typography level="body-xs" fontWeight="bold">
                                            {post.likes} {post.likes === 1 ? "curtida" : "curtidas"}
                                        </Typography>
                                    </Stack>
                                </Card>
                            ))
                        )}
                    </Stack>
                </ModalDialog>
            </ModalOverflow>
        </Modal>
    );
}