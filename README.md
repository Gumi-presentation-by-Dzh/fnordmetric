FnordMetric
===========

[![Build Status](https://travis-ci.org/paulasmuth/fnordmetric.png?branch=unstable)](http://travis-ci.org/paulasmuth/fnordmetric)

FnordMetric (metricd) is a lightweight daemon for real-time metrics collection, storage
and visualization. It allows you to capture measurements and build beautiful
real-time dashboards within minutes.

**More information:**
[Documentation](http://fnordmetric.io/),
[Download](https://fnordmetric.io/download/),
[Getting Started](https://fnordmetric.io/documentation/getting_started)

[ ![Screenshot](https://raw.githubusercontent.com/paulasmuth/fnordmetric/master/fnordmetric-doc/web/assets/img/fnordmetric_server_screen1.png) ](http://github.com/paulasmuth/fnordmetric)

## Features

This is a quick run-through of the main features to get you excited. For
more detailed information on these topics and their caveats you are kindly
referred to the documentation.

- **Telemetry**: Collect timeseries data via HTTP, UDP/statsd, MQTT or SNMP

- **Visualization**: Render custom charts as SVG, HTML or PNG and embed them into
  any website

- **Queries**: Retrieve summaries and timeseries via the HTTP+JSON Query API

- Supports pull- and push-type sensors

- Self-contained, standalone daemon

- Large list of included sensors


## Build

Before we can start we need to install some build dependencies. Currently
you need a modern c++ compiler, libz and autotools.

    # Ubuntu
    $ apt-get install clang make automake autoconf libtool zlib1g-dev

    # OSX
    $ brew install automake autoconf

To build EventQL from a distribution tarball:

    $ ./configure
    $ make
    $ sudo make install

To build EventQL from a git checkout:

    $ git clone git@github.com:paulasmuth/fnordmetric.git
    $ cd fnordmetric
    $ ./autogen.sh
    $ ./configure
    $ make V=1
    $ sudo make install

To run the test suite:

    $ make check


## Documentation

You can find the full documentation at http://fnordmetric.io/


## Contributors

+ Laura Schlimmer (http://github.com/lauraschlimmer)
+ Henrik Muehe (http://github.com/henrik-muehe)
+ Philipp Bogensberger (http://github.com/bogensberger)
+ "Dolfly" (http://github.com/dolfly)
+ Christian Parpart (http://github.com/trapni)
+ Finn Zirngibl (https://github.com/finnomenon)
+ Simon Menke (http://github.com/fd)
+ Bruno Michel (http://github.com/nono)
+ Marco Borromeo (http://github.com/mborromeo)
+ Leo Lou (http://github.com/l4u)
+ Andy Lindeman (http://github.com/alindeman)
+ Jurriaan Pruis (http://github.com/jurriaan)
+ Kacper Bielecki (http://github.com/kazjote)
+ John Murray (http://github.com/JohnMurray)
+ Lars Gierth (http://github.com/lgierth)
+ Ross Kaffenberger (http://github.com/rossta)
+ Kunal Modi (http://github.com/kunalmodi)
+ Michael Fairchild (http://github.com/fairchild)
+ James Cox (http://github.com/imajes)
+ Pieter Noordhuis (http://github.com/pietern)
+ Tadas Ščerbinskas (http://github.com/tadassce)
+ Sebastian Korfmann (http://github.com/skorfmann)
+ Paul Asmuth (http://github.com/paulasmuth)

To contribute, please fork this repository, make your changes and run the 
specs, commit them to your github repository and send me a pull request.
Need help, head on over to our [Google Groups][1]  page to discuss any ideas
that you might have.


### License

Copyright (c) 2011-2016 Paul Asmuth

FnordMetric is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

FnordMetric is distributed in the hope that it will be useful,but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
FnordMetric. If not, see <http://www.gnu.org/licenses/>.


  [1]: http://groups.google.com/group/fnordmetric
  [2]: http://www.screenr.com/KiJs
  [3]: https://secure.travis-ci.org/paulasmuth/fnordmetric.png
  [4]: http://travis-ci.org/paulasmuth/fnordmetric
