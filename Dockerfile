FROM nikolaik/python-nodejs

RUN git clone https://gitlab.com/joewallery/cs373-group12.git

WORKDIR /cs373-group12

RUN git pull --force

RUN cd frontend && npm install && npm run-script build

RUN pip3 install -r backend/requirements.txt
RUN pip3 list

EXPOSE 80

CMD git pull --force && python3 backend/conservoceanAPI.py
