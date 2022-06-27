export namespace JsonPlaceHolderIntegration {
  export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
  };
}

export interface JsonPlaceHolderIntegration {
  getUserById(id: number): Promise<JsonPlaceHolderIntegration.User | null>;
}
