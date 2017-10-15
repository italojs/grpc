FROM node
WORKDIR ./app
COPY . .
run npm install
EXPOSE 3000 80 8080
run ls
CMD [ "npm", "start" ]
