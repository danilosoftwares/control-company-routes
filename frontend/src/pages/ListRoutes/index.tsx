import { Drawer, Timeline } from "rsuite";
import { useEffect, useState } from "react";
import { getAllClientsRoute } from "../../api";
import { AllClientsResponse } from "../../api/response";
import { ListRoutesProps } from "./types";

export const ListRoutes: React.FC<ListRoutesProps> = ({ isOpen, toClose }) => {
    // eslint-disable-next-line 
    const [clients, setClients] = useState<AllClientsResponse[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllClientsRoute();
            setClients(data);
        };
        if (isOpen){
            fetchData();
        }
    }, [isOpen]);

    return (
        <Drawer open={isOpen} onClose={() => toClose(false)}>
            <Drawer.Header>
                <Drawer.Title>Rota de Visita de Clientes</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <Timeline>               
                    {clients && clients.map((item, idx) => {
                        return <Timeline.Item
                            key={idx}
                            color="violet"
                            dot={<div style={{ background: (idx===(clients.length-1))?'#673ab7':'#d9d9d9', color: '#fff', height: 10, width: 10, borderRadius: 8 }} />}
                        >
                            {item.name}
                        </Timeline.Item>
                    })}                    
                </Timeline>
            </Drawer.Body>
        </Drawer>
    );
};
