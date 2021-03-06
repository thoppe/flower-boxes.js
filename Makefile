all:
	@echo pass

view:
	chromium-browser index.html --allow-file-access-from-files &

css:
	emacs css/main.css &

js:
	emacs flower-boxes.js &

commit:
	@-make push

push:
	make
	git status
	git add Makefile README.md
	git add *.js css/*.css *.html
	git commit -a
	git push

clean:
	find . -name "*~" | xargs -I {} rm {}
	find . -name "\#" | xargs -I {} rm {}

#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=
# Build dependencies (if needed)
#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=

build_deps:
	git submodule init 
	git submodule update

