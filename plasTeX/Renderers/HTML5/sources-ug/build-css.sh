#!/usr/bin/env bash

# This script uses sass, and postcss with cssnano and autoprefixer
# Those can be installed using npm with
# sudo npm install -g sass postcss-cli autoprefixer cssnano-cli
sass --no-source-map --update sass:build
cd build
mv theme-ug.css theme-ug-pre.css
postcss --use autoprefixer -o theme-ug.css  theme-ug-pre.css
# cssnano theme-blue-pre.css > theme-blue.css
cp theme-ug.css ../../Themes/ugbook/styles/
mv theme-ug.css ../../Themes/ug/styles/
cd ..
rm -rf build
