# SistemaRH — Comandos de Execução e Mecânica de Arquitetura

## 1. Inicialização do Repositório e Projeto (Etapas 1, 2 e 3)

```bash
# Clona o repositório remoto vazio mantendo o ponteiro 'origin' no .git/config
git clone https://github.com/SEU_USUARIO/SistemaRH.git
cd SistemaRH

# Executa o binário mais recente do Angular CLI sem depender de instalação global desatualizada
# --directory . grava os arquivos na raiz atual evitando subpasta duplicada SistemaRH/SistemaRH
# --skip-git preserva o diretório .git já inicializado pelo git clone
# --routing gera app.routes.ts e injeta provideRouter(routes) em app.config.ts
# --style tailwind configura o pipeline PostCSS + TailwindCSS
# --ssr false desativa Server-Side Rendering e pré-renderização SSG
# --zoneless ativa provideZonelessChangeDetection() sem Zone.js
npx @angular/cli@latest new SistemaRH --directory . --skip-git --routing --style tailwind --ssr false --zoneless
```

## 2. Estrutura de Diretórios e Ambientes (Etapa 4)

```bash
# Gera src/environments/environment.ts e src/environments/environment.development.ts
# Atualiza angular.json adicionando a regra fileReplacements na configuração de development
npx ng generate environments

# Cria os diretórios de domínio e mantém o rastreamento na árvore do Git via arquivo vazio .gitkeep
mkdir -p src/app/services src/app/models src/app/components
touch src/app/services/.gitkeep src/app/models/.gitkeep
```

- `src/app/services/`: Aloca classes decoradas com `@Injectable({ providedIn: 'root' })` responsáveis por chamadas HTTP (`HttpClient`) e estado compartilhado em memória.
- `src/app/models/`: Aloca interfaces e tipos TypeScript (`interface`/`type`) usados para tipagem estática de payloads em tempo de compilação (removidos no bundle JS final).
- `src/app/components/`: Isola os componentes visuais Standalone (`@Component`) responsáveis pela camada de apresentação e binding de eventos do DOM.
- `src/environments/`: Armazena constantes de configuração por ambiente; o bundler substitui a referência do arquivo em tempo de compilação conforme o target (`development` vs `production`).

## 3. Geração dos 6 Componentes Standalone (Etapa 5)

```bash
# Gera cada componente Standalone dentro de src/app/components/<nome-pasta>
npx ng generate component components/login
npx ng generate component components/cadastro
npx ng generate component components/lista-funcionarios
npx ng generate component components/formulario-funcionarios
npx ng generate component components/enderecos
npx ng generate component components/contatos
```

## 4. Mecânica de Roteamento e Menu Persistente (Etapas 6, 7 e 8)

- `src/app/app.routes.ts`: Define um array de objetos `Route`. O motor de roteamento percorre o array do índice `0` ao final aplicando estratégia *first-match wins*.
- `pathMatch: 'full'`: Na rota `{ path: '', redirectTo: 'login', pathMatch: 'full' }`, instrui o comparador de URL a redirecionar somente se a string residual inteira da URL for vazia. Sem `'full'`, o prefixo vazio `''` daria match em qualquer rota.
- Rota curinga (`**`): `{ path: '**', redirectTo: 'login' }` captura qualquer rota não encontrada nos índices anteriores. Deve ser o último elemento do array; caso contrário, intercepta todas as rotas subsequentes.
- `<router-outlet>` e `<nav>`: O elemento `<nav>` fica fora do `<router-outlet>` em `app.html`. Na troca de rotas, o Angular mantém o `<nav>` intacto na memória e substitui apenas o nó adjacente ao `<router-outlet>`.
- `[routerLinkActiveOptions]="{ exact: true }"`: Aplicado no link `/funcionarios` para impedir que a classe ativa permaneça aplicada ao navegar para a sub-rota `/funcionarios/novo` (que compartilha o mesmo prefixo de string).

## 5. Telas de Login e Cadastro com TailwindCSS (Etapas 9 e 10)

- Layout responsivo: Container externo utiliza `flex items-center justify-center` para centralização nos dois eixos. O card interno aplica `w-full max-w-md p-6 rounded-lg shadow`, ocupando 100% da viewport em telas mobile e travando em `28rem` (`448px`) em telas maiores.
- Bloqueio de submit nativo: Os botões "Entrar" e "Cadastrar" declaram `type="button"`. Por padrão, um `<button>` dentro de `<form>` assume `type="submit"`, o que dispararia recarregamento HTTP da página caso não interceptado.
