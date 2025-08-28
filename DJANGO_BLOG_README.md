# Django Blog Application

A simple blog application built with Django that allows users to create, view, and manage blog posts.

## Features

### Models
- **Post**: Title, content, author (ForeignKey to User), publication_date (auto-set on creation)
- **Comment**: Post reference, author (User or guest name), text content

### Views & Functionality
- **Post List View**: Display all blog posts ordered by publication date
- **Post Detail View**: Show full post content with comments
- **Create Post View**: Allow authenticated users to create new posts
- **Update/Delete Post Views**: Allow authors to edit/delete their own posts
- **Comment System**: Users can comment on posts (authenticated or guest)

### Authentication
- User registration, login, and logout
- Restricted post creation/editing to authenticated users
- Authors can only edit/delete their own posts

### Templates & Styling
- Responsive design using Bootstrap 5
- Clean, modern UI with Font Awesome icons
- Mobile-friendly navigation
- Message system for user feedback

## Installation & Setup

### Prerequisites
- Python 3.8+
- pip

### Installation Steps

1. **Clone or download the project files**

2. **Create and activate virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Apply database migrations**
   ```bash
   python manage.py migrate
   ```

5. **Create a superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run the development server**
   ```bash
   python manage.py runserver
   ```

7. **Access the application**
   - Main blog: http://127.0.0.1:8000/
   - Admin interface: http://127.0.0.1:8000/admin/

## Usage

### For Regular Users
1. **Register**: Create a new account to start posting
2. **Login**: Access your account
3. **Create Posts**: Write and publish blog posts
4. **Comment**: Leave comments on posts (login optional)
5. **Manage Posts**: Edit or delete your own posts

### For Administrators
- Access the admin interface at `/admin/`
- Manage users, posts, and comments
- View detailed post and comment statistics

## Default Admin Account
- Username: `admin`
- Password: `admin123`
- Email: `admin@example.com`

## Project Structure

```
blogproject/
├── blog/                   # Main blog application
│   ├── migrations/         # Database migrations
│   ├── templates/          # HTML templates
│   │   ├── blog/          # Blog-specific templates
│   │   └── registration/  # Authentication templates
│   ├── models.py          # Database models
│   ├── views.py           # View logic
│   ├── forms.py           # Django forms
│   ├── urls.py            # URL patterns
│   ├── admin.py           # Admin configuration
│   └── auth_views.py      # Authentication views
├── blogproject/           # Project settings
│   ├── settings.py        # Django settings
│   └── urls.py            # Main URL configuration
├── templates/             # Global templates
│   └── base.html          # Base template
├── static/                # Static files directory
├── manage.py              # Django management script
└── requirements.txt       # Python dependencies
```

## Key Features Implemented

✅ **Models**: Post and Comment with proper relationships  
✅ **Views**: List, Detail, Create, Update, Delete for posts  
✅ **Templates**: Bootstrap-styled responsive templates  
✅ **Forms**: Django forms with validation  
✅ **URLs**: Clean URL patterns  
✅ **Authentication**: User registration, login, logout  
✅ **Permissions**: Post editing restricted to authors  
✅ **Comments**: Both authenticated and guest comments  
✅ **Admin Interface**: Full admin panel integration  
✅ **Pagination**: Post list pagination  
✅ **Messages**: User feedback system  

## Customization

### Adding Features
- Extend models in `blog/models.py`
- Add new views in `blog/views.py`
- Create templates in `blog/templates/blog/`
- Update URL patterns in `blog/urls.py`

### Styling
- Modify `templates/base.html` for global changes
- Add custom CSS in the `static/` directory
- Update Bootstrap classes in templates

## Security Notes

- Change the `SECRET_KEY` in `settings.py` for production
- Set `DEBUG = False` in production
- Configure proper `ALLOWED_HOSTS` for deployment
- Use environment variables for sensitive settings

## License

This is a demonstration project for educational purposes.