let adminClickCount = 0;

// Handle Form Submission
document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const newMember = {
        name: document.getElementById('userName').value,
        phone: document.getElementById('userPhone').value,
        plan: document.getElementById('userPlan').value
    };

    // Save Data
    let db = JSON.parse(localStorage.getItem('lebuGymLeads')) || [];
    db.push(newMember);
    localStorage.setItem('lebuGymLeads', JSON.stringify(db));

    alert("Thanks for registering, we will call you.");
    this.reset();
});

// Secret Admin Access (5 clicks on footer)
document.getElementById('footerTrigger').addEventListener('click', function() {
    adminClickCount++;
    if (adminClickCount >= 5) {
        adminClickCount = 0;
        let p = prompt("Password:");
        if (p === "admin123") {
            openAdmin();
        } else {
            alert("Wrong Password");
        }
    }
});

function openAdmin() {
    document.getElementById('adminArea').style.display = "flex";
    const data = JSON.parse(localStorage.getItem('lebuGymLeads')) || [];
    const list = document.getElementById('memberList');
    
    list.innerHTML = data.length > 0 
        ? data.map(m => `<tr><td>${m.name}</td><td>${m.phone}</td><td>${m.plan}</td></tr>`).join('')
        : "<tr><td colspan='3' style='text-align:center; padding:20px;'>No members yet.</td></tr>";
}

function closeAdmin() {
    document.getElementById('adminArea').style.display = "none";
}

function clearLeads() {
    if(confirm("Erase all data?")) {
        localStorage.removeItem('lebuGymLeads');
        openAdmin();
    }
}
