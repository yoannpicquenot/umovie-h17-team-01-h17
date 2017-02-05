# Umovie

This a webplatform to see movies. This has been realised with angularJS with Materializecss Framework.





## Required

> node && npm



### Debian Based

```
$> sudo apt-get install nodejs
```

### Archlinux

```
$> sudo pacman -S install nodejs npm
```

### OpenSuse

```
$> sudo yum -y install nodejs
```



## Run the application

Run this command at the root of the project

```
$> npm install
```

> This will install all dependencies the application need to be launched correctly



Then:

```
$> node server.js
```

Finally open your browser and go on http://localhost:4242



## Description

> ### Routes :

Page home.html

```
HOME -> /#!/home
```



Page movie.html

```
MOVIE -> /#!/infofilm
```

Notes : I created this route but actually it's a template of modal. If you want to see this page in its right context, check /watchlist, and then double click on a cover in the carousel.



Page tvshow.html

```
TVSHOW -> /#!/tvshow
```



Page actor.html

```
ACTOR -> /#!/actor
```