let secretCounter = 0;

// Registration Handling
document.getElementById('gymRegForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const data = {
        name: document.getElementById('custName').value,
        phone: document.getElementById('custPhone').value,
        plan: document.getElementById('custPlan').value
    };

    // Store in LocalStorage
    let existingData = JSON.parse(localStorage.getItem('memberLeads')) || [];
    existingData.push(data);
    localStorage.setItem('memberLeads', JSON.stringify(existingData));

    alert("Thanks for registering, we will call you.");
    this.reset();
});

// Admin Panel Access (5 Clicks on Footer)
document.getElementById('adminAccess').addEventListener('click', function() {
    secretCounter++;
    if (secretCounter >= 5) {
        secretCounter = 0;
        let p = prompt("Enter Admin Password:");
        if (p === "admin123") {
            displayAdmin();
        } else {
            alert("Unauthorized Access");
        }
    }
});

function displayAdmin() {
    document.getElementById('adminPanel').style.display = "flex";
    const data = JSON.parse(localStorage.getItem('memberLeads')) || [];
    const tableBody = document.getElementById('adminData');
    
    tableBody.innerHTML = data.length > 0 
        ? data.map(m => `<tr><td>${m.name}</td><td>${m.phone}</td><td>${m.plan}</td></tr>`).join('')
        : "<tr><td colspan='3' style='text-align:center; padding:20px;'>No members found.</td></tr>";
}

function hideAdmin() {
    document.getElementById('adminPanel').style.display = "none";
}

function clearData() {
    if(confirm("Confirm: Delete all registration data?")) {
        localStorage.removeItem('memberLeads');
        displayAdmin();
    }
}
