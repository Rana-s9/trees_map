set -o errexit

bundle install
yarn install && ./bin/build && bundle exec rails assets:precompile
bundle exec rails assets:clean
bundle exec rails db:migrate