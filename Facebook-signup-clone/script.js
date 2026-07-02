document.querySelector('.signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const inputs = this.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    let valid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            valid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '#bdc7d8';
        }
    });
    if (valid) {
        alert('Sign up form submitted (demo only)');
    } else {
        alert('Please fill in all required fields.');
    }
});