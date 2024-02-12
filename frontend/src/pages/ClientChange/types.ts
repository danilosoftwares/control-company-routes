export interface ClientChangeProps {
    isOpen:boolean;
    toClose: Function;
    toCloseChanged: Function;
    idClient:number | undefined;
}