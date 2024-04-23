const projectsArea = document.querySelector('.projects');
const projectsBTN = document.querySelector(".projects-btn");
const projectsDIV = document.querySelector('.projects-container');
const goUpBtn = document.querySelector('.go-up-btn');

class Projects {
    myProjects = [
        {
            title: 'IYTE Ulaşım',
            desc: 'public transportation times helper for students @ iztech',
            githubLink: 'https://github.com/erdemylmaz/iyte-ulasim',
            // viewLink: 'http://talkitsozluk.com',
            viewLink: 'https://iyteulasim.com',
            language: 'JavaScript',
        },
        {
            title: "Path Finding Algorithm Visualisation",
            desc: "visualised path finding algorithm using heuristics to find best (shortest) path.",
            githubLink: "https://github.com/erdemylmaz/path-finding",
            viewLink: "https://erdemylmaz.github.io/path-finding/",
            language: "JavaScript",
        },
        {
            title: 'talk it!',
            desc: 'talking platform for high school students. mostly targeting YKS (exam) students.',
            githubLink: 'https://github.com/erdemylmaz/talk-it',
            // viewLink: 'http://talkitsozluk.com',
            viewLink: 'https://erdemylmaz.github.io/talk-it/',
            language: 'JavaScript',
        },

        {
            title: 'Wordle',
            desc: 'copy of original Wordle game. (try to find word.)',
            githubLink: 'https://github.com/erdemylmaz/wordle',
            viewLink: 'https://erdemylmaz.github.io/wordle/',
            language: 'JavaScript',
        },

        {
            title: 'Clicker Game',
            desc: 'click to make cig kofte :) (with ranking system)',
            githubLink: 'https://github.com/erdemylmaz/clicker-game-v3',
            viewLink: 'https://erdemylmaz.github.io/clicker-game-v3/src/index.html',
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
            title: 'Lession',
            desc: 'detailed focus/efficiency helper web app. (not finished 100%)',
            githubLink: 'https://github.com/erdemylmaz/lession',
            viewLink: 'https://erdemylmaz.github.io/lession/index.html',
            language: 'JavaScript',
        },

        {
            title: 'Reflex Game',
            desc: 'it flashs out squares to screen and you need to click them as fast as you can.',
            githubLink: 'https://github.com/erdemylmaz/reflex',
            viewLink: 'https://erdemylmaz.github.io/reflex/index.html',
            language: 'JavaScript',
        },

        {
            title: 'Goblins Of Time',
            desc: "a twitch subscriber event for twitch streamer 'Swaggybark'. this is my part of the event.",
            githubLink: 'https://github.com/erdemylmaz/goblins-of-time',
            viewLink: 'https://erdemylmaz.github.io/goblins-of-time/',
            language: 'JavaScript',
        },
        {
            title: 'Crypto Game',
            desc: 'simple crypto coin buy-sell game.',
            githubLink: 'https://github.com/erdemylmaz/crypto-game',
            viewLink: 'https://erdemylmaz.github.io/crypto-game/index.html',
            language: 'JavaScript',
        },

    ];

    initProjects = () => {
        this.myProjects.map((project, index) => {
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
                        <a target="_blank" href="${project.viewLink}" class="project-visit-link project-link">View</a>
                        <a target="_blank" href="${project.githubLink}" class="project-github-link project-link"><i class="fa-brands fa-github"></i></a>
                    </div>
                </div> 
            `;

            projectsArea.appendChild(div);
        });
    }

    scrollToProjects = () => { 
        let top = projectsDIV.offsetTop;
        window.scrollTo({
            top: top,
        });
    }

    scroll = () => {
        let currentBottomY = window.scrollY + window.innerHeight;
        let projects = document.querySelectorAll('.project');

        projects.forEach((p, index) => {
            let projectsTop = p.offsetTop;
            if(currentBottomY > projectsTop + 96) {
                p.style.transform = "translateX(0px)";
                p.style.filter = "opacity(1)";
            } else if (currentBottomY < (projectsTop + 512)){
                p.style.filter = "opacity(0)";
                if((index % 2) == 0) {
                    p.style.transform = "translateX(256px)";
                } else {
                    p.style.transform = "translateX(-256px)";
                }
            }
        });
    }
}

const projects = new Projects();

projects.initProjects();

projectsBTN.addEventListener('click', projects.scrollToProjects);

const birdCanvas = document.querySelector('.bird-canvas');
const snakeCanvas = document.querySelector('.snake-canvas');

let lastNumber = null;
function changeCanvas() {
    let number = Math.round(Math.random());

    if(number == 1) {
        if(lastNumber == 0) {
            canvas.restart();
        }
        birdCanvas.style.display = "flex";
        snakeCanvas.style.display = "none";
    } else {
        birdCanvas.style.display = "none" ;
        snakeCanvas.style.display = "flex";
    }

    lastNumber = number;
}

window.addEventListener('scroll', () => {
    if(window.scrollY > 16) {
        goUpBtn.style.display = "flex";
    } else {
        goUpBtn.style.display = "none";
    }
});

goUpBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
    });
});

changeCanvas();

setInterval(() => {
    changeCanvas();
}, 30000);

window.addEventListener('scroll', projects.scroll);
