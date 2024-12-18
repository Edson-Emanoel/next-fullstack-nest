## Referência

* Link do vídeo: https://www.youtube.com/watch?v=aouatZu9QiU

## Como ficou no Web(Computador)

![Imagem de Como ficou no computador](<web.png>)

## Comandos


### Comandos Front-end

***Comando para criar o projeto frontend***
```
npx create-next-app@latest frontend
```


### Comandos Back-end

***Comando para criar o projeto backend***
```
npx nest new backend
```

> Obs: Os camandos a seguir terão que ser executado na pasta backend

***Comando para instalar o prisma***
```
npm install prisma --save-dev
```

***Comando para inicializar o prisma com mysql***
```
npx prisma init --datasource-provider mysql
```

***Comando rodar uma migration***
```
npx prisma migrate dev
```

***Comando para criar um modelo de banco de dados***
```
npx nest g module db
```

***Comando para criar um modelo de CRUD***
```
npx nest g resource produto
```
> Obs: marque a opção "REST API" e a opção "Y"

> Obs: O camando a baixo terá que ser executado na pasta db. "backend/src/db"

***Comando para criar um modelo de service para o CRUD***
```
npx nest g service prisma --flat --no-spec
```