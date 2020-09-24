# .DEFAULT_GOAL := all
# MAKEFLAGS += --no-builtin-rules
# SHELL         := bash

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

# # get git config
# config:
# 	git config -l

# # get git log
# Collatz.log:
# 	git log > Collatz.log

# # get git status
# status:
# 	make clean
# 	@echo
# 	git branch
# 	git remote -v
# 	git status

# # download files from the Collatz code repo
# pull:
# 	make clean
# 	@echo
# 	git pull
# 	git status

# # upload files to the code repo
# push:
# 	make clean
# 	@echo
# 	git add .gitignore
# 	git add .gitlab-ci.yml
# 	git add makefile
# 	git add README.md
# 	git commit -m "another commit"
# 	git push
# 	git status

# all:

# # check integrity of input file
# ctd-check:
# 	$(CHECKTESTDATA) RunCollatz.ctd RunCollatz.in

# # generate a random input file
# ctd-generate:
# 	$(CHECKTESTDATA) -g RunCollatz.ctd RunCollatz.tmp

# .pylintrc:
# 	$(PYLINT) --disable=locally-disabled --reports=no --generate-rcfile > $@

# # execute run harness and diff with expected output
# run: Collatz.py RunCollatz.py .pylintrc
# 	-$(MYPY)   Collatz.py
# 	-$(PYLINT) Collatz.py
# 	-$(MYPY)   RunCollatz.py
# 	-$(PYLINT) RunCollatz.py
# 	./RunCollatz.py < RunCollatz.in > RunCollatz.tmp
# 	diff RunCollatz.tmp RunCollatz.out

# # execute test harness
# test: Collatz.py TestCollatz.py .pylintrc
# 	-$(MYPY)   Collatz.py
# 	-$(PYLINT) Collatz.py
# 	-$(MYPY)   TestCollatz.py
# 	-$(PYLINT) TestCollatz.py
# 	$(COVERAGE) run    --branch TestCollatz.py
# 	$(COVERAGE) report -m

# # test files in the Collatz test repo
# TFILES := `ls collatz-tests/*.in`

# # execute run harness against a test in Collatz test repo and diff with expected output
# collatz-tests/%:
# 	./RunCollatz.py < $@.in > RunCollatz.tmp
# 	-diff RunCollatz.tmp $@.out

# # execute run harness against all tests in Collatz test repo and diff with expected output
# tests: collatz-tests
# 	for v in $(TFILES); do make $${v/.in/}; done

# # auto format the code
# format:
# 	$(BLACK) Collatz.py
# 	$(BLACK) RunCollatz.py
# 	$(BLACK) TestCollatz.py

# # create html file
# Collatz.html: Collatz.py
# 	-$(PYDOC) -w Collatz

# # check files, check their existence with make check
# CFILES :=                                 \
#     .gitignore                            \
#     .gitlab-ci.yml                        \
#     Collatz.html                          \
#     Collatz.log							  \
#    	collatz-tests/joewallery-RunCollatz.in\
#    	collatz-tests/joewallery-RunCollatz.out

# # check the existence of check files
# check: $(CFILES)

# # remove temporary files
# clean:
# 	rm -f  .coverage
# 	rm -f  .pylintrc
# 	rm -f  *.pyc
# 	rm -f  *.tmp
# 	rm -rf __pycache__
# 	rm -rf .mypy_cache

# # remove temporary files and generated files
# scrub:
# 	make clean
# 	rm -f  Collatz.html
# 	rm -f  Collatz.log
# 	rm -rf collatz-tests

# # output versions of all tools
# versions:
# 	@echo  'shell uname -p'
# 	@echo $(shell uname -p)
# 	@echo
# 	@echo  'shell uname -s'
# 	@echo $(shell uname -s)
# 	@echo
# 	@echo "% which $(BLACK)"
# 	@which $(BLACK)
# 	@echo
# 	@echo "% $(BLACK) --version"
# 	@$(BLACK) --version
# 	@echo
# 	@echo "% which $(COVERAGE)"
# 	@which $(COVERAGE)
# 	@echo
# 	@echo "% $(COVERAGE) --version"
# 	@$(COVERAGE) --version
# 	@echo
# 	@echo "% which $(MYPY)"
# 	@which $(MYPY)
# 	@echo
# 	@echo "% $(MYPY) --version"
# 	@$(MYPY) --version
# 	@echo
# 	@echo "% which $(PYDOC)"
# 	@which $(PYDOC)
# 	@echo
# 	@echo "% $(PYDOC) --version"
# 	@$(PYDOC) --version
# 	@echo
# 	@echo "% which $(PYLINT)"
# 	@which $(PYLINT)
# 	@echo
# 	@echo "% $(PYLINT) --version"
# 	@$(PYLINT) --version
# 	@echo
# 	@echo "% which $(PYTHON)"
# 	@which $(PYTHON)
# 	@echo
# 	@echo "% $(PYTHON) --version"
# 	@$(PYTHON) --version
