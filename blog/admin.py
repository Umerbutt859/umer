from django.contrib import admin
from .models import Post, Comment


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'publication_date', 'created_date')
    list_filter = ('publication_date', 'created_date', 'author')
    search_fields = ('title', 'content')
    prepopulated_fields = {'title': ('title',)}
    date_hierarchy = 'publication_date'
    ordering = ('-publication_date',)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('post', 'author_name', 'created_date', 'text')
    list_filter = ('created_date', 'post')
    search_fields = ('text', 'guest_name')
    date_hierarchy = 'created_date'
    ordering = ('-created_date',)
    
    def author_name(self, obj):
        return obj.author_name
    author_name.short_description = 'Author'
