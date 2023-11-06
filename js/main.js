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
    async function getProjectsFromJSON(callback) {
        try {
            const response = await fetch('./projects.json');
            const data = await response.json();
            callback(data);
        } catch (error) {
            console.error('Error al cargar proyectos:', error);
        }
    }

    function getProjectofPortfolio(project, projects) {
        const projectSelected = projects[project];
        return projectSelected;
    }

    function createProject(projectSelected) {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');

        if (!projectSelected) {
            const imageCafeBlog = document.querySelector('#imageBlogCafe')
            const imageLKG = document.querySelector('#imageLKG')
            imageCafeBlog.classList.add('hidden');
            imageLKG.classList.add('hidden');
            projectElement.innerHTML = `
                <h3 class="project__title" style="color: red;">Error</h3>
                <p class="project__description">No se encontró el proyecto, intenta de nuevo.</p>
            `;
            return projectElement;
        }
        if (projectSelected.title === 'License Key Generator') {
            const imageCafeBlog = document.querySelector('#imageBlogCafe')
            const imageLKG = document.querySelector('#imageLKG')
            imageCafeBlog.classList.add('hidden');
            imageLKG.classList.remove('hidden');
        }
        else if (projectSelected.title === 'Blog de Cafe') {
            const imageCafeBlog = document.querySelector('#imageBlogCafe')
            const imageLKG = document.querySelector('#imageLKG')
            imageCafeBlog.classList.remove('hidden');
            imageLKG.classList.add('hidden');
        }

        projectElement.innerHTML = `
                <h3 class="project__title">${projectSelected.title}</h3>
                <p class="project__description">${projectSelected.description}</p>
                <div class="project__links">
                    <a href="${projectSelected.url}" target="_blank" class="project__link">Ver</a>
                    <a href="${projectSelected.github}" target="_blank" class="project__link">Código</a>
                </div>
        `;
        return projectElement;
    }

    function renderProject(projectId, projects) {
        const projectSelected = getProjectofPortfolio(projectId, projects);
        const projectElement = createProject(projectSelected);
        const projectsContainer = document.querySelector('.project__info');

        projectsContainer.innerHTML = ''; // Limpiamos el contenedor
        projectsContainer.appendChild(projectElement); // Agregamos el proyecto
    }

    getProjectsFromJSON(function(projects) {
        const projectLinks = document.querySelectorAll('.project__button');

        projectLinks.forEach(projectLink => { // Agregamos el evento a cada link
            projectLink.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = e.target.dataset.project;
                renderProject(projectId, projects);
            });
        });
    });
})();