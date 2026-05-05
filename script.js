document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const member = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        date: new Date().toLocaleDateString()
    };
    let members = JSON.parse(localStorage.getItem('gym_db')) || [];
    members.push(member);
    localStorage.setItem('gym_db', JSON.stringify(members));
    document.getElementById('thankYouModal').style.display = 'block';
    this.reset();
    loadMembers();
});

function closeModal() { document.getElementById('thankYouModal').style.display = 'none'; }

function toggleAdmin() {
    if (prompt("Admin Password:") === "admin123") {
        document.getElementById('adminPanel').style.display = "block";
        document.getElementById('adminBtn').style.display = "none";
        loadMembers();
    }
}

function loadMembers() {
    const list = document.getElementById('memberList');
    const members = JSON.parse(localStorage.getItem('gym_db')) || [];
    list.innerHTML = members.map(m => `<tr><td>${m.name}</td><td>${m.phone}</td><td>${m.service}</td><td>${m.date}</td></tr>`).join('');
}

function clearData() {
    if(confirm("Erase all?")) { localStorage.removeItem('gym_db'); loadMembers(); }
}
