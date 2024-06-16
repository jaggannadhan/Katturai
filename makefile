create-venv:
	python3 -m venv .venv

setup:
	pip install -r requirements.txt;
	cd ./FrontEnd; yarn install;

deploy-default:
	gcloud app deploy app.yaml --no-cache --promote --version=raconteur

deploy-queue:
	gcloud app deploy queue.yaml

## USE WITH CAUTION - DEPLOYS EVEN IF BUILD FAILS
build-deploy-default:
	make build;
	make deploy-default;

## FrontEnd
setup-frontend:
	cd ./FrontEnd; yarn install;

build:
	cd ./FrontEnd; yarn build;

watch:
	cd ./FrontEnd; yarn start;

