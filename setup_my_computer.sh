#!/bin/bash

brew install python;
sudo pip install virtualenv;
virtualenv -p python3 env;
. env/bin/activate;
pip install -r requirements.txt