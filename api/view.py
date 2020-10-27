from flask import Blueprint,jsonify,request
from . import db
from .model import Blog

main = Blueprint('main',__name__)

@main.route('/add_blogs',methods=['POST'])
def add_blogs():
	blog_data = request.get_json()

	new_blog = Blog(title = blog_data['title'],content=blog_data['content'],name=blog_data['name'])
	db.session.add(new_blog)
	db.session.commit()


	return 'Done',201

@main.route('/blogs',methods=['GET'])
def blogs():
	Blog_list = Blog.query.all()

	blogs = []

	for blog in Blog_list:
		blogs.append({'title': blog.title,'content':blog.content,'name':blog.name,'time':blog.time,'id':blog.id})
	return jsonify({'blogs' : blogs})

@main.route('/singleblog/<post_id>',methods=['GET','POST'])
def singleblog(post_id):
	# selected_id = request.get_json()
	fb = Blog.query.filter_by(id=int(post_id)).first()
	singleb = []
	singleb.append({'title': fb.title,'content':fb.content,'name':fb.name,'time':fb.time,'id':fb.id})

	return jsonify({'singleb': singleb})