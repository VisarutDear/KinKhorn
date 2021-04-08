#!/bin/bash

apt-get update
apt install docker
apt install docker-compose

docker-compose up --build -d