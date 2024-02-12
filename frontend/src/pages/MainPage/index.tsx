import { Button, Container, Content, Header, Input, InputGroup, Modal } from "rsuite";
import SearchIcon from '@rsuite/icons/Search';
import { TableCustom } from "../../components/TableCustom";
import { useEffect, useState } from "react";
import { deleteClient, getAllClients } from "../../api";
import { AllClientsResponse } from "../../api/response";
import { ListRoutes } from "../ListRoutes";
import { ClientChange } from "../ClientChange";
import { ScreenClient } from "./types";

export const MainPage: React.FC = () => {
    const [clients, setClients] = useState<AllClientsResponse[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [openListRoutes, setOpenListRoutes] = useState(false);
    const [openClient, setOpenClient] = useState<ScreenClient>({ open: false, idClient: undefined });
    const [openDeleteClient, setOpenDeleteClient] = useState<ScreenClient>({ open: false, idClient: undefined });
    const [filter, setFilter] = useState<string | undefined>(undefined);
    const [valueSearch, setValueSearch] = useState('');

    // eslint-disable-next-line 
    const fillClients = async () => {
        setLoading(true);
        const data = await getAllClients(filter);
        setClients(data);
        setLoading(false);
    }

    const excludeClient = async (idClient: number) => {
        await deleteClient(idClient);
        await fillClients();
    }

    const toDeleteClient = (idClient: number) => {
        excludeClient(idClient);
        setOpenDeleteClient({ open: false, idClient: undefined });
    }

    const closeWithChange = () => {
        setOpenClient({ open: false, idClient: undefined });
        fillClients();
    }

    const executeFilter = () => {
        setFilter(valueSearch !== "" ? valueSearch : undefined);
    }

    useEffect(() => {
        const fetchData = async () => {
            await fillClients();
        };
        fetchData();
        // eslint-disable-next-line 
    }, [filter]);

    useEffect(() => {
        const fetchData = async () => {
            await fillClients();
        };
        fetchData();
        // eslint-disable-next-line 
    }, []);

    return (
        <Container style={{ height: "100vh" }}>
            <Header style={{ height: "100px", paddingLeft: 200, paddingRight: 200, alignItems: "center", display: "flex", gap: "15px" }}>
                <Button color="violet" appearance="primary" style={{ width: "150px" }} onClick={() => setOpenClient({ open: true, idClient: undefined })}>
                    Novo Cliente
                </Button>
                <Button color="violet" appearance="ghost" style={{ width: "230px" }} onClick={() => setOpenListRoutes(true)}>
                    Consultar Melhor Rota
                </Button>
                <InputGroup style={{ width: "100%" }}>
                    <Input color="violet" placeholder="Pesquisar" onChange={e => setValueSearch(e)} />
                    <InputGroup.Button onClick={executeFilter}>
                        <SearchIcon />
                    </InputGroup.Button>
                </InputGroup>
            </Header>
            <Content style={{ paddingLeft: 200, paddingRight: 200 }}>
                <TableCustom
                    loading={loading}
                    data={clients}
                    toEdit={(id: number) => setOpenClient({ open: true, idClient: id })}
                    toDelete={(id: number) => setOpenDeleteClient({ open: true, idClient: id })}
                />
            </Content>
            <ListRoutes isOpen={openListRoutes} toClose={(v: boolean) => setOpenListRoutes(v)} />
            <ClientChange
                isOpen={openClient.open}
                idClient={openClient.idClient}
                toClose={(v: boolean) => setOpenClient({ open: v, idClient: undefined })}
                toCloseChanged={() => closeWithChange()}
            />
            <Modal backdrop="static" role="alertdialog" open={openDeleteClient.open} onClose={() => setOpenDeleteClient({ open: false, idClient: undefined })} size="xs">
                <Modal.Body>
                    Confirma a Exclusão do Cliente ?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => toDeleteClient(openDeleteClient.idClient ? openDeleteClient.idClient : -1)} color="violet" appearance="subtle">
                        Sim
                    </Button>
                    <Button onClick={() => setOpenDeleteClient({ open: false, idClient: undefined })} color="violet" appearance="primary">
                        Não
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};
