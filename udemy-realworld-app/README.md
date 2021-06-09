# udemy course - Real world app

- [Intro](#intro)
- [Setup](#setup)

<br>

---

<br><br>

## Intro

Course source

- [udemy](https://www.udemy.com/course/learn-symfony-4-hands-on-creating-a-real-world-application)

<br>

---

<br><br>

## Setup

### Homestead

#### MacOS

- MacOS: Update native PHP version 7.3x to 7.4 via Homebrew
  - Needs a lot of custom configuration + Re-Aliasing the `php` command

#### Use

Useful commands after successful installation of Vagrant + Homestead.

Start + Login to Vagrant:

```txt
vagrant up
vagrant ssh
```

From within logged-in Vagrant:

```txt
# Default access
mysql -u homestead -p
# secret

# Create DB
CREATE DATABASE `symfony-01`;
SHOW DATABASES;
# CTRL+D to exit SQL

# Check composer is installed
composer -v

# Create Symfony project
composer create-project symfony/website-skeleton symfony-01
```

