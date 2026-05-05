let adminClicks = 0;

document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const lead = {
        name: document.getElementById('adminName').value,
        phone: document.getElementById('adminPhone').value,
        date: new Date().toLocaleDateString()
    };

    let data = JSON.parse(localStorage.getItem('leads')) || [];
    data.push(lead);
    localStorage.setItem('leads', JSON.stringify(data));

    alert(`Thank you ${lead.name}! We will call you soon.`);
    this.reset();
});

// Admin access: Click the footer 5 times
function checkAdmin() {
    adminClicks++;
    if(adminClicks >= 5) {
        adminClicks = 0;
        let pass = prompt("Admin Password:");
        if(pass === "1234") {
            const data = JSON.parse(localStorage.getItem('leads')) || [];
            console.table(data);
            alert("Member data printed to console. Check 'Inspect' -> 'Console'.");
        }
    }
}
