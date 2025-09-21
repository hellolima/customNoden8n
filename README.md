# customNoden8n

Este projeto contém a configuração de um ambiente **n8n** via Docker Compose, junto com um **nó customizado** para gerar números aleatórios consumindo a API do [Random.org](https://api.random.org/). O nó foi construído em TypeScript e é lido pelo n8n graças à configuração de volumes no Docker.

---

## 📑 Índice

1.  [📂 Estrutura de Pastas](#-estrutura-de-pastas)
2.  [📦 Dependências](#-dependências)
3.  [⚙️ Configuração do Ambiente](#️-configuração-do-ambiente)
4.  [🎲 Operação: True Random Number](#-operação-true-random-number)
5.  [✅ Como testar no n8n](#-como-testar-no-n8n)
6.  [🔍 Referências](#-referências)

---

## 📂 Estrutura de Pastas

-   `docker/`: Contém arquivos de configuração para rodar o n8n via Docker Compose.
    -   `docker-compose.yaml`: Orquestração dos serviços Docker (n8n e Postgres).
    -   `.env`: Arquivo para variáveis de ambiente (necessário para o Docker).

-   `nodes/`: Contém o código-fonte do nó customizado.
    -   `Random.node.ts`: O código-fonte do nó em TypeScript.
    -   `Random.svg`: O ícone para o nó na interface do n8n.

-   `dist/`: Saída da compilação do TypeScript para JavaScript.
    -   `Random.node.js`: O arquivo JavaScript que o n8n executa.

---

## 📦 Dependências

Este projeto utiliza as seguintes dependências no nó customizado (`nodes/`):

-   [`n8n-workflow`](https://www.npmjs.com/package/n8n-workflow): Pacote principal para o desenvolvimento de nós customizados para n8n.
-   [`axios`](https://www.npmjs.com/package/axios): Biblioteca para fazer requisições HTTP para a API do Random.org.
-   [`typescript`](https://www.npmjs.com/package/typescript): Compilador para transformar o código-fonte (`.ts`) em JavaScript (`.js`).

---

## ⚙️ Configuração do Ambiente

Siga estes passos para configurar e executar o projeto:

1.  **Clone o repositório.**
2.  **Crie o arquivo `.env`**: Na pasta `docker/`, crie um arquivo chamado `.env` e defina as variáveis de ambiente necessárias para o PostgreSQL e o n8n.
    ```bash
    POSTGRES_USER=n8nuser
    POSTGRES_PASSWORD=n8npassword
    POSTGRES_DATABASE=n8n
    N8N_PORT=5678
    ```
3.  **Inicie os contêineres Docker**: Na pasta `docker/`, execute o comando para iniciar o n8n e o PostgreSQL.
    ```bash
    sudo docker-compose up -d
    ```

4.  **Instale as dependências e compile o nó**: Navegue até a pasta `nodes/` e execute os comandos para instalar as dependências e compilar o nó.
    ```bash
    npm install
    npm run build
    npm link
    ```

---

## 🎲 Operação: True Random Number

O nó implementa a operação `trueRandom`, que gera um número aleatório usando a API do Random.org.

-   **Entradas**: O nó recebe os parâmetros `min` e `max`.
-   **Validação**: Antes de fazer a requisição, o nó verifica se `min` e `max` são inteiros e se `min` é menor que `max`.
-   **Processamento**: O nó faz uma requisição HTTP para obter o número aleatório.
-   **Saída**: O resultado é retornado para o fluxo do n8n como um objeto com a propriedade `randomNumber`.

---

## ✅ Como testar no n8n

1.  Acesse a interface do n8n no seu navegador: [http://localhost:5678](http://localhost:5678).
2.  Crie um novo fluxo de trabalho.
3.  Adicione um novo nó e pesquise por **"Random"**. O nó customizado deve aparecer na lista.
4.  Configure os parâmetros `min` e `max` no nó.
5.  Execute o fluxo para ver o número aleatório gerado.

---

## 🔍 Referências

-   [Documentação oficial do n8n](https://docs.n8n.io/)
-   [API Random.org](https://www.random.org/clients/http/)