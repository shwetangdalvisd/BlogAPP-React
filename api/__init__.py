from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import  CORS

db = SQLAlchemy()

def create_app():
	app = Flask(__name__)
	CORS(app)
	cors = CORS(app,resources={
		r"/*" :{
		"origins" : "*"
		}

		})

	app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

	db.init_app(app)

	from .view import main
	app.register_blueprint(main)


	return app