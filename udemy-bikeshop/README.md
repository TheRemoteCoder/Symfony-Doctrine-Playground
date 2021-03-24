# Udemy course - Details

- [About](#about)
- [Installation](#installation)
- [Run](#run)
- [Troubleshooting](#troubleshooting)

<br>

---

<br><br>

## About

### Symfony

#### Architecture

Losely coupled

- Doctrine and Twig are optional, but work great 
  out of the box and are well designed togeher (built by same team)
  
#### Environments

- `dev`  : Cache accelerator = disabled; Log/Debug = on; Log = alerts, errors; Own DB?
- `prod` : Cache accelerator = enabled; Debug = off; Log errors; Own DB?
- `test` : CLI environment - Functional tests, Batch scripts; Simulates cookies/HTTP; Own DB?

Best practices

- Work in `dev` until things work fine, then switch to others


### Project

- Interesting scripts are in `composer.json`, although they are best run separately

<br>

---

<br><br>

## Installation

### Basics

- CLI from website to have `symfony` command
- Install via CLI `symfony new XXX` (XXX = project name)

### Extra

- Route annotations: `composer require annotations`
- Twig: `composer require twig`

<br>

---

<br><br>

## Run

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

<br>

---

<br><br>

## Troubleshooting

### 404 / Content not found

Be aware that `symfony server:start` can be run from anywhere, not just web root.
It seems trying to resolve files locally from current folder, so if there are issues,
you are probably in the wrong folder. Only use this from web root!

### Caches

Symfony creates caches of PHP, Twig, configurations and other files even on DEV environment.
These need to be manually deleted.

```
# Delete all, everywhere
php bin/console cache:pool:clear cache.global_clearer

# Delete system caches
php bin/console cache:clear
```

