# Projeto: TaskManager API

## Descrição
O TaskManager API é uma aplicação back-end desenvolvida em TypeScript, que fornece uma API RESTful para gerenciamento eficiente de tarefas. O sistema permite a criação, atualização, exclusão e listagem de tarefas, oferecendo recursos robustos para organização e acompanhamento das atividades.

### Principais Características
- **Criação de Tarefas:** Permite aos usuários criar novas tarefas com informações detalhadas.
- **Atualização de Tarefas:** Possibilita a modificação de títulos, descrições, datas de vencimento e prioridades de tarefas existentes.
- **Exclusão de Tarefas:** Oferece a funcionalidade de exclusão de tarefas não mais necessárias.
- **Listagem de Tarefas:** Permite a visualização de todas as tarefas, com opções de filtragem por prioridade, data de vencimento, entre outros.

### Tecnologias Utilizadas
- **Linguagem de Programação:** TypeScript, Fastify, Prisma, NodeJs
- **Banco de Dados:** SQLite
- **Autenticação:** JWT

### Requisitos de Desenvolvimento
- Node.js

### Documentação
A documentação da API, incluindo detalhes sobre endpoints, parâmetros e exemplos de requisições, pode ser encontrada na [inserir link da documentação aqui].

# Requisitos
## Requisitos Funcionais

- [ ] **Criação de Tarefas**
   - Os usuários devem poder criar novas tarefas fornecendo informações como título, descrição, data de vencimento, e prioridade.

- [ ] **Atualização de Tarefas**
   - As tarefas existentes podem ser atualizadas, permitindo aos usuários modificar título, descrição, data de vencimento e prioridade.

- [ ] **Exclusão de Tarefas**
   - Os usuários devem ser capazes de excluir tarefas que não são mais necessárias.

- [ ] **Listagem de Tarefas**
   - A API deve oferecer endpoints para listar todas as tarefas e também permitir filtragem com base em parâmetros como prioridade, data de vencimento, etc.

## Requisitos Não Funcionais

- [ ] **Persistência de Dados**
   - Utilizar um banco de dados relacional para armazenar as informações das tarefas de forma segura e duradoura.

- [ ] **Linguagem de Programação**
   - Desenvolver a API utilizando TypeScript para garantir um código mais robusto e manutenível.

- [ ] **Segurança e Autenticação**
   - Implementar um sistema de autenticação para proteger as operações da API, permitindo apenas acesso autorizado. Pode ser utilizado OAuth, JWT ou outra solução segura.

- [ ] **Documentação**
   - Criar documentação clara e abrangente para a API, utilizando ferramentas como Swagger ou API Blueprint.

## Regras de Negócios

- [ ] **Prioridades de Tarefas**
   - As prioridades das tarefas devem ser definidas como "Baixa", "Média" e "Alta".

- [ ] **Datas de Vencimento**
   - Todas as tarefas devem ter uma data de vencimento associada.

- [ ] **Restrições de Acesso**
   - Apenas usuários autenticados podem criar, atualizar, excluir e visualizar tarefas.

- [ ] **Validações de Dados**
   - Realizar validações nos dados fornecidos pelos usuários para garantir consistência e integridade das informações armazenadas.

- [ ] **Tratamento de Erros**
   - Implementar um sistema de tratamento de erros eficiente, fornecendo mensagens claras e status HTTP apropriados em caso de falhas nas operações.