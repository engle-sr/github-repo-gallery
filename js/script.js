//PERSONAL INFORMATION SECTION
const personalInfo = document.querySelector(".overview");
//GitHub username
const username = "engle-sr";

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
};