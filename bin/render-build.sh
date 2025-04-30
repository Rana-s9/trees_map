set -o errexit

bundle install
yarn install

esbuild app/javascript/*.* --bundle --outdir=app/assets/builds

bundle exec rails assets:precompile
bundle exec rails assets:clean
bundle exec rails db:migrate