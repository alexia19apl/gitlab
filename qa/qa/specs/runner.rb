require 'rspec/core'

module QA
  module Specs
    class Runner < Scenario::Template
      attr_accessor :tty, :tags, :options

      def initialize
        @tty = false
        @tags = []
        @options = [File.expand_path('./features', __dir__)]
      end

      def perform
        args = []
        args.push('--tty') if tty

        if tags.any?
          tags.each { |tag| args.push(['-t', tag.to_s]) }
        else
          args.push(%w[-t ~orchestrated])
        end

        args.push(options)

        Runtime::Browser.configure!

        RSpec::Core::Runner.run(args.flatten, $stderr, $stdout).tap do |status|
          abort if status.nonzero?
        end
      end
    end
  end
end
