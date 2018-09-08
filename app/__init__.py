import falcon

# falcon.API instances are callable WSGI apps
app = falcon.API()


from app.api.sample import things