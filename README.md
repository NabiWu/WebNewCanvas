# WebNewCanvas
### Prerequisites
- PHP
- react.js
- laravel

### Run the web app locally
Before open terminal, open ./Lavarel/.env then change `DB_DATABASE=${CHANGE_ME_TO_PATH_web.sqlite}` at line 14 to `DB_DATABASE="path of web.sqlite inside this Labarel directory"`. An example is `DB_DATABASE=/Users/username/Downloads/WebNewCanvas-main/Lavarel/web.sqlite`. (absolute path)

Let's start the web, open the root directory of the project in two terminal.

In the first terminal,
```
  cd Lavarel
  composer install
  php artisan migrate
  php artisan migrate:fresh --seed
  php artisan serve
```

Then start client side in the second terminal,
```
  cd reactjs
  npm install
  npm start
```

It should bring you to the login page, please try to login as admin with username `admin@admin.com` and password `password`. Then you can start exploring our app!
