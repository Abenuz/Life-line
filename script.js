let counter = 0;

// Registration Script
document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const newEntry = {
        name: document.getElementById('userName').value,
        phone: document.getElementById('userPhone').value,
        plan: document.getElementById('userPlan').value
    };

    // Save to LocalStorage
    let data = JSON.parse(localStorage.getItem('gymLeads')) || [];
    data.push(newEntry);
    localStorage.setItem('gymLeads', JSON.stringify(data));

    // Success Alert
    alert("Thanks for registering, we will call you.");
    this.reset();
});

// Admin Trigger: Click footer 5 times
document.getElementById('footerTrigger').addEventListener('click', function() {
    counter++;
    if (counter >= 5) {
        counter = 0;
        let pass = prompt("Admin Password Required:");
        if (pass === "admin123") {
            showAdmin();
        } else {
            alert("Access Denied");
        }
    }
});

function showAdmin() {
    document.getElementById('adminArea').style.display = "flex";
    const data = JSON.parse(localStorage.getItem('gymLeads')) || [];
    const listBody = document.getElementById('memberList');
    
    listBody.innerHTML = data.length > 0 
        ? data.map(m => `<tr><td>${m.name}</td><td>${m.phone}</td><td>${m.plan}</td></tr>`).join('')
        : "<tr><td colspan='3' style='text-align:center;'>No registrations yet.</td></tr>";
}

function closeAdmin() {
    document.getElementById('adminArea').style.display = "none";
}

function clearLeads() {
    if(confirm("Erase all data?")) {
        localStorage.removeItem('gymLeads');
        showAdmin();
    }
}
