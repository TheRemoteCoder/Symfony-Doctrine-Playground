# Udemy course - Details

- [About](#about)
- [Installation](#installation)

<br>

---

<br><br>

## About

### Symfony

Symfony is losely coupled

- Doctrine and Twig are optional, but work great 
  out of the box and are well designed togeher

### Project

- Interesting scripts are in `composer.json`, although they are best run separately

<br>

---

<br><br>

## Installation

- CLI from website to have `symfony` command
- Install via CLI `symfony new XXX` (XXX = project name)


### Start server

```
symfony.exe server:ca:install
symfony server:start
```

Test server: https://127.0.0.1:8000


### Stop server

Just quitting the running CLI does not properly shut down the server,
despite the web address won't be reachable anymore. Run this:

`symfony server:stop`

