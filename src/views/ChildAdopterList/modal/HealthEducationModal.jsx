import {
    Button,
    Divider,
    FormControl,
    FormLabel,
    Modal,
    ModalClose,
    ModalDialog,
    Stack,
    Typography,
    Textarea,
    ModalOverflow,
} from "@mui/joy";
import { useEffect, useState } from "react";
import api from "../../../services/api";

export function HealthEducationModal({ open, setOpen, childId, child }) {
    const [loading, setLoading] = useState(false);

    const [state, setState] = useState({
        health_record: "",
        education_level: "",
    });

    useEffect(() => {
        if (open && child) {
            setState({
                health_record: child.health_record || "",
                education_level: child.education_level || "",
            });
        }
    }, [open, child]);

    const updateState = (key, value) => {
        setState((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.put(`/child/health-education/${childId}`, state);
            setState({
                health_record: res.data.data.health_record,
                education_level: res.data.data.education_level,
            });
            alert("Informações salvas com sucesso!");
            setOpen(false);
        } catch (error) {
            console.error("Erro ao salvar o manual:", error.response?.data);
            const msg = error.response?.data?.message || "Erro ao salvar informações.";
            alert(msg);
        } finally {
            setLoading(false);
        }
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
                        Acompanhamento do Desenvolvimento
                    </Typography>
                    <Typography level="body-sm">
                        Atualize as informações médicas e educacionais da criança.
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <FormControl>
                                <FormLabel sx={{ fontWeight: 'bold' }}>Anotações Médicas</FormLabel>
                                <Textarea
                                    minRows={4}
                                    placeholder="Histórico de consultas, medicamentos, alergias..."
                                    value={state.health_record}
                                    onChange={(e) => updateState("health_record", e.target.value)}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel sx={{ fontWeight: 'bold' }}>Educação e Aprendizado</FormLabel>
                                <Textarea
                                    minRows={4}
                                    placeholder="Informações sobre o rendimento escolar, comportamento..."
                                    value={state.education_level}
                                    onChange={(e) => updateState("education_level", e.target.value)}
                                />
                            </FormControl>

                            <Button
                                type="submit"
                                size="lg"
                                loading={loading}
                                sx={{ mt: 1 }}
                                className="btn-submit"
                            >
                                Salvar Informações
                            </Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </ModalOverflow>
        </Modal>
    );
}