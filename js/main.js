// Función para agregar o quitar la clase 'open' al hacer clic en el botón de hamburguesa
(function () {
    const navbar = document.querySelector('#navbar');
    const hamburger = document.querySelector('#hamburger');

    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('open');
    });
})();

// Función para fijar el menú de navegación
(function () {
    const navbar = document.querySelector('#navbar');
    const main = document.querySelector('main');
    const navbarHeight = navbar.getBoundingClientRect().height;
    const breakpoint = main.offsetTop - navbarHeight;
    let isFixed = false;

    let windowPos;
    function updatePos() {
        windowPos = window.scrollY;
    }

    function onScroll() {
        updatePos();

        if (windowPos >= breakpoint && !isFixed) {
            navbar.classList.remove('open');
            navbar.classList.add('navbar-fixed');
            main.style.cssText = `margin-top: ${navbarHeight}px;`;
            isFixed = true;
        } else if (windowPos < breakpoint && isFixed) {
            navbar.classList.remove('navbar-fixed');
            main.style.cssText = 'margin-top: 0';
            isFixed = false;
        }
    }

    document.addEventListener('scroll', onScroll);
})();

// Función para obtener los proyectos desde un archivo JSON
(async function () {
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
        return projects[project];
    }

    function createProject(projectSelected) {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');

        if (!projectSelected) {
            projectElement.innerHTML = `
                <h3 class="project__title" style="color: red;">Error</h3>
                <p class="project__description">No se encontró el proyecto, intenta de nuevo.</p>
            `;
            return projectElement;
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

        projectsContainer.innerHTML = '';
        projectsContainer.appendChild(projectElement);
    }

    getProjectsFromJSON(function (projects) {
        const projectLinks = document.querySelectorAll('.project__button');

        projectLinks.forEach(projectLink => {
            projectLink.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = e.target.dataset.project;
                renderProject(projectId, projects);
            });
        });
    });
})();
