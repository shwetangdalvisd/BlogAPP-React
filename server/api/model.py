from . import db
from datetime import datetime
class User(db.Model):
	user_id = db.Column(db.VARCHAR,primary_key=True)
	name = db.Column(db.String(50))
	saved = db.Column(db.PickleType)
	blog = db.relationship('Blog', backref='user')
	

class Blog(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	name = db.Column(db.String(50))
	time =  db.Column(db.DateTime, nullable=False,default=datetime.utcnow)
	title = db.Column(db.String(50))
	content = db.Column(db.Text(500))
	like = db.Column(db.Integer)
	user_id = db.Column(db.VARCHAR,db.ForeignKey('user.user_id'),nullable=False)


	
