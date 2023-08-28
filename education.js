const educationsAREA = document.querySelector('.educations');

class Education {
    edu = [
        {
            school: "Turhan Tayan Anatolian High School",
            yearStart: 2019,
            yearEnd: 2022,
            logo: 'ttal-logo.jpg',
            isActive: false,
            id: 'high-school',
            alt: 'TTAL',
            major: '9th-10th-11st Grade',
            link: 'https://ttal.meb.k12.tr/'
        },

        {
            school: "Çağdaş Öncü Kurs",
            yearStart: 2022,
            yearEnd: 2023,
            logo: 'oncu-logo.png',
            isActive: false,
            id: 'hs',
            alt: 'Çağdaş Öncü Kurs',
            major: '12nd Grade',
            link: 'http://cagdasoncukurs.com/',
        },

        {
            school: "Izmir Institute of Technology",
            yearStart: 2023,
            isActive: true,
            major: "Computer Engineering",
            logo: 'iyte_logo-eng.png',
            id: 'uni',
            alt: 'IZTECH',
            link: 'https://iyte.edu.tr',
        },
    ];

    initEducation = () => {
        this.edu.map((eduInfo, index) => {
            let div = document.createElement('div');
            div.className = `education-div ${eduInfo.id}-div`;
            div.innerHTML = `
            <div class="school-img-div">
                <img src="./${eduInfo.logo}" alt="${eduInfo.alt}" class="school-img">
            </div>

            <a href="${eduInfo.link}" target="_blank" class="school-name">${eduInfo.school}</a>
            <div class="school-major">${eduInfo.major}</div>
            <div class="school-date">${eduInfo.yearStart}-${eduInfo.isActive ? "present" : eduInfo.yearEnd}</div>
            `;

            if(index == 0) {
                let logo = div.querySelector('.school-img');
                logo.style.borderRadius = "50%";
                logo.style.width = "200px";
                logo.style.height = "200px";
            }

            educationsAREA.appendChild(div);

        });
    }

    onScroll = () => {
        let currentY = window.scrollY;
        let eduPosY = educationsAREA.offsetTop;
        let windowHeight = window.innerHeight;
        let dif = (windowHeight - 512) / 2;

        if((currentY + windowHeight - 256) > eduPosY + dif) {
            let divs = document.querySelectorAll('.education-div');

            divs.forEach((div, index) => {
                setTimeout(() => {
                    div.style.transition = "1s";
                    div.style.transform = "translateY(0)";

                    // setTimeout(() => {
                    // }, 2000);
                }, 250 * index);
            });
        } else {
            let divs = document.querySelectorAll('.education-div');

            divs.forEach((div, index) => {
                setTimeout(() => {
                    div.style.transform = "translateY(512px)";
                }, 250 * index);
            });
        }
    }
}

const education = new Education();

education.initEducation();
window.addEventListener('scroll', education.onScroll);