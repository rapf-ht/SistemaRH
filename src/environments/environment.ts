// Exporta o objeto imutável de configuração para o build de produção.
// Em tempo de build (ng build), substitui referências de desenvolvimento sem alocar credenciais ou tokens.
export const environment = {
  production: true
};
