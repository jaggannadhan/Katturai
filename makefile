############################################################### SETUP ###################################################################

create-venv:
	python3 -m venv .venv

setup-frontend:
	cd ./FrontEnd; yarn install;

setup-backend:
	pip install -r requirements.txt;

setup:
	make setup-backend;
	make setup-frontend;

############################################################# DELPOY LIVE ###############################################################

deploy-default:
	gcloud app deploy app.yaml --no-cache --promote --version=Katturai

deploy-local:
	FLASK_APP=main.py flask run

deploy-queue:
	gcloud app deploy queue.yaml


########################################################### BUILD & DELPOY ##############################################################

## USE WITH CAUTION - DEPLOYS EVEN IF BUILD FAILS
build-deploy-default:
	make build;
	make deploy-default;

build-deploy-local:
	make build;
	make deploy-local;


############################################################## FRONTEND #################################################################

build:
	rm -rf static/dist;
	cd ./FrontEnd; yarn build;

watch:
	cd ./FrontEnd; yarn start;

