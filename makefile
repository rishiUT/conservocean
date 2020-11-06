.DEFAULT_GOAL := all
MAKEFLAGS += --no-builtin-rules
SHELL         := bash

ifeq ($(shell uname -s), Darwin)
    BLACK         := black
    CHECKTESTDATA := checktestdata
    COVERAGE      := coverage3
    MYPY          := mypy
    PYDOC         := pydoc3
    PYLINT        := pylint
    PYTHON        := python3
else ifeq ($(shell uname -p), unknown)
    BLACK         := black
    CHECKTESTDATA := checktestdata
    COVERAGE      := coverage
    MYPY          := mypy
    PYDOC         := pydoc
    PYLINT        := pylint
    PYTHON        := python
else
    BLACK         := black
    CHECKTESTDATA := checktestdata
    COVERAGE      := coverage3
    MYPY          := mypy
    PYDOC         := pydoc3
    PYLINT        := pylint3
    PYTHON        := python3
endif

# run docker
docker-front:
	docker run -it -p 3000:3000 -v ${PWD}/frontend:/usr/src/app joewallery/node
	# In Windows, switch to frontend and run: docker run -it -p 3000:3000 -v ${PWD}:/usr/src/app joewallery/node

docker-back:
	docker run -it -p 5000:5000 -v ${PWD}/backend:/conservocean joewallery/python

docker-deployment:
	docker build --no-cache -t joewallery/conservocean . 
	docker push joewallery/conservocean 

# deploy on EC2 instance
deploy:
	sudo docker container stop $$(sudo docker ps -a -q)
	sudo docker pull joewallery/conservocean
	sudo docker run -d -p 80:80 joewallery/conservocean

# run development servers
develop: develop-back develop-front

develop-front:
	npm start --prefix frontend

develop-back:
	sudo $(PYTHON) backend/conservoceanAPI.py

# get git config
config:
	git config -l

# get git log
ConservOcean.log:
	git log > ConservOcean.log

# get git status
status:
	make clean
	@echo
	git branch
	git remote -v
	git status

# download files from the ConservOcean code repo
pull:
	make clean
	@echo
	git pull
	git status

# upload files to the code repo
push:
	make clean
	@echo
	git add .gitignore
	git add .gitlab-ci.yml
	git add makefile
	git add README.md
	git commit -m "another commit"
	git push
	git status

all:

# auto format the code
format:
	npx prettier --write .

# remove temporary files
clean:
	rm -f  /backend/.coverage
	rm -f  /backend/.pylintrc
	rm -f  /backend/*.pyc
	rm -f  /backend/*.tmp
	rm -rf /backend/__pycache__
	rm -rf /backend.mypy_cache

# output versions of all tools
versions:
	@echo  'shell uname -p'
	@echo $(shell uname -p)
	@echo
	@echo  'shell uname -s'
	@echo $(shell uname -s)
	@echo
	# @echo  'npm -v'
	# @npm -v
	# @echo
	# @echo  'node -v'
	# @node -v
	# @echo
