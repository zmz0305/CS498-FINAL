from flask import Flask
from flask import render_template
app = Flask(__name__, static_folder="static")


@app.route('/')
def hello_world():
	return app.send_static_file("index.html")

@app.route('/<path:path>')
def static_proxy(path):
  # send_static_file will guess the correct MIME type
  return app.send_static_file(path)


if __name__ == '__main__':
	app.debug = True
	app.run()