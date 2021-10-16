# udemy course - Real world app

- [Intro](#intro)
- [Setup](#setup)
- [Snippets](#snippets)
- [Notes](#notes)
- [Todo](#todo)

<br>

---

<br><br>

## Intro

Source of course:

- [udemy](https://www.udemy.com/course/learn-symfony-4-hands-on-creating-a-real-world-application)

<br>

---

<br><br>

## Setup

### Homestead

#### Setup

- MacOS: Update native PHP version 7.3x to 7.4 via Homebrew
  - Needs a lot of custom configuration + Re-Aliasing the `php` command
- Update `/etc/hosts` for new localhost domain
- Configure `Homestead.yaml`
  - Adjust paths and domains
  - Change NFS to RSYNCH?

Needed after configuration (note that it can reset/delete old changes, e.g. databases):

```txt
vagrant up --provision
```

#### Use

Useful commands after successful installation of Vagrant + Homestead.

##### Start

Start + Login to Vagrant from Homestead installation folder:

```txt
vagrant up
vagrant ssh
```

##### Configure

Run from within logged-in Vagrant:

```txt
# Default access
mysql -u homestead -p

# Password
secret

# Create DB
CREATE DATABASE `symfony_01`;
SHOW DATABASES;

# CTRL+D to exit SQL

# Check composer is installed
composer -v

# Create Symfony project
composer create-project symfony/website-skeleton symfony-01

# Exit + Reload machine
exit
vagrant reload
```

##### Update

From from Homestead installation folder:

```txt
# Manually synch local code with Vagrant (even from remote folders outside cwd)
vagrant rsync

# Only works if Homestead is used locally with project
# For Symfony, it is a Composer dependency -> Use this then:
vagrant rsync-auto
```

<br>

---

<br><br>

## Snippets

```txt
# Dump app configuration
php bin/console debug:config FrameworkBundle

# Services + Wiring
php bin/console debug:autowiring LoggerInterface
php bin/console debug:container monolog.logger

# Show routes for current ENV
php bin/console debug:router
```

<br>

---

<br><br>

## Notes

- Find custom comments with the prefix `@info` in any file not in the `/src` folder
  - Source is considered custom code completely, so it's not needed here

<br>

---

<br><br>

## Todo

- Research: Twig does not have any default templates installed as in vide?
  - Find more reliable data sources if removed, why and where ...
- Bug: Webpack/Encore does not work - Needed to comment out the bundle and config YAML
