.PHONY: installDeps
installDeps:
	npm i

.PHONY: run
run:
	npm start

.PHONY: clean
clean:
	rm -rf ./build

.PHONY: build
build:
	npm run build

.PHONY: installFirebaseTools
installFirebase:
	npm i -g firebase-tools

.PHONY: deploy
deploy:
	firebase deploy
