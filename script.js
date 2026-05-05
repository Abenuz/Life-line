let clickTracker = 0;

// Save Form Data
document.getElementById('leadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const entry = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        plan: document.getElementById('plan').value
    };

    let data = JSON.parse(localStorage.getItem('gymLeads')) || [];
    data.push(entry);
    localStorage.setItem('gymLeads', JSON.stringify(data));

    alert("Success! We will contact you soon.");
    this.reset();
});

// Secret Admin Unlock
document.getElementById('secretTrigger').addEventListener('click', function() {
    clickTracker++;
    if (clickTracker >= 5) {
        clickTracker = 0;
        const pass = prompt("Access Key:");
        if (pass === "admin123") {
            showAdmin();
        } else {
            alert("Denied.");
        }
    }
});

function showAdmin() {
    document.getElementById('adminPanel').style.display = "flex";
    const data = JSON.parse(localStorage.getItem('gymLeads')) || [];
    const body = document.getElementById('tableBody');
    
    body.innerHTML = data.length > 0 
        ? data.map(i => `<tr><td>${i.name}</td><td>${i.phone}</td><td>${i.plan}</td></tr>`).join('')
        : "<tr><td colspan='3' style='text-align:center; padding:30px;'>No entries found.</td></tr>";
}

function closeModal() {
    document.getElementById('adminPanel').style.display = "none";
}

function deleteAll() {
    if(confirm("Permanently delete all records?")) {
        localStorage.removeItem('gymLeads');
        showAdmin();
    }
}
