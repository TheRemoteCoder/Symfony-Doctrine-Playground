# Symfony + Doctrine Playground

- [Intro](#intro)
- [Config](#config)
- [Setup](#setup)
- [Debugging](#debugging)
- [Maintenance](#maintenance)
- [Doctrine](#doctrine)

<br>

---

<br><br>

## Intro

As of 2021/03: All Symfony setups are empty and unused, except for :

- `/website/` - Basic config, dev stack, secrets
- `/udemy-bikeshop/` - Udemy course data

<br>

---

<br><br>

## Config

Set in `.env` file:

```txt
DATABASE_URL="mysql://root:@127.0.0.1:3306/example_store"
```

<br>

---

<br><br>

## Setup

### Server certificate

- MacOS: Switch to admin user and install there, than switch back
  - Root user might be disabled and cannot be used
  - Sudo user switching did not work in own test

### Dependencies

- `composer install`
- `npm i`

### ENV file config

- Set user and password in `.env` under `DATABASE_URL`
- Make sure SQL user has correct authentication method for SQL/PHP version
  - Here: Needs the older 'Standard' auth (not SHA2)

### Create + Fill database

Optional, if files exist – Create DB + tables with content.

- `php bin/console doctrine:database:create`
- `php bin/console doctrine:migrations:migrate`


<br>

---

<br><br>

## Debugging

Exemplaric showcases.

```txt
# Show Services + Use cases
php bin/console debug:autowiring

# Show Symfony, Kernel, PHP versions + other details
php bin/console about

# Security config
php bin/console debug:config security

# Show events
php bin/console debug:event-dispatcher kernel.controller
```

<br>

---

<br><br>

## Maintenance

Via Symfony CLI (install separately) - Check package security (similar to NPM).

```txt
symfony check:security
```

<br>

---

<br><br>

## Doctrine

```txt
php bin/console doctrine:query:sql "SHOW VARIABLES"
```

