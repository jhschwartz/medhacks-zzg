import falcon
from app import app


class IndexView(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.content_type = 'text/html'
        with open(app.config.base_path + '/app/static/index.html', 'r') as f:
            resp.body = f.read()

app.add_route('/', IndexView())

### THIS IS HOW WE WILL SEND OUR FRONTEND FILES ###