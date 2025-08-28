#!/usr/bin/env python
"""
Script to create sample data for the Django blog application.
Run this after setting up the database and creating a superuser.
"""

import os
import sys
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'blogproject.settings')
django.setup()

from django.contrib.auth.models import User
from blog.models import Post, Comment
from django.utils import timezone
import datetime

def create_sample_data():
    print("Creating sample data for Django Blog...")
    
    # Create sample users
    users_data = [
        {'username': 'john_doe', 'email': 'john@example.com', 'password': 'password123'},
        {'username': 'jane_smith', 'email': 'jane@example.com', 'password': 'password123'},
        {'username': 'bob_wilson', 'email': 'bob@example.com', 'password': 'password123'},
    ]
    
    users = []
    for user_data in users_data:
        user, created = User.objects.get_or_create(
            username=user_data['username'],
            defaults={
                'email': user_data['email'],
                'first_name': user_data['username'].split('_')[0].title(),
                'last_name': user_data['username'].split('_')[1].title() if '_' in user_data['username'] else '',
            }
        )
        if created:
            user.set_password(user_data['password'])
            user.save()
            print(f"Created user: {user.username}")
        users.append(user)
    
    # Create sample blog posts
    posts_data = [
        {
            'title': 'Welcome to Our Django Blog!',
            'content': '''Welcome to our new Django blog! This is our first post, and we're excited to share our thoughts and experiences with you.

This blog is built using Django, a powerful Python web framework that makes it easy to build robust web applications quickly. We've implemented features like user authentication, commenting, and a clean, responsive design.

Feel free to explore the site, create an account, and start sharing your own posts. We look forward to building a great community here!''',
            'author': users[0],
            'publication_date': timezone.now() - datetime.timedelta(days=5)
        },
        {
            'title': 'Getting Started with Django',
            'content': '''Django is an excellent choice for web development, especially if you're working with Python. Here are some key reasons why Django stands out:

**1. Rapid Development**
Django follows the "Don't Repeat Yourself" (DRY) principle, which means you can build applications quickly without writing redundant code.

**2. Security**
Django takes security seriously and helps developers avoid many common security mistakes like SQL injection, cross-site scripting, and cross-site request forgery.

**3. Scalability**
Many high-traffic sites like Instagram and Pinterest use Django, proving its ability to scale.

**4. Versatility**
Django can be used for almost any type of website or application, from content management systems to social networks.

Whether you're a beginner or an experienced developer, Django provides the tools you need to build amazing web applications.''',
            'author': users[1],
            'publication_date': timezone.now() - datetime.timedelta(days=3)
        },
        {
            'title': 'Best Practices for Web Development',
            'content': '''As web developers, following best practices is crucial for creating maintainable, secure, and efficient applications. Here are some essential practices to keep in mind:

**Code Organization**
- Keep your code clean and well-organized
- Use meaningful variable and function names
- Comment your code when necessary
- Follow consistent coding standards

**Security**
- Always validate user input
- Use HTTPS in production
- Keep dependencies up to date
- Implement proper authentication and authorization

**Performance**
- Optimize database queries
- Use caching where appropriate
- Minimize HTTP requests
- Optimize images and assets

**Testing**
- Write unit tests for your code
- Test user interactions
- Perform security testing
- Test across different browsers and devices

**Deployment**
- Use version control (Git)
- Automate deployment processes
- Monitor application performance
- Have backup and recovery plans

Following these practices will help you build better web applications and become a more effective developer.''',
            'author': users[2],
            'publication_date': timezone.now() - datetime.timedelta(days=1)
        },
        {
            'title': 'The Future of Web Development',
            'content': '''Web development is constantly evolving, and staying up-to-date with the latest trends and technologies is essential for any developer. Let's explore some exciting developments shaping the future of web development:

**Progressive Web Apps (PWAs)**
PWAs combine the best of web and mobile apps, offering offline functionality, push notifications, and app-like experiences directly in the browser.

**Serverless Architecture**
Serverless computing allows developers to focus on writing code without managing servers, leading to more scalable and cost-effective applications.

**AI and Machine Learning Integration**
More web applications are incorporating AI features like chatbots, recommendation systems, and automated content generation.

**WebAssembly**
WebAssembly enables running high-performance applications in the browser, opening up new possibilities for web-based software.

**Improved Developer Experience**
Tools and frameworks continue to improve, making development faster and more enjoyable with better debugging, hot reloading, and automated testing.

The future of web development looks bright, with exciting opportunities for innovation and creativity. As developers, embracing these changes and continuously learning will be key to success.''',
            'author': users[0],
            'publication_date': timezone.now() - datetime.timedelta(hours=6)
        }
    ]
    
    posts = []
    for post_data in posts_data:
        post, created = Post.objects.get_or_create(
            title=post_data['title'],
            defaults={
                'content': post_data['content'],
                'author': post_data['author'],
                'publication_date': post_data['publication_date']
            }
        )
        if created:
            print(f"Created post: {post.title}")
        posts.append(post)
    
    # Create sample comments
    comments_data = [
        {
            'post': posts[0],
            'author': users[1],
            'text': 'Great first post! Looking forward to more content on this blog.'
        },
        {
            'post': posts[0],
            'author': users[2],
            'text': 'Welcome to the blogging world! The site looks fantastic.'
        },
        {
            'post': posts[1],
            'author': users[0],
            'text': 'Excellent overview of Django! I especially appreciate the points about security and scalability.'
        },
        {
            'post': posts[1],
            'guest_name': 'Anonymous Reader',
            'text': 'Thanks for this informative post. As someone new to Django, this really helps!'
        },
        {
            'post': posts[2],
            'author': users[1],
            'text': 'These are solid best practices. The security section is particularly important in today\'s landscape.'
        },
        {
            'post': posts[3],
            'author': users[2],
            'text': 'Fascinating insights into the future of web development. PWAs are definitely game-changers!'
        },
        {
            'post': posts[3],
            'guest_name': 'Tech Enthusiast',
            'text': 'WebAssembly is so exciting! Can\'t wait to see what developers build with it.'
        }
    ]
    
    for comment_data in comments_data:
        comment, created = Comment.objects.get_or_create(
            post=comment_data['post'],
            text=comment_data['text'],
            defaults={
                'author': comment_data.get('author'),
                'guest_name': comment_data.get('guest_name', ''),
            }
        )
        if created:
            author_name = comment.author.username if comment.author else comment.guest_name
            print(f"Created comment by {author_name} on '{comment.post.title}'")
    
    print("\nSample data creation completed!")
    print(f"Created {User.objects.count()} users")
    print(f"Created {Post.objects.count()} posts")
    print(f"Created {Comment.objects.count()} comments")
    print("\nYou can now visit the blog and see the sample content.")
    print("Sample user credentials (username/password):")
    for user_data in users_data:
        print(f"  {user_data['username']}/password123")

if __name__ == '__main__':
    create_sample_data()