// Registration Logic
document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const member = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        date: new Date().toLocaleDateString()
    };

    // Save to LocalStorage
    let members = JSON.parse(localStorage.getItem('gym_db_lebu')) || [];
    members.push(member);
    localStorage.setItem('gym_db_lebu', JSON.stringify(members));

    // Show Thank You Popup
    document.getElementById('thankYouModal').style.display = 'block';
    
    this.reset();
    loadMembers();
});

// Modal Controls
function closeModal() {
    document.getElementById('thankYouModal').style.display = 'none';
}

// Admin Logic
function toggleAdmin() {
    const code = prompt("Enter Management Key:");
    if (code === "admin123") {
        document.getElementById('adminPanel').style.display = "block";
        document.getElementById('adminBtn').style.display = "none";
        loadMembers();
    } else {
        alert("Invalid Access.");
    }
}

function loadMembers() {
    const list = document.getElementById('memberList');
    const members = JSON.parse(localStorage.getItem('gym_db_lebu')) || [];
    
    list.innerHTML = members.map(m => `
        <tr>
            <td>${m.name}</td>
            <td>${m.phone}</td>
            <td><span style="color:#fbbf24">${m.service}</span></td>
            <td>${m.date}</td>
        </tr>
    `).join('');
}

function clearData() {
    if(confirm("Delete all registration records?")) {
        localStorage.removeItem('gym_db_lebu');
        loadMembers();
    }
}
