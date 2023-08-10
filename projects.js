const projectsArea = document.querySelector('.projects');
const projectsBTN = document.querySelector(".projects-btn");
const projectsDIV = document.querySelector('.projects-container');

class Projects {
    myProjects = [
        {
            title: 'talk it!',
            desc: 'talking platform for high school students. mostly targeting YKS (exam) students.',
            githubLink: 'https://github.com/erdemylmaz/talk-it',
            // viewLink: 'http://talkitsozluk.com',
            viewLink: 'https://erdemylmaz.github.io/talk-it/',
            language: 'JavaScript',
        },

        {
            title: '(Fake) AI Car',
            desc: "this is fake ai car. i can't describe why it is fake but you would understand if you view that.",
            githubLink: 'https://github.com/erdemylmaz/ai-car',
            viewLink: 'https://erdemylmaz.github.io/ai-car/',
            language: 'JavaScript',
        },

        {
            title: 'Flappy Bird (Fake) AI',
            desc: 'this is a fake ai of Flappy Bird game. It is fake because it is just jumps when there is a blank and i tell the bird when is the blank will come.',
            githubLink: 'https://github.com/erdemylmaz/bird-ai',
            viewLink: 'https://erdemylmaz.github.io/bird-ai/',
            language: 'JavaScript',
        },

        {
            title: 'Clicker Game',
            desc: 'click to make cig kofte :)',
            githubLink: 'https://github.com/erdemylmaz/clicker-game-v3',
            viewLink: 'https://erdemylmaz.github.io/clicker-game-v3/src/index.html',
            language: 'JavaScript',
        },

        {
            title: 'Crypto Game',
            desc: 'simple crypto coin buy-sell game.',
            githubLink: 'https://github.com/erdemylmaz/crypto-game',
            viewLink: 'https://erdemylmaz.github.io/crypto-game/index.html',
            language: 'JavaScript',
        },

        {
            title: 'Reflex Game',
            desc: 'it flashs out squares to screen and you need to click them as fast as you can.',
            githubLink: 'https://github.com/erdemylmaz/reflex',
            viewLink: 'https://erdemylmaz.github.io/reflex/index.html',
            language: 'JavaScript',
        },
    ];

    initProjects = () => {
        this.myProjects.map((project) => {
            let div = document.createElement('div');
            div.className = "project";

            div.innerHTML = `
                <div class="project-title">${project.title}</div>
                <div class="project-desc">${project.desc}</div>
                <div class="project-footer">
                    <div class="project-langs">
                        <span class="project-lang">${project.language}</span>
                    </div>

                    <div class="project-links">
                        <a target="_blank" href="${project.githubLink}" class="project-github-link project-link"><i class="fa-brands fa-github"></i></a>
                        <a target="_blank" href="${project.viewLink}" class="project-visit-link project-link">View</a>
                    </div>
                </div> 
            `;

            projectsArea.appendChild(div);

        })
    }

    scrollToProjects = () => {
        let top = projectsDIV.offsetTop;
        window.scrollTo({
            top: top,
        });
    }
}

const projects = new Projects();

projects.initProjects();

projectsBTN.addEventListener('click', projects.scrollToProjects);

const birdCanvas = document.querySelector('.bird-canvas');
const snakeCanvas = document.querySelector('.snake-canvas');

function changeCanvas() {
    let number = Math.round(Math.random());

    if(number == 1) {
        birdCanvas.style.display = "flex";
        snakeCanvas.style.display = "none";
    } else {
        birdCanvas.style.display = "none" ;
        snakeCanvas.style.display = "flex";
    }
}

changeCanvas();

setInterval(() => {
    changeCanvas();
}, 30000);
