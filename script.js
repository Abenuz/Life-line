let clickCount = 0;

// Registration Handling
document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const member = {
        name: document.getElementById('userName').value,
        phone: document.getElementById('userPhone').value,
        plan: document.getElementById('userPlan').value
    };

    // Save to Local Storage
    let list = JSON.parse(localStorage.getItem('gymData')) || [];
    list.push(member);
    localStorage.setItem('gymData', JSON.stringify(list));

    // Success Message
    alert("Thanks for registering, we will call you.");
    this.reset();
});

// Admin Access Trigger (Click footer 5 times)
document.getElementById('adminTrigger').addEventListener('click', function() {
    clickCount++;
    if (clickCount >= 5) {
        clickCount = 0;
        let pass = prompt("Enter Admin Password:");
        if (pass === "admin123") {
            openAdmin();
        } else {
            alert("Wrong Password");
        }
    }
});

function openAdmin() {
    document.getElementById('adminArea').style.display = "flex";
    const list = JSON.parse(localStorage.getItem('gymData')) || [];
    const tableBody = document.getElementById('memberList');
    
    tableBody.innerHTML = list.map(m => `
        <tr>
            <td>${m.name}</td>
            <td>${m.phone}</td>
            <td>${m.plan}</td>
        </tr>
    `).join('');
}

function closeAdmin() {
    document.getElementById('adminArea').style.display = "none";
}

function clearLeads() {
    if(confirm("Erase all member data?")) {
        localStorage.removeItem('gymData');
        openAdmin();
    }
}
