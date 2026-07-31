KERNEL_SOURCES := $(wildcard ../../src/Gren/Kernel/*.js)

bin/app: Makefile gren.json src/Main.gren $(KERNEL_SOURCES)
	gren make --optimize Main --output=bin/app

.PHONY: test
test: bin/app node_modules
	npm test

node_modules: package.json package-lock.json
	npm ci

.PHONY: clean
clean:
	rm -rf .gren
	rm -rf node_modules
	rm bin/app
