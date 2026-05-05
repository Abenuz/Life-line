let clickCount = 0;

// Handle Registration
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const member = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        plan: document.getElementById('service').value
    };

    // Save to LocalStorage
    let list = JSON.parse(localStorage.getItem('gymDB')) || [];
    list.push(member);
    localStorage.setItem('gymDB', JSON.stringify(list));

    // Show Success Modal
    document.getElementById('modal').style.display = 'block';
    this.reset();
    updateAdminTable();
});

function closeModal() {
    document.getElementById('modal').style.display = 'none';
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
