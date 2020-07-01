# What image do you want to start building on?
FROM node:current-alpine

# # Make a folder in your image where your app's source code can live
# RUN mkdir -p /src/app

# # Tell your container where your app's source code will live
# WORKDIR /src/app

# # What source code do you what to copy, and where to put it?
# COPY . /src/app


WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY . ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app


# What port will the container talk to the outside world with once created?
EXPOSE 3000

# start app
CMD ["npm", "start"]