# customNoden8n

Este projeto contém a configuração de um ambiente **n8n** via Docker Compose, junto com um **nó customizado** para gerar números aleatórios consumindo a API do [Random.org](https://api.random.org/). O nó foi construído em TypeScript e é lido pelo n8n graças à configuração de volumes no Docker.

---

## Índice

1.  [Estrutura de Pastas](#-estrutura-de-pastas)
2.  [Dependências](#-dependências)
3.  [Configuração do Ambiente](#️-configuração-do-ambiente)
4.  [Operação: True Random Number](#-operação-true-random-number)
5.  [Como testar no n8n](#-como-testar-no-n8n)
6.  [Referências](#-referências)

---

## Estrutura de Pastas

- `docker/`: Contém arquivos de configuração para rodar o n8n via Docker Compose.
  -   `docker-compose.yaml`: Serviços Docker (n8n e Postgres).
  -   `.env`: Arquivo para variáveis de ambiente.

- `nodes/`
  - `randomNode/` : Contém o código-fonte do nó customizado e a imagem para o nó.
      -   `Random.node.ts`
      -   `Random.svg`

---

## Dependências

Este projeto utiliza as seguintes dependências no nó customizado:

- n8n-workflow: Necessário para criar o nó customizado.
- axios: Necessário para fazer a requisição à API.
- typescript: Linguagem de programação utilizada na tarefa.
- copyfiles: Biblioteca para copiar arquivos.

---

## Configuração do Ambiente

Siga estes passos para configurar e executar o projeto:

1. **Clone esse repositório.**
2. **`.env`**: Na pasta `docker/`, crie um arquivo chamado `.env` e defina as variáveis de ambiente necessárias para o PostgreSQL e o n8n.
   ```bash
   POSTGRES_USER=n8nuser
   POSTGRES_PASSWORD=n8npassword
   POSTGRES_DATABASE=n8n
   N8N_PORT=5678
   ```
3. **Contêineres Docker**: Na pasta `docker/`, execute o comando para iniciar o n8n e o PostgreSQL.
   ```bash
   sudo docker-compose up -d
   ```
4. **Dependências e compilação**: Navegue até a pasta `randomNode/` e execute os comandos para instalar as dependências e compilar o nó.
   ```bash
   npm install
   npm run dev
   ```

---

## Operação: True Random Number

O nó implementa uma única operação. A operação `trueRandom` gera um número aleatório usando a API do Random.org.

- O nó recebe os parâmetros `min` e `max`.
- Antes de fazer a requisição, o nó verifica se `min` e `max` são inteiros e se `min` é menor que `max`.
- O nó faz uma requisição HTTP para obter o número aleatório.
- O resultado é retornado para o fluxo do n8n como um objeto com a propriedade `randomNumber`.

---

## Como testar no n8n

1. Acesse a interface do n8n no seu navegador: [http://localhost:5678](http://localhost:5678).
2. Crie um novo fluxo de trabalho (workflow).
3. Adicione um novo nó e pesquise por **"Random"**.
4. Configure os parâmetros `min` e `max` no nó.
5. Execute o fluxo para ver o número aleatório gerado.

---

## Referências

- [Documentação oficial do n8n](https://docs.n8n.io/)
- [API Random.org](https://www.random.org/clients/http/)
- **Gemini**: Plataforma de IA utilizada para aprofundar o entendimento sobre o **n8n** e o processo de criação de nós customizados. A imagem Random.svg foi gerada com a ajuda do Gemini.


--- 

## Decisões de projeto e desafios

Dentro de `Random.node.ts`, foram criadas funções auxiliares para organizar melhor o código e separar responsabilidades, como a verificação dos inputs e a requisição à API externa. Os arquivos do `docker` também foram separados do código principal para melhorar a organização do projeto. A bibliioteca `copyfiles` foi utilizada para copiar a imagem do nó para dentro da pasta `dist`, fazendo com que o código fique multiplataforma.

Até o início desse case, o n8n era uma ferramenta desconhecida por mim e, por esse motivo, algumas pesquisas (no navegador, documentação e modelos de IA) foram necessárias para entender o funcionamento da ferramenta e como criar um nó customizado. Entretanto, ao fim do processo, foi possível entender o funcionamento do n8n e construir o nó personalizado.
