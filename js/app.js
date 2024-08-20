(() => {
    "use strict";
    const showPopup = popupId => {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.add("popup_show");
            document.body.classList.add("popup-show");
        }
    };
    const closePopup = (e, popupEl = null) => {
        const popup = popupEl ?? e.target.closest(".popup");
        if (popup) {
            popup.classList.remove("popup_show");
            document.body.classList.remove("popup-show");
        }
    };
    function popupInit() {
        const popupCloseBtns = document.querySelectorAll(".popup__close");
        popupCloseBtns.forEach((popupCloseBtn => {
            popupCloseBtn.addEventListener("click", closePopup);
        }));
        document.addEventListener("keydown", (e => {
            if (e.key === "Escape") {
                const openedPopup = document.querySelector(".popup_show");
                closePopup(e, openedPopup);
            }
        }));
    }
    function formValidation() {
        const forms = document.querySelectorAll("form[data-validation]");
        forms.forEach((form => {
            validateForm(form);
            const fieslds = form.querySelectorAll(".form__field");
            fieslds.forEach((input => {
                input.addEventListener("change", (() => {
                    checkInputValidity(input);
                }));
            }));
        }));
    }
    function validateForm(form) {
        form.addEventListener("submit", (e => {
            e.preventDefault();
            const fieslds = form.querySelectorAll(".form__field");
            let validityOfInputs = [];
            fieslds.forEach((input => {
                validityOfInputs.push(checkInputValidity(input));
            }));
            if (!validityOfInputs.includes(false)) {
                showPopup("form-success");
                console.log("form submitted");
            }
        }));
    }
    function checkInputValidity(input) {
        const error = input.parentElement.querySelector(".form__error");
        if (input.checkValidity()) {
            error.textContent = "";
            input.classList.remove("_error");
            return true;
        } else {
            error.textContent = input.dataset.error ?? "Invalid Input";
            input.classList.add("_error");
            return false;
        }
    }
    function headerScroll() {
        const headerEl = document.querySelector(".header");
        const callback = (entries, observer) => {
            if (entries[0].isIntersecting) headerEl.classList.remove("_scroll"); else headerEl.classList.add("_scroll");
        };
        const headerObserver = new IntersectionObserver(callback);
        headerObserver.observe(headerEl);
    }
    /**
 * @license lucide v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
    const createElement = (tag, attrs, children = []) => {
        const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
        Object.keys(attrs).forEach((name => {
            element.setAttribute(name, String(attrs[name]));
        }));
        if (children.length) children.forEach((child => {
            const childElement = createElement(...child);
            element.appendChild(childElement);
        }));
        return element;
    };
    var createElement$1 = ([tag, attrs, children]) => createElement(tag, attrs, children);
    /**
 * @license lucide v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
    const getAttrs = element => Array.from(element.attributes).reduce(((attrs, attr) => {
        attrs[attr.name] = attr.value;
        return attrs;
    }), {});
    const getClassNames = attrs => {
        if (typeof attrs === "string") return attrs;
        if (!attrs || !attrs.class) return "";
        if (attrs.class && typeof attrs.class === "string") return attrs.class.split(" ");
        if (attrs.class && Array.isArray(attrs.class)) return attrs.class;
        return "";
    };
    const combineClassNames = arrayOfClassnames => {
        const classNameArray = arrayOfClassnames.flatMap(getClassNames);
        return classNameArray.map((classItem => classItem.trim())).filter(Boolean).filter(((value, index, self) => self.indexOf(value) === index)).join(" ");
    };
    const toPascalCase = string => string.replace(/(\w)(\w*)(_|-|\s*)/g, ((g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()));
    const replaceElement = (element, {nameAttr, icons, attrs}) => {
        const iconName = element.getAttribute(nameAttr);
        if (iconName == null) return;
        const ComponentName = toPascalCase(iconName);
        const iconNode = icons[ComponentName];
        if (!iconNode) return console.warn(`${element.outerHTML} icon name was not found in the provided icons object.`);
        const elementAttrs = getAttrs(element);
        const [tag, iconAttributes, children] = iconNode;
        const iconAttrs = {
            ...iconAttributes,
            "data-lucide": iconName,
            ...attrs,
            ...elementAttrs
        };
        const classNames = combineClassNames([ "lucide", `lucide-${iconName}`, elementAttrs, attrs ]);
        if (classNames) Object.assign(iconAttrs, {
            class: classNames
        });
        const svgElement = createElement$1([ tag, iconAttrs, children ]);
        return element.parentNode?.replaceChild(svgElement, element);
    };
    /**
 * @license lucide v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
    const createIcons = ({icons = {}, nameAttr = "data-lucide", attrs = {}} = {}) => {
        if (!Object.values(icons).length) throw new Error("Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`");
        if (typeof document === "undefined") throw new Error("`createIcons()` only works in a browser environment.");
        const elementsToReplace = document.querySelectorAll(`[${nameAttr}]`);
        Array.from(elementsToReplace).forEach((element => replaceElement(element, {
            nameAttr,
            icons,
            attrs
        })));
        if (nameAttr === "data-lucide") {
            const deprecatedElements = document.querySelectorAll("[icon-name]");
            if (deprecatedElements.length > 0) {
                console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide");
                Array.from(deprecatedElements).forEach((element => replaceElement(element, {
                    nameAttr: "icon-name",
                    icons,
                    attrs
                })));
            }
        }
    };
    /**
 * @license lucide v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
    const defaultAttributes = {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 2,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    };
    /**
 * @license lucide v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
    const Menu = [ "svg", defaultAttributes, [ [ "line", {
        x1: "4",
        x2: "20",
        y1: "12",
        y2: "12"
    } ], [ "line", {
        x1: "4",
        x2: "20",
        y1: "6",
        y2: "6"
    } ], [ "line", {
        x1: "4",
        x2: "20",
        y1: "18",
        y2: "18"
    } ] ] ];
    /**
 * @license lucide v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
    const ArrowRight = [ "svg", defaultAttributes, [ [ "path", {
        d: "M5 12h14"
    } ], [ "path", {
        d: "m12 5 7 7-7 7"
    } ] ] ];
    /**
 * @license lucide v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
    const Globe = [ "svg", defaultAttributes, [ [ "circle", {
        cx: "12",
        cy: "12",
        r: "10"
    } ], [ "path", {
        d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
    } ], [ "path", {
        d: "M2 12h20"
    } ] ] ];
    /**
 * @license lucide v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
    const X = [ "svg", defaultAttributes, [ [ "path", {
        d: "M18 6 6 18"
    } ], [ "path", {
        d: "m6 6 12 12"
    } ] ] ];
    /**
 * @license lucide v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
    const Instagram = [ "svg", defaultAttributes, [ [ "rect", {
        width: "20",
        height: "20",
        x: "2",
        y: "2",
        rx: "5",
        ry: "5"
    } ], [ "path", {
        d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
    } ], [ "line", {
        x1: "17.5",
        x2: "17.51",
        y1: "6.5",
        y2: "6.5"
    } ] ] ];
    /**
 * @license lucide v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
    const Mail = [ "svg", defaultAttributes, [ [ "rect", {
        width: "20",
        height: "16",
        x: "2",
        y: "4",
        rx: "2"
    } ], [ "path", {
        d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
    } ] ] ];
    /**
 * @license lucide v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
    const Send = [ "svg", defaultAttributes, [ [ "path", {
        d: "m22 2-7 20-4-9-9-4Z"
    } ], [ "path", {
        d: "M22 2 11 13"
    } ] ] ];
    /**
 * @license lucide v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
    const Copyright = [ "svg", defaultAttributes, [ [ "circle", {
        cx: "12",
        cy: "12",
        r: "10"
    } ], [ "path", {
        d: "M14.83 14.83a4 4 0 1 1 0-5.66"
    } ] ] ];
    /**
 * @license lucide v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
    const Link = [ "svg", defaultAttributes, [ [ "path", {
        d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
    } ], [ "path", {
        d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
    } ] ] ];
    const lucideIconsInit = () => {
        createIcons({
            icons: {
                Menu,
                ArrowRight,
                Globe,
                X,
                Instagram,
                Mail,
                Send,
                Copyright,
                Link
            }
        });
    };
    const burgerMenuInit = () => {
        const menu = document.querySelector("header nav.menu");
        const burgerButton = document.querySelector("header .menu__btn");
        burgerButton.addEventListener("click", (() => {
            menu.classList.toggle("open");
        }));
    };
    function navigationInit() {
        const sections = document.querySelectorAll("section[id]");
        window.addEventListener("scroll", navHighlighter);
        function navHighlighter() {
            let scrollY = window.scrollY;
            sections.forEach((current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                let sectionId = current.getAttribute("id");
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) document.querySelector("header .menu__item a[href*=" + sectionId + "]").classList.add("_active"); else document.querySelector("header .menu__item a[href*=" + sectionId + "]").classList.remove("_active");
            }));
        }
    }
    const server = {
        async loadSkills(page = 1) {
            const SHOW_ELEMENTS = 4;
            const file = "json/skills.json";
            let response = await fetch(file, {
                method: "GET"
            });
            if (!response.ok) return Promise.reject(new Error(`Could not load ${file}`));
            let result = await response.json();
            if (result?.skills) {
                const skills = result.skills.slice(SHOW_ELEMENTS * (page - 1), SHOW_ELEMENTS * page);
                const finished = SHOW_ELEMENTS * page >= result.skills.length;
                const next = finished ? null : page + 1;
                return new Promise((resolve => {
                    setTimeout((() => {
                        resolve({
                            skills,
                            next
                        });
                    }), 150);
                }));
            }
        },
        async loadProjects() {
            const file = "json/projects.json";
            let response = await fetch(file, {
                method: "GET"
            });
            if (!response.ok) return new Error(`Could not load ${file}`);
            let result = await response.json();
            if (result?.projects) return {
                projects: result?.projects
            };
        }
    };
    const loadProjectsInit = async () => {
        try {
            const {projects} = await server.loadProjects();
            if (!projects?.length) return;
            const projectConainer = document.querySelector(".projects__content");
            projects.forEach((project => {
                const projectNode = composeProject(project);
                projectConainer.insertAdjacentHTML("beforeend", projectNode);
            }));
        } catch (error) {
            console.log("error", error);
        }
    };
    function composeProject(project) {
        const {name, description, tools, img, link} = project;
        const projectImg = img ? `<img loading="lazy" src="${img}" alt="${name}" />` : `<img loading="lazy" src="/img/projects/mock.jpg" alt="${name}" />`;
        const projectTitle = name ? `<h3 class="project__title">${name}</h3>` : "";
        const projectDescription = description ? `<p class="project__text">${description}</p>` : "";
        const projectTools = tools ? `<p class="project__text">${tools}</p>` : "";
        const projectLink = link ? `<a href="${link}" class="project__link _btn">Learn more</a>` : "";
        const projectInfo = `<div class="project__info">\n    ${projectTitle}\n    ${projectDescription}\n    ${projectTools}\n    ${projectLink}\n  </div>`;
        const projectImage = `<div class="project__image">\n            <div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[150px] sm:h-[172px] max-w-[270px] sm:max-w-[301px]  md:h-[294px] md:max-w-[512px]">\n              <div class="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800">\n              ${projectImg}\n              </div>\n            </div>\n            <div class="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px]  md:h-[21px] md:max-w-[597px]">\n              <div class="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>\n            </div>\n          </div>`;
        const projectElement = `<div class="projects__item project">\n    ${projectImage}\n    ${projectInfo}\n  </div>`;
        return projectElement;
    }
    function throttle(callback, delay) {
        let lastCall = 0;
        return function(...args) {
            const now = new Date;
            if (now - lastCall < delay) return;
            lastCall = now;
            callback(...args);
        };
    }
    let nextPage = 1;
    let isLoading = false;
    let shouldLoad = true;
    function checkPosition() {
        const height = document.body.offsetHeight;
        const screenHeight = window.innerHeight;
        const scrolled = window.scrollY;
        const threshold = height - screenHeight / 4;
        const position = scrolled + screenHeight;
        if (position >= threshold) fetchSkills().catch((error => console.log(error)));
    }
    function appendSkill(skillData) {
        if (!skillData) return;
        const skillsContainer = document.querySelector(".experience__timeline");
        const skillNode = composeSkillItem(skillData);
        skillsContainer.appendChild(skillNode);
        skillAnimationInit(skillNode);
    }
    function composeSkillItem(skillData) {
        if (!skillData) return;
        const template = document.querySelector("#timeline-experience__template");
        const skill = template.content.children[0].cloneNode(true);
        const {year, position, company, description, skills, link} = skillData;
        skill.querySelector(".year-experience__title").innerText = year.start + " - " + year.end;
        skill.querySelector(".timeline-experience__title>span").innerText = company;
        skill.querySelector(".timeline-experience__position>span").innerText = position;
        skill.querySelector(".timeline-experience__description").innerHTML = description;
        if (skills && skills.length) skills.forEach((item => {
            const div = document.createElement("div");
            div.classList.add("timeline-experience__skill");
            div.innerHTML = item;
            skill.querySelector(".timeline-experience__skills")?.append(div);
        }));
        if (link) skill.querySelector(".timeline-experience__link a").href = link; else skill.querySelector(".timeline-experience__link").remove();
        return skill;
    }
    function skillAnimationInit(skill) {
        const startAnimation = entries => {
            if (entries[0].isIntersecting) skill.classList.add("_visible");
        };
        const observer = new IntersectionObserver(throttle(startAnimation, 200));
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 1
        };
        observer.observe(skill, options);
    }
    async function fetchSkills() {
        if (isLoading || !shouldLoad) return;
        isLoading = true;
        const {skills, next} = await server.loadSkills(nextPage);
        skills.reverse().forEach(appendSkill);
        nextPage = next;
        if (!next) shouldLoad = false;
        isLoading = false;
    }
    function skillsLoadInit() {
        window.addEventListener("scroll", throttle(checkPosition, 200));
        window.addEventListener("resize", throttle(checkPosition, 200));
    }
    lucideIconsInit();
    function documentActions(e) {
        e.target;
    }
    window.onload = function() {
        document.addEventListener("click", documentActions);
        burgerMenuInit();
        headerScroll();
        skillsLoadInit();
        navigationInit();
        loadProjectsInit();
        formValidation();
        popupInit();
    };
})();