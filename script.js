// Space Explorer - Interactive JavaScript Adventure
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== TAB NAVIGATION ====================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ==================== EVENT HANDLING ====================
    
    // 1. Button Click Event (Launch Button)
    const clickBtn = document.getElementById('click-btn');
    const clickOutput = document.getElementById('click-output');
    
    clickBtn.addEventListener('click', function() {
        // Change message and add animation
        clickOutput.textContent = '🚀 Launch sequence initiated! Prepare for takeoff!';
        clickBtn.classList.add('pulse');
        
        // Simulate countdown with light effects
        const lights = document.querySelectorAll('.console-lights .light');
        lights.forEach(light => light.style.opacity = '1');
        
        // Play with the button
        clickBtn.textContent = 'Launching...';
        clickBtn.disabled = true;
        
        // Reset after animation
        setTimeout(() => {
            clickBtn.classList.remove('pulse');
            clickBtn.textContent = 'Initiate Launch Sequence';
            clickBtn.disabled = false;
            clickOutput.textContent = 'Ready for next launch sequence!';
            lights.forEach(light => light.style.opacity = '0.6');
        }, 3000);
    });
    
    // 2. Hover Effects (Asteroid Field)
    const hoverBox = document.getElementById('hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = 'Ship status: CAUTION! Navigating through asteroid field! 🚨';
        hoverOutput.style.borderLeftColor = '#e74c3c';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = 'Ship status: Safe distance from asteroids';
        hoverOutput.style.borderLeftColor = '#3498db';
    });
    
    // 3. Keypress Detection (Communication Console)
    const keyInput = document.getElementById('key-input');
    const keyOutput = document.getElementById('key-output');
    const consoleLights = document.querySelectorAll('.console-lights .light');
    
    keyInput.addEventListener('keyup', function(event) {
        // Blink the console lights
        consoleLights.forEach(light => {
            light.style.opacity = '1';
            setTimeout(() => {
                light.style.opacity = '0.6';
            }, 100);
        });
        
        // Show the key pressed
        keyOutput.textContent = `Transmission received: "${event.key}" (Signal code: ${event.keyCode})`;
        
        // Easter egg - special message for specific keys
        if (event.key === 'Enter') {
            keyOutput.textContent = `Message sent to mission control! Awaiting response...`;
            setTimeout(() => {
                keyOutput.textContent = `Mission control: "Copy that, space explorer! Continue your mission."`;
            }, 1000);
        }
    });
    
    // 4. Secret Action (Double-click)
    const secretBox = document.getElementById('secret-box');
    const secretOutput = document.getElementById('secret-output');
    
    secretBox.addEventListener('dblclick', function() {
        secretBox.className = 'secret-panel secret-revealed';
        secretBox.innerHTML = '<i class="fas fa-star"></i><span>Cosmic treasures!</span>';
        secretOutput.textContent = '🌟 Secret compartment unlocked! You\'ve discovered cosmic treasures! 🌟';
        
        // Create floating star particles
        for (let i = 0; i < 5; i++) {
            createStarParticle(secretBox);
        }
        
        // Reset after revealing the secret
        setTimeout(() => {
            secretBox.className = 'secret-panel';
            secretBox.innerHTML = '<i class="fas fa-question"></i><span>Double-click to unlock...</span>';
            secretOutput.textContent = 'This compartment seems to hide something...';
        }, 5000);
    });
    
    // Helper function to create star particles
    function createStarParticle(parent) {
        const star = document.createElement('i');
        star.className = 'fas fa-star';
        star.style.position = 'absolute';
        star.style.color = 'gold';
        star.style.fontSize = Math.random() * 10 + 8 + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animation = `float ${Math.random() * 2 + 1}s infinite`;
        parent.appendChild(star);
        
        setTimeout(() => {
            parent.removeChild(star);
        }, 4000);
    }
    
    // ==================== INTERACTIVE ELEMENTS ====================
    
    // 1. Color Changing Button (Nebula Viewer)
    const colorBtn = document.getElementById('color-btn');
    const nebulaGlow = document.querySelector('.nebula-glow');
    const colors = [
        '#3498db', // Blue
        '#e74c3c', // Red
        '#2ecc71', // Green
        '#f39c12', // Orange
        '#9b59b6'  // Purple
    ];
    let colorIndex = 0;
    
    colorBtn.addEventListener('click', function() {
        // Change the color of the nebula glow
        colorIndex = (colorIndex + 1) % colors.length;
        nebulaGlow.style.background = `radial-gradient(circle, ${colors[colorIndex]}aa 0%, ${colors[colorIndex]}00 70%)`;
        nebulaGlow.style.boxShadow = `0 0 30px ${colors[colorIndex]}`;
        
        // Add animation and color-shift effect
        nebulaGlow.classList.add('color-shift');
        colorBtn.classList.add('pulse');
        
        // Update the button text based on the current nebula color
        const nebulaNames = ['Blue Horizon', 'Red Giant', 'Emerald Cloud', 'Amber Dust', 'Purple Vortex'];
        colorBtn.textContent = `Viewing: ${nebulaNames[colorIndex]} Nebula`;
        
        // Remove animation class after animation completes
        setTimeout(() => {
            colorBtn.classList.remove('pulse');
        }, 500);
    });
    
    // 2. Image Gallery (Planetary Gallery)
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const galleryImg = document.getElementById('gallery-img');
    const imageCounter = document.getElementById('image-counter');
    
    const images = [
        'https://via.placeholder.com/400x200?text=Planet+1',
        'https://via.placeholder.com/400x200?text=Planet+2',
        'https://via.placeholder.com/400x200?text=Planet+3',
        'https://via.placeholder.com/400x200?text=Planet+4'
    ];
    
    const planetNames = ['Mercury', 'Venus', 'Earth', 'Mars'];
    let currentImageIndex = 0;
    let slideDirection = 'slide-right'; // Default slide direction
    
    function updateGallery() {
        // Add slide animation
        galleryImg.className = slideDirection;
        galleryImg.src = images[currentImageIndex];
        imageCounter.textContent = `${planetNames[currentImageIndex]} - Planet ${currentImageIndex + 1} of ${images.length}`;
        
        // Reset animation class after transition
        setTimeout(() => {
            galleryImg.className = '';
        }, 500);
    }
    
    nextBtn.addEventListener('click', function() {
        slideDirection = 'slide-left';
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGallery();
    });
    
    prevBtn.addEventListener('click', function() {
        slideDirection = 'slide-right';
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGallery();
    });
    
    // 3. Accordion (Space Encyclopedia)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Get the parent accordion item
            const accordionItem = this.parentElement;
            
            // Toggle the active class on the clicked accordion item
            accordionItem.classList.toggle('active-accordion');
            
            // Close other open accordions (comment out to allow multiple open accordions)
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this) {
                    otherHeader.parentElement.classList.remove('active-accordion');
                }
            });
        });
    });
    
    // ==================== FORM VALIDATION ====================
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('toggle-password');
    
    const nameValidation = document.getElementById('name-validation');
    const emailValidation = document.getElementById('email-validation');
    const passwordValidation = document.getElementById('password-validation');
    const formSuccess = document.getElementById('form-success');
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Change the eye icon
        togglePassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
    
    // Real-time validation as user types
    nameInput.addEventListener('input', function() {
        if (nameInput.value.trim() === '') {
            nameValidation.innerHTML = '<i class="fas fa-times-circle"></i> Astronaut name is required';
            nameValidation.className = 'validation-message invalid';
        } else {
            nameValidation.innerHTML = '<i class="fas fa-check-circle"></i> Ready for space exploration!';
            nameValidation.className = 'validation-message valid';
        }
    });
    
    emailInput.addEventListener('input', function() {
        // Email validation using regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            emailValidation.innerHTML = '<i class="fas fa-times-circle"></i> Communication channel required';
            emailValidation.className = 'validation-message invalid';
        } else if (!emailPattern.test(emailInput.value)) {
            emailValidation.innerHTML = '<i class="fas fa-times-circle"></i> Invalid communication format';
            emailValidation.className = 'validation-message invalid';
        } else {
            emailValidation.innerHTML = '<i class="fas fa-check-circle"></i> Communication channel established!';
            emailValidation.className = 'validation-message valid';
        }
    });
    
    passwordInput.addEventListener('input', function() {
        // Check password strength
        if (passwordInput.value.length < 8) {
            passwordValidation.innerHTML = '<i class="fas fa-times-circle"></i> Security code must be at least 8 characters';
            passwordValidation.className = 'validation-message invalid';
        } else {
            // Add a simple strength indicator
            let strength = 'Moderate';
            let strengthClass = 'valid';
            
            // Check for stronger password (has numbers, uppercase, lowercase and special chars)
            const hasNumber = /\d/.test(passwordInput.value);
            const hasUpper = /[A-Z]/.test(passwordInput.value);
            const hasLower = /[a-z]/.test(passwordInput.value);
            const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(passwordInput.value);
            
            if (hasNumber && hasUpper && hasLower && hasSpecial) {
                strength = 'Strong';
            }
            
            passwordValidation.innerHTML = `<i class="fas fa-check-circle"></i> ${strength} security clearance approved!`;
            passwordValidation.className = 'validation-message valid';
        }
    });
    
    // Form submission handling
    form.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();
        
        // Validate all fields
        let isValid = true;
        
        // Name validation
        if (nameInput.value.trim() === '') {
            nameValidation.innerHTML = '<i class="fas fa-times-circle"></i> Astronaut name is required';
            nameValidation.className = 'validation-message invalid';
            isValid = false;
        }
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailValidation.innerHTML = '<i class="fas fa-times-circle"></i> Communication channel required';
            emailValidation.className = 'validation-message invalid';
            isValid = false;
        } else if (!emailPattern.test(emailInput.value)) {
            emailValidation.innerHTML = '<i class="fas fa-times-circle"></i> Invalid communication format';
            emailValidation.className = 'validation-message invalid';
            isValid = false;
        }
        
        // Password validation
        if (passwordInput.value.length < 8) {
            passwordValidation.innerHTML = '<i class="fas fa-times-circle"></i> Security code must be at least 8 characters';
            passwordValidation.className = 'validation-message invalid';
            isValid = false;
        }
        
        // If all validations pass
        if (isValid) {
            // Show success message with animation
            formSuccess.classList.remove('hidden');
            
            // Disable the submit button temporarily
            document.getElementById('submit-btn').disabled = true;
            document.getElementById('submit-btn').textContent = 'Application Launched!';
            
            // Reset form after successful submission
            setTimeout(() => {
                form.reset();
                formSuccess.classList.add('hidden');
                nameValidation.textContent = '';
                emailValidation.textContent = '';
                passwordValidation.textContent = '';
                document.getElementById('submit-btn').disabled = false;
                document.getElementById('submit-btn').innerHTML = '<i class="fas fa-paper-plane"></i> Launch Application';
                togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
            }, 3000);
        }
    });
    
    // Initialize elements and effects
    // Set initial nebula color
    nebulaGlow.style.background = `radial-gradient(circle, ${colors[0]}aa 0%, ${colors[0]}00 70%)`;
    nebulaGlow.style.boxShadow = `0 0 30px ${colors[0]}`;
    colorBtn.textContent = 'View Next Nebula';
    
    // Initialize first planet in gallery
    updateGallery();
});
