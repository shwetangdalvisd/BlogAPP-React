from api import create_app
#from gevent.pywsgi import WSGIServer

if __name__ == '__main__':
	create_app().run(debug=True)