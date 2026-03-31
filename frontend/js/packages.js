// Load packages for home page
async function loadPackages() {
    try {
        const packages = await getAllPackages();
        displayPackages(packages);
    } catch (error) {
        console.error('Error loading packages:', error);
        showNotification('Failed to load packages', 'error');
    }
}

function displayPackages(packages) {
    const container = document.getElementById('packagesList');
    if (!container) return;
    
    if (packages.length === 0) {
        container.innerHTML = '<p>No packages available.</p>';
        return;
    }
    
    container.innerHTML = packages.map(pkg => `
        <div class="package-card">
            ${pkg.images && pkg.images[0] ? 
                `<img src="${pkg.images[0]}" alt="${pkg.name}" class="package-image">` : 
                `<div class="package-image" style="background: #ddd; display: flex; align-items: center; justify-content: center;">
                    🏕️
                </div>`
            }
            <div class="package-info">
                <h3>${pkg.name}</h3>
                <p>📍 ${pkg.location}</p>
                <p>📅 ${pkg.duration} days</p>
                <p class="price">$${pkg.price}</p>
                <p>${pkg.description.substring(0, 100)}...</p>
                <button onclick="viewOnMap(${pkg.latitude}, ${pkg.longitude})" class="btn btn-primary" style="margin-top: 10px;">
                    View on Map
                </button>
            </div>
        </div>
    `).join('');
}

// Load packages for dashboard table
async function loadPackagesTable() {
    try {
        const packages = await getAllPackages();
        displayPackagesTable(packages);
    } catch (error) {
        console.error('Error loading packages:', error);
        showNotification('Failed to load packages', 'error');
    }
}

function displayPackagesTable(packages) {
    const tbody = document.getElementById('packagesTableBody');
    if (!tbody) return;
    
    if (packages.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">No packages available.</td></tr>';
        return;
    }
    
    tbody.innerHTML = packages.map(pkg => `
        <tr>
            <td>${pkg.name}</td>
            <td>${pkg.location}</td>
            <td>$${pkg.price}</td>
            <td>${pkg.duration} days</td>
            <td class="action-buttons">
                <button onclick="editPackage('${pkg.id}')" class="btn btn-warning">Edit</button>
                <button onclick="deletePackageById('${pkg.id}')" class="btn btn-danger">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Search packages
async function searchPackages() {
    const searchInput = document.getElementById('searchInput');
    const location = searchInput.value.trim();
    
    if (!location) {
        loadPackages();
        return;
    }
    
    try {
        const packages = await searchPackages(location);
        displayPackages(packages);
    } catch (error) {
        console.error('Error searching packages:', error);
        showNotification('Search failed', 'error');
    }
}

// Save package (create or update)
async function savePackage(event) {
    event.preventDefault();
    
    const packageId = document.getElementById('packageId').value;
    const imagesInput = document.getElementById('images');
    
    // Upload images first
    const imageUrls = [];
    if (imagesInput.files.length > 0) {
        for (let file of imagesInput.files) {
            try {
                const url = await uploadImage(file);
                imageUrls.push(url);
            } catch (error) {
                console.error('Failed to upload image:', error);
            }
        }
    }
    
    const packageData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: parseFloat(document.getElementById('price').value),
        duration: parseInt(document.getElementById('duration').value),
        location: document.getElementById('location').value,
        latitude: parseFloat(document.getElementById('latitude').value),
        longitude: parseFloat(document.getElementById('longitude').value),
        availableDates: document.getElementById('availableDates').value.split(',').map(d => d.trim()),
        images: imageUrls
    };
    
    try {
        if (packageId) {
            await updatePackage(packageId, packageData);
            showNotification('Package updated successfully!', 'success');
        } else {
            await createPackage(packageData);
            showNotification('Package created successfully!', 'success');
        }
        
        closeModal();
        loadPackagesTable();
        loadPackages(); // Reload home page if visible
    } catch (error) {
        console.error('Error saving package:', error);
        showNotification('Failed to save package', 'error');
    }
}

// Edit package
async function editPackage(id) {
    try {
        const pkg = await getPackageById(id);
        
        document.getElementById('packageId').value = pkg.id;
        document.getElementById('name').value = pkg.name;
        document.getElementById('description').value = pkg.description;
        document.getElementById('price').value = pkg.price;
        document.getElementById('duration').value = pkg.duration;
        document.getElementById('location').value = pkg.location;
        document.getElementById('latitude').value = pkg.latitude;
        document.getElementById('longitude').value = pkg.longitude;
        document.getElementById('availableDates').value = pkg.availableDates ? pkg.availableDates.join(', ') : '';
        
        document.getElementById('modalTitle').textContent = 'Edit Package';
        document.getElementById('packageModal').style.display = 'block';
    } catch (error) {
        console.error('Error loading package:', error);
        showNotification('Failed to load package details', 'error');
    }
}

// Delete package
async function deletePackageById(id) {
    if (confirm('Are you sure you want to delete this package?')) {
        try {
            await deletePackage(id);
            showNotification('Package deleted successfully!', 'success');
            loadPackagesTable();
            loadPackages(); // Reload home page if visible
        } catch (error) {
            console.error('Error deleting package:', error);
            showNotification('Failed to delete package', 'error');
        }
    }
}

// Show add package form
function showAddPackageForm() {
    document.getElementById('packageForm').reset();
    document.getElementById('packageId').value = '';
    document.getElementById('modalTitle').textContent = 'Add New Package';
    document.getElementById('packageModal').style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('packageModal').style.display = 'none';
}

// Simple logout
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('packageModal');
    if (event.target === modal) {
        closeModal();
    }
}
