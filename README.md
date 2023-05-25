# wildhunt-client-personal-cabinet

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run docker compose (so far only production mode)
```
docker-compose -f docker-compose.yml up -d
```

### Notes
> Since version `4.1.4` the rules for passing parameters through push router have changed. 
At the moment, there is no understanding of how to transfer data without saving it after page reload.

❗**WARNING:** Upgrading `vue-router` to a version higher than `4.1.3` will break the functionality of the useBackButton hook.
