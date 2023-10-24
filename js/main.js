(function () {
    let navbar = document.querySelector('#navbar');
    let hamburger = document.querySelector('#hamburger');

    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('open');
    });
})();

//  Menu Fijo
(function () {
    let navbar = document.querySelector('#navbar');
    let main = document.querySelector('main');
    let navbarHeight = navbar.getBoundingClientRect().height;
    let breakpoint = main.offsetTop - navbarHeight;
    let isFixed = false;

    let windowPos;
    function updatePos() {windowPos = window.scrollY;}

    function onScroll() {
        updatePos();

        if (windowPos >= breakpoint && !isFixed) {
            navbar.classList.remove('open');

            navbar.classList.add('navbar-fixed');
            main.style.cssText = "margin-top: " + navbarHeight + 'px;';

            isFixed = true;
        }
        else if (windowPos < breakpoint && isFixed) {
            navbar.classList.remove('navbar-fixed');
            main.style.cssText = "margin-top: " + 0;
            isFixed = false;
        }
    }

    document.addEventListener('scroll', onScroll);
})();

(function () {
    function getProjectofPortfolio(project) {
        const projects = {
            licenses: {
                title: 'License Key Generator',
                description: 'Licenses is a web application that allows you to create and manage your licenses.',
                image: 'img/projects/licenses.png',
                url: 'https://licenses.diegot4l.com/',
                github: 'https://github.com/DiegoT4l/License-Key-Generator'
            },
            blogCafe: {
                title: 'Blog de Café',
                description: 'Blog Café is a web application that allows you to create and manage your blog.',
                image: 'img/projects/blog-cafe.png',
                url: 'https://blogcafe.diegot4l.com/',
                github: 'https://github.com/DiegoT4l/BlogdeCafe'
            },
            error: {
                title: 'Error',
                description: 'No se encontró el proyecto, intenta de nuevo'
            }
        }
        
        const projectSelected = projects[project] || projects.error;
        return projectSelected;
    }

    function createProject(project) {
        const projectSelected = getProjectofPortfolio(project);
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');

        if (projectSelected.title === 'Error') {
            projectElement.innerHTML = `
                <h3 class="project__title" style="color: red;">${projectSelected.title}</h3>
                <p class="project__description">${projectSelected.description}</p>
            `;
            return projectElement;
        }
        projectElement.innerHTML = `
            <div class="project__image">
                <img src="${projectSelected.image}" alt="${projectSelected.title}">
            </div>
            <div class="project__info">
                <h3 class="project__title">${projectSelected.title}</h3>
                <p class="project__description">${projectSelected.description}</p>
                <div class="project__links">
                    <a href="${projectSelected.url}" target="_blank" class="project__link">Ver</a>
                    <a href="${projectSelected.github}" target="_blank" class="project__link">Código</a>
                </div>
            </div>
        `;
        return projectElement;
    }

    function renderProject(project) {
        const projectElement = createProject(project);
        const projectsContainer = document.querySelector('#modalContent');
        projectsContainer.innerHTML = '';
        projectsContainer.appendChild(projectElement);
    }

    const projects = document.querySelectorAll('.project__link');
    projects.forEach(project => {
        project.addEventListener('click', (e) => {
            e.preventDefault();
            const project = e.target.dataset.project;
            renderProject(project);
        });
    });
})();