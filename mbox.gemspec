# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
#$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
#require 'mbox/version'

Gem::Specification.new do |spec|

  # Basic Info
  spec.name          = "mbox"
  spec.version       = "0.1.4"
  spec.date         = "2015-08-10"
  spec.authors       = ["Katie"]
  spec.email         = ["katie_garcia@volusion.com"]
  spec.summary       = "Mbox Bundle"
  spec.description   = "Mozu shared styles and code"
  spec.homepage      = ""
  #spec.homepage      = "TODO: Put your gem's website or public repo URL here."
  spec.license       = "MIT"

  # Gem Files
  spec.files = %w(README.mkdn)

  spec.add_dependency 'mbox-base', '>0.0.0'
  spec.add_dependency 'mbox-bootstrap', '>0.0.0'
  spec.add_dependency 'mbox-materialize', '>0.0.0'

  # Gem Bookkeeping
  spec.rubygems_version = %q{1.3.6}
  spec.add_dependency("compass", [">= 0.11"])
  spec.add_development_dependency "bundler", "~> 1.10"
  spec.add_development_dependency "rake", "~> 10.0"
end
