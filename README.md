# PLUGINS

-   ADD YARN

```
npm i -g yarn
```

-   ADD PRETTIER

```
yarn global add prettier
```

# INSTALL

-   INSTALL DEPENDENCIES

```
yarn
```

-   SETUP ENVIROMENT VARIABLES, THEN CREATE DB AN SET CREDENTIALS

```
cp .env.sample .env
```

-   SERVE DEV

```
yarn start
```

# PRODUCTION DEPLOY

-   SERVER USES [PM2](https://www.npmjs.com/package/pm2)

```
npm i -g pm2
```

-   START SERVER

```
pm2 start app.js --name app
```

-   LIST ALL APLICATIONS:

```
pm2 list
```

-   CHECK LOGS

```
pm2 logs
```

# OTHER REFS

-   [Integration with Pilot](https://www.pilotsolution.net/integraciones_api.php)
-   [EXPRESS-TYPESCRIPT](https://developer.okta.com/blog/2018/11/15/node-express-typescript)
-   [EXPRESS-TYPESCRIPT-MONGO](https://itnext.io/building-restful-web-apis-with-node-js-express-mongodb-and-typescript-part-1-2-195bdaf129cf)
