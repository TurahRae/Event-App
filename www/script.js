document.getElementById('EventForm').addEventListener('submit', function(e)  {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const location = document.getElementById('location').value.trim();
    const date = document.getElementById('date').value;

    if (title && description && location && date) {
        const report = {title, description, location,date };

         saveReport(report);

    alert ("Report Submitted!");
    this.reset();

    showSection('list');
    loadReports();
    } else {
        alert("Please fill all fields.");
    }
}
);

function saveReport(report){
    let reports = JSON.parse(localStorage.getItem('reports')) || [];
    reports.push(report);
    localStorage.setItem('reports', JSON.stringify(reports));
}

function loadReports(){
    let reportList = document.getElementById('reportList');
    reportList.innerHTML = '';
    let reports = JSON.parse(localStorage.getItem('reports')) || [];

    if (reports.length ===0) {
        reportList.innerHTML = '<li>No reports yet.</li>';
        return;
    }

        reports.forEach((r, i) =>{
            let li = document.createElement('li');
            li.innerHTML = `
            <strong>${r.title}</strong><br>
            ${r.description}<br>
            <em>${r.location}</em><br>
            <small>${r.date}</small>
            `;
            reportList.appendChild(li);
         });
    }
    
    function showSection(section){
        document.getElementById('report-section').style.display = section === 'report' ? 'block' : 'none'; 
        document.getElementById('list-section').style.display = section === 'list' ? 'block' : 'none';
        if (section === 'list') loadReports();
    }
