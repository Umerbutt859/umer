from django import forms
from .models import Post, Comment


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter post title'
            }),
            'content': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 10,
                'placeholder': 'Write your blog post content here...'
            }),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['title'].help_text = "Enter a descriptive title for your post"
        self.fields['content'].help_text = "Write your blog post content. You can use HTML tags for formatting."


class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['text', 'guest_name']
        widgets = {
            'text': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 4,
                'placeholder': 'Write your comment here...'
            }),
            'guest_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Your name (optional for logged-in users)'
            }),
        }

    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)
        
        if user and user.is_authenticated:
            # Hide guest_name field for authenticated users
            self.fields['guest_name'].widget = forms.HiddenInput()
            self.fields['guest_name'].required = False
        else:
            # Make guest_name required for anonymous users
            self.fields['guest_name'].required = True
            self.fields['guest_name'].help_text = "Please enter your name"