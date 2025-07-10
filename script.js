// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainMenu = document.getElementById('mainMenu');

mobileMenuBtn.addEventListener('click', () => {
    mainMenu.classList.toggle('show');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (this.getAttribute('href') === '#') return;
        
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (targetId.startsWith('#service-')) {
            // Hide all service pages
            document.querySelectorAll('.service-page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show the selected service page
            document.querySelector(targetId).classList.add('active');
            
            // Scroll to the service page
            window.scrollTo({
                top: document.querySelector(targetId).offsetTop - 80,
                behavior: 'smooth'
            });
        } else if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        if (mainMenu.classList.contains('show')) {
            mainMenu.classList.remove('show');
        }
    });
});

// Sticky header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        header.style.background = 'var(--white)';
    }
});

// Form submission
const consultationForm = document.getElementById('consultationForm');
const successMessage = document.getElementById('successMessage');

consultationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Prepare the SMS content
    const smsBody = `New Consultation Request:%0A%0A
Name: ${name}%0A
Email: ${email}%0A
Phone: ${phone}%0A
Service: ${service}%0A
Message: ${message}`;
    
    // Prepare the email content
    const subject = `New Consultation Request from ${name}`;
    const emailBody = `Name: ${name}%0D%0A
Email: ${email}%0D%0A
Phone: ${phone}%0D%0A
Service: ${service}%0D%0A%0D%0A
Message:%0D%0A${message}`;
    
    // Send email
    window.open(`mailto:cavnish07@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`, '_blank');
    
    // Send WhatsApp message
    window.open(`https://wa.me/919975146866?text=${encodeURIComponent(smsBody)}`, '_blank');
    
    // Show success message
    successMessage.style.display = 'block';
    
    // Reset form
    consultationForm.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
});

// Service page navigation
window.addEventListener('hashchange', function() {
    const hash = window.location.hash;
    if (hash.startsWith('#service-')) {
        // Hide all service pages
        document.querySelectorAll('.service-page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show the selected service page
        document.querySelector(hash).classList.add('active');
        
        // Scroll to the service page
        window.scrollTo({
            top: document.querySelector(hash).offsetTop - 80,
            behavior: 'smooth'
        });
    }
});

// Initialize service pages based on URL hash
if (window.location.hash.startsWith('#service-')) {
    document.querySelector(window.location.hash).classList.add('active');
}

// AI Image Generator Logic
document.getElementById('generate-office').addEventListener('click', function() {
    const prompt = document.getElementById('office-prompt').value;
    if (!prompt) {
        alert('Please enter a description for your office design');
        return;
    }
    
    // Show loading indicator
    document.getElementById('office-loading').style.display = 'block';
    document.querySelector('#office-result .ai-placeholder').style.display = 'none';
    document.getElementById('office-generated-img').style.display = 'none';
    
    // Simulate AI processing time
    setTimeout(() => {
        // Hide loading indicator
        document.getElementById('office-loading').style.display = 'none';
        
        // Get selected style
        const selectedStyle = document.querySelector('.style-option.active').dataset.style;
        
        // In a real implementation, this would call an AI API
        // For demo purposes, we'll use a placeholder image based on style
        const styleImages = {
            'modern': 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'minimalist': 'https://images.unsplash.com/photo-1552664197-f9e6e9a6e9a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'industrial': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'scandinavian': 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        };
        
        const img = document.getElementById('office-generated-img');
        img.src = styleImages[selectedStyle];
        img.style.display = 'block';
    }, 2000);
});

// Style selection
document.querySelectorAll('.style-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.style-option').forEach(opt => {
            opt.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Style preview click
document.querySelectorAll('.style-preview').forEach(preview => {
    preview.addEventListener('click', function() {
        const style = this.dataset.style;
        
        // Update style selection
        document.querySelectorAll('.style-option').forEach(opt => {
            opt.classList.remove('active');
            if(opt.dataset.style === style) {
                opt.classList.add('active');
            }
        });
        
        // Scroll to AI generator
        document.getElementById('ai').scrollIntoView({ behavior: 'smooth' });
    });
});

// Save design button
document.getElementById('save-office').addEventListener('click', function() {
    const img = document.getElementById('office-generated-img');
    if (!img.src) {
        alert('Please generate a design first');
        return;
    }
    
    // Create a temporary link to download the image
    const link = document.createElement('a');
    link.href = img.src;
    link.download = 'arya-enterprises-office-design.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Share design button
document.getElementById('share-office').addEventListener('click', function() {
    const img = document.getElementById('office-generated-img');
    if (!img.src) {
        alert('Please generate a design first');
        return;
    }
    
    alert('In a real implementation, this would open a sharing dialog. For now, you can save and share the image.');
});