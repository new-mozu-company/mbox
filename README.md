# Mbox

Mbox is a Compass extension for Mozu that provides style boilerplate based on Bootstrap. It's build to be imported into your base sass files to provide access to global variables.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'mbox'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install mbox

## Usage

Add this to your config.rb:
    require 'mbox'

Add this to your base scss file:
    @import 'mbox';

For a full list of available classes and styles, see
    http://www.mozu.com/style-guide


## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake false` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/mbox.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
