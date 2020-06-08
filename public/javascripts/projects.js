const projectCard = (project) => {
    console.log("Entered Instance");
    // Create elements needed to build a card  
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const img = document.createElement('img');
    const div3 = document.createElement('div');
    const div4 = document.createElement('div');
    const h4 = document.createElement('h4');
    const p = document.createElement('p');
    const div5 = document.createElement('div');
    const h31 = document.createElement('h3');
    const span1 = document.createElement('span');
    const div6 = document.createElement('div');
    const h32 = document.createElement('h3');
    const span2 = document.createElement('span');
    // Append newly created elements into the DOM
    const row = document.querySelector('.row');
    row.append(div1);
    div1.append(div2);
    div2.append(img);
    div2.append(div3);
    div3.append(div4);
    div4.append(h4);
    div3.append(p);
    div3.append(div5);
    div5.append(h31);
    h31.append(span1);    
    div5.append(span1);
    div3.append(div6);
    div6.append(h32);
    h32.append(span2);
    div6.append(span2); 
    // Set content and attributes
    h4.innerHTML = project.projectName;
    p.innerHTML = project.description;
    h31.innerHTML = "Contributers";
    var contri = "";
    for(var i = project.contributers.length -1; i >= 0; i--) {
        contri += project.contributers[i] + "<br>";
    }
    span1.innerHTML = contri;
    var tech = "";
    for(var i = project.techStack.length -1; i >= 0; i--) {
        tech += project.techStack[i] + "<br>";
    }
    span2.innerHTML = tech;
    h32.innerHTML = "Tech Stack";
    div1.setAttribute('class', 'col-lg-4 col-md-6 d-flex align-items-stretch');
    div2.setAttribute('class', 'project-item');
    div3.setAttribute('class', 'project-content');
    div4.setAttribute('class', 'd-flex justify-content-between align-items-center mb-3');
    div5.setAttribute('class', 'contributer d-flex justify-content-between align-items-center');
    div6.setAttribute('class', 'contributer d-flex justify-content-between align-items-center');
    img.setAttribute('class', 'img-fluid');
    img.setAttribute('src', 'assets/img/project-1.jpg');
}

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
  
fetch("http://localhost:3000/projects/", requestOptions)
    .then(response => response.json())
    .then((projects) => {
        console.log(projects);
        for(var i = projects.length -1; i >= 0; i--)
        {
            projectCard(projects[i]);
        }
    })
    .catch(error => console.log('error', error));