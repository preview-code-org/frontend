PReview Code frontend [![Build Status](https://travis-ci.org/preview-code/frontend.svg?branch=master)](https://travis-ci.org/preview-code/frontend) [![Issues ready for review](https://badge.waffle.io/preview-code/frontend.png?label=ready%20for%20review&title=Ready%20for%20review)](http://waffle.io/preview-code/frontend)
=========
This is the frontend code for https://preview-code.com implemented with Polymer.

Please read the complete README.md file before executing any of the steps.

If you live in the Netherlands, please consider using the following mirror in "Ubuntu Software & Updates":
<ftp://ftpserv.tudelft.nl/pub/Linux/archive.ubuntu.com>

# Installation guide
## Prerequisites: nodejs, npm, and git
1. Install the LTS version (4.x) of [node.js](https://nodejs.org/en/). Please __do not__ install version 6.0 as it is not officially supported by [polymer](https://www.polymer-project.org/1.0/start/first-element/intro) (last checked on 2016.09.22).
 
		curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
		sudo apt-get install nodejs -y
2. install the _latest_ version of [npm](https://www.npmjs.com/):

		sudo npm install npm@latest -g
3. install [git](https://git-scm.com/):

		sudo apt-get install git -y
__Please note__: It is important to first install `nodejs`, as shown here, and then `npm`. The script for `nodejs` downloads an older version of `npm`, which we subsequently update.

## Install tooling
1. Install Chrome:

  	Please visit https://www.google.com/chrome/ to install the newest version of Chrome.

2. Install [Atom](https://atom.io/):

		curl -o atom.deb -sL https://atom.io/download/deb
		sudo dpkg -i atom.deb

## Install the npm (global) packages
1. install the [java](http://packages.ubuntu.com/en/trusty/default-jre) runtime

		sudo apt-get install default-jre
1. install [bower](https://bower.io/)

		sudo npm install -g bower
2. install [gulp](http://gulpjs.com/)
		
        sudo npm install -g gulp-cli
3. install [Polymer CLI](https://www.polymer-project.org/1.0/)
		
        sudo npm install -g polymer-cli
4. install [polyserve](https://github.com/PolymerLabs/polyserve)
		
        sudo npm install -g polyserve
5. install [web-component-tester](https://github.com/Polymer/web-component-tester)
		
        sudo npm install -g web-component-tester@4.2.2
5. install [web-component-tester-istanbul](https://github.com/thedeeno/web-component-tester-istanbul)
		
        sudo npm i -g web-component-tester-istanbul@git://github.com/TimvdLippe/web-component-tester-istanbul.git#coverage-log-test-result-fix
__Please note__: version `4.3.5` of `web-component-tester` causes errors. Please use `4.2.2` until further notice.

## Clone the frontend
1. Clone the repository
		
        git clone https://github.com/preview-code/frontend.git
2. Enter the (newly created) directory named `frontend`

## Prepare the frontend to run
1. Install the (local) npm packages
		
        sudo npm install -only=dev
2. Install bower packages
		
        bower install
__Please note__: It is important to first install the `npm` packages and then
the `bower` packages. The `bower` script depends on the former.

## Start up the frontend
* Use `gulp` to serve the frontend
		gulp serve

# Certificate warnings
The frontend makes use of a service-worker which in turn requires `https`. As
the development certificate has not been issued by a trusted authority, Chrome
will warn you that the site is not safe.

To make Chrome recognize the certificate, please follow these steps:
(These steps have been inspired by http://stackoverflow.com/a/15076602/2761676)

* Open Chrome and visit `localhost:5200`.
* Click on `ADVANCED` (on the bottom left of the page.)
* Click on `Proceed to localhost (unafe)`.
* Click on the red attention sign in the url bar.
* Click `Details`.
* Click `View certificate`.
* Click `Details`.
* Click `Export...`.
* Choose `PKCS #7, single certificate` as the file format.
* Save the file.
* Open Chrome Settings.
* Click `Show advanced settings...`.
* Under `HTTPS/SSL` click `Manage certificates`.
* Click the `Authorities` tab.
* Click `Import...`
* Select the saved file.
* Enable all the `trust settings` on the `Certificate authority` prompt.
* Reload the page on `localhost:5200`.
* There should now be a green (safe) lock next to the url.
