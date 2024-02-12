import { Button, Drawer, Form, Message } from "rsuite";
import { useEffect, useState } from "react";
import { createClient, getClientById, updateClient } from "../../api";
import { AllClientsResponse } from "../../api/response";
import { ClientChangeProps } from "./types";
import FormGroup from "rsuite/esm/FormGroup";
import FormControl from "rsuite/esm/FormControl";
import axios, { AxiosError } from "axios";

export const ClientChange: React.FC<ClientChangeProps> = ({ idClient, isOpen, toClose, toCloseChanged }) => {
    const [client, setClient] = useState<AllClientsResponse>({
        id: idClient,
        name: '',
        document: '',
        positionx: 0,
        positiony: 0,
        email: '',
        phone: '',
    });
    const [errors, setErros] = useState<string[]|undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            if (idClient) {
                const data = await getClientById(idClient);
                setClient(data);
            }
        };
        fetchData();
    }, [idClient]);

    const closing = () => {
        setClient({
            id: undefined,
            name: '',
            document: '',
            positionx: 0,
            positiony: 0,
            email: '',
            phone: '',
        });
        setErros(undefined);
        toClose(false);
    };

    const handleSubmit = async () => {
        try {
            if (idClient) {
                await updateClient(client);
            } else {
                await createClient(client);
            }
            setClient({
                id: undefined,
                name: '',
                document: '',
                positionx: 0,
                positiony: 0,
                email: '',
                phone: '',
            });
            setErros(undefined);            
            toCloseChanged(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorAxios = error as AxiosError;
                const allErrors = errorAxios.response?.data as AllClientsResponse;
                setErros(allErrors.error);
            } else {
                // Tratar outro tipo de erro
            }
        }
    };

    const handleChange = (value: string, name: string) => {
        setClient({ ...client, [name]: value });
    };

    return (
        <Drawer backdrop={"static"} open={isOpen} onClose={() => closing()}>
            <Drawer.Header>
                <Drawer.Title>{idClient ? "Editar" : "Novo"} Cliente</Drawer.Title>
                <Drawer.Actions>
                    <Button color="violet" onClick={() => handleSubmit()} appearance="primary">OK</Button>
                    <Button color="violet" onClick={() => closing()}>Cancelar</Button>
                </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body>
                <Form>
                    <FormGroup>
                        <Form.ControlLabel>Nome</Form.ControlLabel>
                        <FormControl
                            name="name"
                            label="Nome"
                            value={client.name}
                            onChange={(value) => handleChange(value, 'name')}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.ControlLabel>Documento</Form.ControlLabel>
                        <FormControl
                            name="document"
                            label="Documento"
                            value={client.document}
                            onChange={(value) => handleChange(value, 'document')}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.ControlLabel>Posição X</Form.ControlLabel>
                        <FormControl
                            name="positionX"
                            label="Posição X"
                            type="number"
                            value={client.positionx}
                            onChange={(value) => handleChange(value, 'positionx')}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.ControlLabel>Posição Y</Form.ControlLabel>
                        <FormControl
                            name="positionY"
                            label="Posição Y"
                            type="number"
                            value={client.positiony}
                            onChange={(value) => handleChange(value, 'positiony')}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.ControlLabel>Email</Form.ControlLabel>
                        <FormControl
                            name="email"
                            label="Email"
                            value={client.email}
                            onChange={(value) => handleChange(value, 'email')}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.ControlLabel>Telefone</Form.ControlLabel>
                        <FormControl
                            name="phone"
                            label="Telefone"
                            value={client.phone}
                            onChange={(value) => handleChange(value, 'phone')}
                        />
                    </FormGroup>
                </Form>
                {errors ?
                <Message style={{marginTop:15}} type="error" showIcon>
                    <strong>Erro!</strong> 
                    { errors.map((item,i)=>{
                        let result = [];
                        result.push(<br key={i}/>);
                        result.push(item);
                        return result;
                    })}
                </Message> : null }
            </Drawer.Body>
        </Drawer>
    );
};
