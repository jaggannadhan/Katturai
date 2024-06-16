create-venv:
	python3 -m venv .venv

setup:
	pip install -r requirements.txt 

deploy-default:
	gcloud app deploy app.yaml --no-cache --promote --version=raconteur

watch:
	cd ./FrontEnd; yarn start;

build:
	cd ./FrontEnd; yarn build;

deploy-queue:
	gcloud app deploy queue.yaml