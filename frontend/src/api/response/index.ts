
export interface AllClientsResponse {
    id: number|undefined;    
    name: string;
    email: string | undefined;
    phone: string | undefined;
    document: string;
    positionx: number;
    positiony: number;
    error?: string[] | undefined;
  }
  