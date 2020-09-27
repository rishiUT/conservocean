.DEFAULT_GOAL := all
MAKEFLAGS += --no-builtin-rules
SHELL         := bash

# ifeq ($(shell uname -s), Darwin)
#     BLACK         := black
#     CHECKTESTDATA := checktestdata
#     COVERAGE      := coverage3
#     MYPY          := mypy
#     PYDOC         := pydoc3
#     PYLINT        := pylint
#     PYTHON        := python3
# else ifeq ($(shell uname -p), unknown)
#     BLACK         := black
#     CHECKTESTDATA := checktestdata
#     COVERAGE      := coverage
#     MYPY          := mypy
#     PYDOC         := pydoc
#     PYLINT        := pylint
#     PYTHON        := python
# else
#     BLACK         := black
#     CHECKTESTDATA := checktestdata
#     COVERAGE      := coverage3
#     MYPY          := mypy
#     PYDOC         := pydoc3
#     PYLINT        := pylint3
#     PYTHON        := python3
# endif

# # run docker
# docker:
# 	docker run -it -v $(PWD):/usr/python -w /usr/python gpdowning/python

docker-front:
	docker run -it -p 3000:3000 -v $(PWD)/frontend:/usr/src/app joewallery/node

# docker-back:
# 	docker run -it -v $(PWD)/backend:/{workingdir} -w /{working dir} {docker id}/flask

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

# # auto format the code
# format:
# 	$(BLACK) Collatz.py
# 	$(BLACK) RunCollatz.py
# 	$(BLACK) TestCollatz.py
# 	npx prettier --write .

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
