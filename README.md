# MY ANNOTATIONS

This project is made with react, mysql, typescript, express, sass, ....

Code

Primeiro vou começar instalando e configurando o backend

    mkdir my-annotations
    cd my-annotations

        mkdir server
        cd server

    Para criar o arquivo packege.json
    npm init --y

    Para liberar acesso do backend para o frontend
    npm i cors

    Para que a variável passada seja protegida, não ficando publica
    npm i dotenv

    Para criar os endpoints
    npm i express

    Para criar a conexão com o banco de dados
    npm i mysql2

    Instalando bibliotecas de dependência de desenvolvimento, pois só serão usadas para desenvolver o projeto. Ou seja, essas bibliotecas não são instaladas no servidor.

    Para criar os tipos em typescript
    npm i -D @types/cors @types/express

    Para deixar o servidor mesmo quando modificado
    npm i -D ts-node-dev

    Para instalar o typescript
    npm i -D typescript


    No arquivo package.json, adicionar:

    "scripts": {
        "start": "node dis/serve.js",
        "dev": "tsc -w"
    },

    Para inicializar o typescript
    npx tsc --init

    No arquivo tsconfig.json, adicionar:
    {
        "compilerOptions": {
            "target": "es2020",
            "module": "commonjs",
            "esModuleInterop": true,
            "forceConsistentCasingInFileNames": true,
            "strict": true,
            "skipLibCheck": true,
            "outDir": "./dist"
        },
        "include": [
            "./src/**/*"
        ]
    }

Endpoints: Backend

    / - login
    /add-user - criar usuário
    /modify-user - modificar dado do usuário
