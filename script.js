let secretCounter = 0;

// Handle Registration
document.getElementById('gymForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const newMember = {
        name: document.getElementById('fullName').value,
        phone: document.getElementById('phoneNumber').value,
        plan: document.getElementById('selectedPlan').value
    };

    // Save to Local Storage (Client-side DB)
    let members = JSON.parse(localStorage.getItem('gymLeads')) || [];
    members.push(newMember);
    localStorage.setItem('gymLeads', JSON.stringify(members));

    alert("Registration Successful! Our team will contact you shortly.");
    this.reset();
    updateAdminDisplay();
});

// Admin Panel Access Logic
function handleAdminTrigger() {
    secretCounter++;
    if (secretCounter >= 5) {
        secretCounter = 0;
        let pass = prompt("Enter Admin Password:");
        if (pass === "admin123") {
            document.getElementById('adminPanel').style.display = "block";
            updateAdminDisplay();
            window.scrollTo(0, document.body.scrollHeight);
        } else {
            alert("Wrong password!");
        }
    }
}

function updateAdminDisplay() {
    const members = JSON.parse(localStorage.getItem('gymLeads')) || [];
    const tableBody = document.getElementById('memberData');
    tableBody.innerHTML = members.map(m => `
        <tr>
            <td>${m.name}</td>
            <td>${m.phone}</td>
            <td>${m.plan}</td>
        </tr>
    `).join('');
}

function logoutAdmin() {
    document.getElementById('adminPanel').style.display = "none";
}
// Hidden Admin Logic: Click the footer 5 times
function adminTrigger() {
    clickCount++;
    if (clickCount >= 5) {
        clickCount = 0;
        let pass = prompt("Enter Admin Password:");
        if (pass === "admin123") {
            document.getElementById('adminPanel').style.display = "block";
            updateAdminTable();
            window.scrollTo(0, document.body.scrollHeight);
        }
    }
}

function updateAdminTable() {
    const list = JSON.parse(localStorage.getItem('gymDB')) || [];
    const body = document.getElementById('tableBody');
    body.innerHTML = list.map(m => `
        <tr style="border-bottom: 1px solid #333;">
            <td style="padding:10px;">${m.name}</td>
            <td style="padding:10px;">${m.phone}</td>
            <td style="padding:10px;">${m.plan}</td>
        </tr>
    `).join('');
}

function clearData() {
    if(confirm("Erase all records?")) {
        localStorage.removeItem('gymDB');
        updateAdminTable();
    }
}
