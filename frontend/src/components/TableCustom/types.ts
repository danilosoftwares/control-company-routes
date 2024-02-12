import { AllClientsResponse } from "../../api/response";

export interface TableCustomProps {
    data:AllClientsResponse[] | undefined;
    toEdit:Function;
    toDelete:Function;
    loading?: boolean;
}