//PERSONAL INFORMATION SECTION
const personalInfo = document.querySelector(".overview");
//GitHub username
const username = "engle-sr";
const repoList = document.querySelector(".repo-list");
const allRepos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

//FETCH INFO FROM GIT PROFILE
const gitProfile = async function () {
    const profile = await fetch(`https://api.github.com/users/${username}`);
    const data = await profile.json();
    displayProfile(data);
};

gitProfile();

const displayProfile = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
    `;

    personalInfo.append(div);
    gitRepos();
};

const gitRepos = async function () {
    const fetchRepos = await fetch(` https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    displayRepos(repoData);
};

const displayRepos = function (repos) {
    for (const repo of allRepos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};
 
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});


//Grab specific info//
const getRepoInfo = async function (repoName) {
    const fetchRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchRepoInfo.json();
    console.log(repoInfo);

    //Fetch Languages//
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    
    //Languages Array//
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = async function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    allRepos.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    
    repoData.append(div);
};

