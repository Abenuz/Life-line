// Registration Handler
document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const member = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        date: new Date().toLocaleString()
    };

    // Save locally
    let members = JSON.parse(localStorage.getItem('lifeline_data')) || [];
    members.push(member);
    localStorage.setItem('lifeline_data', JSON.stringify(members));

    // Show modal
    document.getElementById('thankYouModal').style.display = 'block';
    
    this.reset();
    loadMembers(); 
});

function closeModal() {
    document.getElementById('thankYouModal').style.display = 'none';
}

// Admin Panel Logic
function toggleAdmin() {
    const password = prompt("Enter Admin Password:");
    if (password === "admin123") {
        document.getElementById('adminPanel').style.display = "block";
        document.getElementById('adminBtn').style.display = "none";
        loadMembers();
    } else {
        alert("Incorrect Password.");
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
    if(confirm("Erase all registration records?")) {
        localStorage.removeItem('lifeline_data');
        loadMembers();
    }
}
