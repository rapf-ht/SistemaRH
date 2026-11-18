export interface Colaborador {
id: number;
nome: string;
email: string;
dataNascimento: string | null;
rg: string | null;
cpf: string | null;
createdAt: string;
updatedAt: string;
enderecos: unknown[]; //unknown[] indica uma lista cujos itens ainda não descrevemos
contatos: unknown[];
}