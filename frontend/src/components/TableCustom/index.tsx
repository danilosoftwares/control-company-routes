import { Button, Table } from 'rsuite';
import { TableCustomProps } from './types';

export const TableCustom: React.FC<TableCustomProps> = ({ loading, data, toEdit, toDelete }) => {
    const { Column, HeaderCell, Cell } = Table;

    return (
        <Table loading={loading} color="violet" autoHeight data={data}>
            <Column width={70} align="center" fixed>
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="id" />
            </Column>
            <Column width={150} fixed="left">
                <HeaderCell>Gerenciar</HeaderCell>
                <Cell style={{ padding: '6px' }}>
                    {rowData => (
                        <>
                            <Button color='violet' appearance="link" onClick={() => toEdit(rowData.id)}>
                                Editar
                            </Button>
                            <Button color='violet' appearance="link" onClick={() => toDelete(rowData.id)}>
                                Excluir
                            </Button>
                        </>
                    )}
                </Cell>
            </Column>
            <Column width={300}>
                <HeaderCell>Nome</HeaderCell>
                <Cell dataKey="name" />
            </Column>

            <Column width={130}>
                <HeaderCell>Documento</HeaderCell>
                <Cell dataKey="document" />
            </Column>

            <Column width={300}>
                <HeaderCell>Email</HeaderCell>
                <Cell dataKey="email" />
            </Column>

            <Column width={200}>
                <HeaderCell>Telefone</HeaderCell>
                <Cell dataKey="phone" />
            </Column>
        </Table>
    );
};
