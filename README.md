# camping-app

1. Add Your Credentials
Edit backend/src/main/resources/application.properties:

properties
cloudinary.cloud-name=YOUR_CLOUD_NAME
cloudinary.api-key=YOUR_API_KEY
cloudinary.api-secret=YOUR_API_SECRET
2. Add Mapbox Token
Edit frontend/js/map.js:

javascript
mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';
3. Start MongoDB
bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# OR install MongoDB locally
4. Run Backend
bash
cd backend
mvn clean install
mvn spring-boot:run
5. Run Frontend
bash
cd frontend
# Using Python (if installed)
python -m http.server 3000

# OR using npx
npx http-server -p 3000
6. Access Your App
Open browser: http://localhost:3000

Backend API: http://localhost:8080



