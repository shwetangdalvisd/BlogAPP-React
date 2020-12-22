from flask import Blueprint,jsonify,request
from . import db
from .model import Blog

main = Blueprint('main',__name__)

@main.route('/add_blogs',methods=['POST'])
def add_blogs():
	blog_data = request.get_json()

	new_blog = Blog(title = blog_data['title'],content=blog_data['content'],name=blog_data['name'],user_id=blog_data['user_id'])
	db.session.add(new_blog)
	db.session.commit()


	return 'Done',201

@main.route('/blogs',methods=['GET'])
def blogs():
	Blog_list = Blog.query.all()

	blogs = []

	for blog in Blog_list:
		blogs.append({'title': blog.title,'content':blog.content,'name':blog.name,'time':blog.time,'id':blog.id,'user_id':blog.user_id})
	return jsonify(blogs)

@main.route('/singleblog/<post_id>',methods=['GET','POST'])
def singleblog(post_id):
	# selected_id = request.get_json()
	fb = Blog.query.filter_by(id=int(post_id)).first()
	singleb = {'title': fb.title,'content':fb.content,'name':fb.name,'time':fb.time,'id':fb.id,'user_id':fb.user_id}

	return jsonify(singleb)

@main.route("/deleteblog/<post_id>", methods=['GET', 'POST','DELETE'])
def deleteblog(post_id):
	
	del_post = Blog.query.filter_by(id=int(post_id)).delete()
	db.session.commit()
	Blog_list = Blog.query.all()
	blogs = []
	for blog in Blog_list:
		blogs.append({'title': blog.title,'content':blog.content,'name':blog.name,'time':blog.time,'id':blog.id,'user_id':blog.user_id})
	return jsonify(blogs)

	

@main.route("/update/<post_id>",methods=['GET','POST'])
def update(post_id):
	up_post = Blog.query.filter_by(id=int(post_id)).first()

	blog_data = request.get_json()
	up_post.title = blog_data['title']
	up_post.content = blog_data['content']
	db.session.commit()

	return 'updated'