IMAGE := bug-tracker-client
VERSION := 0.0.16
REGISTRY_URL := ghcr.io/apinanyogaratnam/${IMAGE}:${VERSION}
REGISTRY_URL_LATEST := ghcr.io/apinanyogaratnam/${IMAGE}:latest

depcheck:
	npx depcheck

start:
	npm run dev

build:
	docker build -t ${IMAGE} .
	# docker buildx build --platform=linux/amd64 -t ${IMAGE} .

run:
	docker run -d -p 3000:3000 ${IMAGE}

exec:
	docker exec -it $(sha) /bin/sh

auth:
	grep -v '^#' .env.local | grep -e "CR_PAT" | sed -e 's/.*=//' | docker login ghcr.io -u USERNAME --password-stdin

tag:
	docker tag ${IMAGE} ${REGISTRY_URL}
	git tag -m "v${VERSION}" v${VERSION}

tag-image:
	docker tag ${IMAGE} ${REGISTRY_URL}
	docker tag ${IMAGE} ${REGISTRY_URL_LATEST}

push:
	docker push ${REGISTRY_URL}
	git push --tags

push-image:
	docker push ${REGISTRY_URL}
	docker push ${REGISTRY_URL_LATEST}

tag-git:
	git tag -m "v${VERSION}" v${VERSION}

push-git-tag:
	git push --tags

workflow:
	make tag-git && make push-git-tag

all:
	make build && make auth && make tag && make push
