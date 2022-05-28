src_js := $(wildcard src/*.js)
src_css := $(wildcard src/*.css)

.PHONY: dev clean clean-all watch-js watch-css serve dev build

clean:
	git clean -Xf

clean-all:
	git clean -Xdf

# * Development

watch-js:
	npx rollup --config -w

watch-css:
	npx tailwindcss --postcss -i src/main.css -o dist/built.css --watch

serve:
	(cd dist/ && python -m http.server 8080 2>/dev/null)

dev: dist/index.html
	npx concurrently "make watch-js" "make watch-css" "make serve"

# * build
build: dist/index.js dist/built.css dist/index.html

dist/index.js: $(src_js) package.json Makefile
	npx rollup --config

dist/built.css: $(src_css) package.json Makefile
	npx tailwindcss --minify --postcss -i src/main.css -o dist/built.css
