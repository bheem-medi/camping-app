let map;
let markers = [];

// Initialize Mapbox map
function initMap() {
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN'; // Get from mapbox.com
    
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [-98.5795, 39.8283], // Center of USA
        zoom: 4
    });
    
    map.addControl(new mapboxgl.NavigationControl());
    
    // Load markers when map loads
    map.on('load', () => {
        loadMapMarkers();
    });
}

// Load markers on map
async function loadMapMarkers() {
    try {
        const packages = await getAllPackages();
        addMarkers(packages);
    } catch (error) {
        console.error('Error loading map markers:', error);
    }
}

// Add markers to map
function addMarkers(packages) {
    // Clear existing markers
    markers.forEach(marker => marker.remove());
    markers = [];
    
    packages.forEach(pkg => {
        if (pkg.latitude && pkg.longitude) {
            // Create popup
            const popup = new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                    <div style="padding: 10px;">
                        <h3>${pkg.name}</h3>
                        <p>${pkg.location}</p>
                        <p><strong>$${pkg.price}</strong> / ${pkg.duration} days</p>
                        <button onclick="window.location.href='dashboard.html'" 
                                style="background: #667eea; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                            View Details
                        </button>
                    </div>
                `);
            
            // Create marker
            const marker = new mapboxgl.Marker({
                color: '#e74c3c',
                draggable: false
            })
                .setLngLat([pkg.longitude, pkg.latitude])
                .setPopup(popup)
                .addTo(map);
            
            markers.push(marker);
        }
    });
}

// View location on map
function viewOnMap(latitude, longitude) {
    if (map) {
        map.flyTo({
            center: [longitude, latitude],
            zoom: 12,
            essential: true
        });
        
        // Highlight the marker
        markers.forEach(marker => {
            const markerLngLat = marker.getLngLat();
            if (Math.abs(markerLngLat.lat - latitude) < 0.0001 && 
                Math.abs(markerLngLat.lng - longitude) < 0.0001) {
                marker.togglePopup();
            }
        });
    }
    
    // Scroll to map
    document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
}

// Refresh markers when packages change
async function refreshMapMarkers() {
    await loadMapMarkers();
}
