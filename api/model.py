from . import db
from datetime import datetime
class Blog(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	name = db.Column(db.String(50))
	time =  db.Column(db.DateTime, nullable=False,default=datetime.utcnow)
	title = db.Column(db.String(50))
	content = db.Column(db.Text(500))
	
