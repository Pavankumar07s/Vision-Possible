FROM python:3.10-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy SmartGuard research code (needed for model classes)
COPY ../SmartGuard /app/SmartGuard

# Copy microservice
COPY . /app/

# Config
ENV PYTHONUNBUFFERED=1

# Default: inference mode
CMD ["python", "main.py", "--mode", "infer", "--config", "config/settings.yaml"]
