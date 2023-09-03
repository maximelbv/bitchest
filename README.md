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

<iframe width="100%" height="500px" style="box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); border-radius:15px;" allowtransparency="true" allowfullscreen="true" scrolling="no" title="Embedded DrawSQL IFrame" frameborder="0" src="https://drawsql.app/teams/a-523/diagrams/bit-chest/embed"></iframe>
