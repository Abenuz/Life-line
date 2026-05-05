// Registration Process
document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const member = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        date: new Date().toLocaleDateString()
    };

    // Save to LocalStorage
    let members = JSON.parse(localStorage.getItem('lifeline_data')) || [];
    members.push(member);
    localStorage.setItem('lifeline_data', JSON.stringify(members));

    // Show Thank You Popup
    document.getElementById('thankYouModal').style.display = 'block';
    
    this.reset();
    loadMembers(); // Refresh admin list
});

function closeModal() {
    document.getElementById('thankYouModal').style.display = 'none';
}

// Admin Dashboard Access
function toggleAdmin() {
    const password = prompt("Enter Admin Password:");
    if (password === "admin123") {
        document.getElementById('adminPanel').style.display = "block";
        document.getElementById('adminBtn').style.display = "none";
        loadMembers();
    } else {
        alert("Access Denied.");
    }
}

function loadMembers() {
    const list = document.getElementById('memberList');
    const members = JSON.parse(localStorage.getItem('lifeline_data')) || [];
    
    list.innerHTML = members.map(m => `
        <tr>
            <td>${m.name}</td>
            <td>${m.phone}</td>
            <td>${m.service}</td>
            <td>${m.date}</td>
        </tr>
    `).join('');
}

function clearData() {
    if(confirm("Are you sure you want to delete all records?")) {
        localStorage.removeItem('lifeline_data');
        loadMembers();
    }
}
