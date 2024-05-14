!#/bin/bash
gunicorn app:app.py --bind 0.0.0.0:5000 --workers 1