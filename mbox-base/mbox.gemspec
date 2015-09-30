# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
#$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
#require 'mbox-base/version'

Gem::Specification.new do |spec|

  # Basic Info
  spec.name          = "mbox-base"
  spec.version       = "0.1.2"
  spec.date         = "2015-08-10"
  spec.authors       = ["Katie"]
  spec.email         = ["katie_garcia@volusion.com"]
  spec.summary       = "Base for other Mbox Stylesets"
  spec.description   = "Variables, colors and type settings to be imported and shared by mbox-bootstrap and mbox-materialize"
  spec.homepage      = ""
  spec.homepage      = "http://mbox.netlify.com/"
  spec.license       = "MIT"

  # Gem Files
  spec.files = %w(README.mkdn)
  spec.files += Dir.glob("lib/**/*.*")
  spec.files += Dir.glob("stylesheets/**/*.*")
  spec.files += Dir.glob("templates/**/*.*")

  # Gem Bookkeeping
  spec.rubygems_version = %q{1.3.6}
  spec.add_dependency("compass", [">= 0.11"])
  spec.add_development_dependency "bundler", "~> 1.10"
  spec.add_development_dependency "rake", "~> 10.0"
end
