FROM node:12-alpine

WORKDIR /usr/backend

#
# @step Environment defaults 
# 
# ENV key value 

#
# @step Install tools 
# 
RUN npm i -g nodemon

#
# @step Install dependencies
# 
COPY package*.json ./
COPY yarn* ./
RUN yarn 

#
# @step Copy source code 
# 
COPY src ./src/
COPY tsconfig*json ./

RUN ls 

#
# @step Let's go! 
# @param {string} command - override start:dev with the command in docker compose 
# 
EXPOSE 3000
CMD ["yarn", "run", "start:dev"]
