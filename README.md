# Mbox

Mbox is a collection of sass, js, and html files to be included in Mozu sites using either Compass or NPM, with options to build on a Bootstrap or Materialize framework. The entire repo can be installed as a ruby gem or an npm package, and then you can import whatever subset is relevant to your project.

## Structure

- font
  - currently for reference/copying only
- html
  - footer
  - head
  - header
  - nav
- js
  - mbox-base
  - mbox-materialize
- stylesheets
  - mbox-base
  - mbox-materialize
  - mbox-bootstrap

## Usage with Compass
Using this as a Compass extension has the marked disadvantage of providing access only to files within the /stylesheets directory. In other words, Compass lets you leverage the mbox scss but not the shared html or js.

For an example of a site using mbox-bootstrap running Compass, see [www-mozu](https://github.com/volusiondx/www-mozu).

### Installation

Add this line to your application's Gemfile:

```ruby
gem 'mbox', :git => 'https://github.com/volusiondx/mbox.git'
```

And then execute:

    $ bundle

<!--
Or install it yourself as:

    $ gem install mbox
-->

### Integrating scss

Add this to your config.rb:

    require 'mbox'

Add this to your base scss file:

    @import 'mbox-bootstrap';
    // OR
    @import 'mbox-base';
    @import 'mbox-materialize';

TODO: remove redundancies and make mbox-bootstrap dependent on mbox-base so that both frameworks can share key variables and elements.

### Compiling

The mbox styles will be compiled into your css the next time you run:

    $ compass watch or bundle exec compass watch

Congratulations! Now you can start using the mbox classes and variables!

### Updating

To update the mbox gem and get the latest changes, run:

    $ bundle update ––source mbox

## Usage with npm
Using this with npm provides more flexibility to incldue different file types, but this may require customization that depends on your build tool.

For an example of a site using mbox-materialize using node and gulp, see [mozu-static](https://github.com/volusiondx/mozu-static).


### Installation

Add this your package.json file:

    "mbox": "https://github.com/volusiondx/mbox"

And then execute:

    $ npm install mbox


### Integrating scss

To include mbox stylesheets, add this to your base scss file and compile with the build tool of your choice:

    @import 'mbox/stylesheets/mbox-bootstrap';
    // OR
    @import 'mbox/stylesheets/mbox-base';
    @import 'mbox/stylesheets/mbox-materialize';

### Integrating javascript

To include js files, add any/all of these to your base js file...

    var classToggler = require('mbox/js/mbox-base/classToggler.js');
    var marketoForms = require('mbox/js/mbox-base/marketoForms.js');
    var googleAnalytics = require('mbox/js/mbox-base/googleAnalytics.js');
    var modernizr = require('imports?this=>window!mbox/js/mbox-base/modernizr-2.6.2.js');
    var materialize = require('mbox/js/mbox-materialize/bin/materialize.min.js');

### Integrating html

To include html files, the best solution I've found is to copy them to a partials folder in your source files either manually or using a build tool like gulp. I'm using a gulp command "copypartials" to copy them from the node module to a partials folder like this:

    gulp.task('copypartials', function() {
      return gulp.src('./node_modules/mbox/html/**/*.html')
        .pipe(gulp.dest('./src/partials/mbox/'));
    });

Then simply include them as you would any other partial. This varies by framework, but my _head.html file looks like:

    [%- partial('/partials/mbox/head/addthis.html') %]
    [%- partial('/partials/mbox/head/gotham.html') %]
    [%- partial('/partials/mbox/head/gtm.html') %]
    [%- partial('/partials/mbox/head/optimizely.html') %]



## Style Sets

### Mbox Base

In the future, this will be the core variables and elements shared by all Mozu sites, regardless of whether they use the bootstrap, materialize, or no framework. At present, it can be used by itself or with mbox-materialize, but should not be used with mbox-bootstrap as it will be mostly redundant. However, once mbox-base stabilizes, we will remove the redundncies where mbox-base overlaps with mbox-bootstrap and they will become companion pieces.

* Reset css
* Scaffolding
* Buttons
* Colors
* Type
* Utilities
  *  Display & Position
  *  Visibility
  *  Margin & Padding
* Theme
  * Header
  * Footer
  * Nav

### Mbox Bootstrap

See the full [style guide](http://mbox.netlify.com/).

* Theme
  *  Background Color
  *  Borders
  *  Typography
  *  Type Usage
  *  Grid System
* Objects
  *  Buttons
  *  Lists
  *  Forms
* Components
  *  Blockquote
  *  Jumbotron
  *  Dropdowns

### Mbox Materialize

See [Materialize CSS](http://materializecss.com/).

* CSS
  * Color
  * Grid
  * Helpers
  * Media
  * Sass
  * Shadow
  * Table
  * Typography
* Components
  * Badges
  * Buttons
  * Cards
  * Chips
  * Collections
  * Footer
  * Forms
  * Icons
  * Navbar
  * Pagination
  * Preloader
* Javascript
  * Collapsible
  * Dialogs
  * Dropdown
  * Media
  * Modals
  * Parallax
  * Pushpin
  * ScrollFire
  * Scrollspy
  * SideNav
  * Tabs
  * Transitions
  * Waves


## Development

1. Check out this repo

2. Make your changes locally

3. In terminal, cd into the mbox folder and run the command `npm version minor` and note the new version number

4. Commit your changes and push them up to the master branch on github

5. On github, go to "releases" and create a new release tagged with the version number from step 3 (title and description don't matter)

6. Go into each site that pulls in mbox and update the version number next to "mbox" in the package.json file

_Note:_ As you develop locally, it may be helpful to point the gemfile of your application to a local copy of mbox with this:

    gem 'mbox', :path => '/local/path/to/your/mbox/'



<!-- After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake false` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org). -->

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/volusiondx/mbox.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
