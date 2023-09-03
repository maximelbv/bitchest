![bitchest logo](/documents/images/bitchest_logo.png)
**Final project - Multimedia Developer Professionalization Contract** <br >

`L'École Multimédia`

# Requirements

- PHP 8.1.0
- PHPmyAdmin 5.1.1

# Installation

- ## API

  ### Step 1 : Create a database named 'bitchest'

  ### Step 2 :

  ```shell
  cd api
  composer install
  php artisan migrate:refresh --seed
  php artisan serve
  ```

▶️ API will launch on the port `8000`

- ## Client interface

  ```shell
  cd app
  npm i
  npm run dev
  ```

  ▶️ Client app will launch on the port `5173`

# Documentation

### 🔗 [Brief](/documents/brief.docx)
