!#/bin/bash
gunicorn app:app --bind 0.0.0.0:3924 --workers 1