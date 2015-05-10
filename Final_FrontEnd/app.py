from flask import Flask
from flask import render_template
from flask import jsonify
import urllib  

app = Flask(__name__, static_folder="static")

def jsonwrapper(data):
	d = {"status": "success", "data": data}
	return jsonify(d)

@app.route('/')
def hello_world():
	return app.send_static_file("materialised_index.html")

@app.route('/api/user')
def user():
	data = {"email" : "darwinsenior@gmail.com",
			"name" : "darwinsenior",
			"repo_ids" : ["1", "2", "3"]}
	return jsonwrapper(data)



@app.route('/api/repositories/<rid>')
def repos(rid):
	repos = {
		"1" : {"id": "1", "name": "CS450", "url": "#", "contents": []},
		"2" : {"id": "2", "name": "CS374", "url": "#", "contents": []},
		"3" : {"id": "3", "name": "PHYS326", "url": "#", "contents": []}
	}
	return jsonwrapper(repos[rid]);

@app.route('/api/content/<cid>')
def content(cid):
	return jsonwrapper({"id": "", "url": "#", "name": "nothing", "position": "nothing"})


@app.route('/d3js')
def d3():
	return app.send_static_file("d3js.html")

@app.route('/<path:path>')
def static_proxy(path):
	# send_static_file will guess the correct MIME type
	return app.send_static_file(path)

@app.route('/html')
def html():
	page = urllib.request.urlopen("https://courses.physics.illinois.edu/phys326/")
	return page.read()



if __name__ == '__main__':
	app.debug = True
	app.run()