const API_BASE_URL = 'http://localhost:8080/api';

// API Functions
async function apiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        showNotification('Error: ' + error.message, 'error');
        throw error;
    }
}

// Package APIs
async function getAllPackages() {
    return await apiCall('/packages');
}

async function getPackageById(id) {
    return await apiCall(`/packages/${id}`);
}

async function createPackage(packageData) {
    return await apiCall('/packages', 'POST', packageData);
}

async function updatePackage(id, packageData) {
    return await apiCall(`/packages/${id}`, 'PUT', packageData);
}

async function deletePackage(id) {
    return await apiCall(`/packages/${id}`, 'DELETE');
}

async function searchPackages(location) {
    return await apiCall(`/packages/search?location=${encodeURIComponent(location)}`);
}

// Upload Image
async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    
    try {
        const response = await fetch(`${API_BASE_URL}/upload`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data.url;
    } catch (error) {
        console.error('Upload Error:', error);
        showNotification('Failed to upload image', 'error');
        throw error;
    }
}

// Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem;
        background: ${type === 'error' ? '#e74c3c' : '#27ae60'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
