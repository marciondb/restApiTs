**RestFul API with TypeScript, TypeORM (MySql) and JWT**

---

API desenvolvida como parte do processo seletivo da Orbita.
Essa API contempla somente a parte BE do desafio (https://github.com/orbita-cc/challenge/blob/master/Backend.md).

---

## Instalação

Para executar a API, deve:

1. Instalar o **MySql** (https://dev.mysql.com/downloads/installer/)).
2. Instalar **nodejs** (https://nodejs.org/en/download/).
3. Instalar **Yarn** (https://yarnpkg.com/lang/en/docs/install)).
4. Baixar esse repositório.
5. Importar o aquivo orbita.sql, que está na pasta sql, no servidor MySql. O schema sera criado automaticamente.
6. Na raiz, executar npm install e depois yarn.

---

## Iniciar a aplicação

1. Vá para a raiz do projeto.
2. Execute **yarn start**.

---

## Acessar a aplicação

Com a aplicação iniciada (yarn start), acesse http://localhost:3333

Será carregada toda a documentação do projeto em Swagger, onde também pode ser testada a API. Lembrar de autenticar antes de utilizar qualquer método (menos login). Para se autenticar, vá em /auth/login (no swagger) e se log com email admin@admin.com e senha admin

![Swagger API](swagger_api.png?raw=true "Swagger API")

Caso prefira, importe o orbita.postman_collection.json no Postman, que está na raiz do projeto.
