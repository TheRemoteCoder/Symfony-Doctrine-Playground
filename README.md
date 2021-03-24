# Symfony + Doctrine Playground

- [Intro](#intro)
- [Config](#config)
- [Debugging](#debugging)
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

## Doctrine

```txt
php bin/console doctrine:query:sql "SHOW VARIABLES"
```

