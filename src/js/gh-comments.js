'use strict';
module.exports = githubComments;

function githubComments(config) {
    let apiUrl = `https://api.github.com/repos/${config.user}/${config.repo}/issues/${config.issueNr}/comments`;
    let webUrl = `https://github.com/${config.user}/${config.repo}/issues/${config.issueNr}`;
    let pluralize = length => length !== 1 ? "s" : "";
    let request = new XMLHttpRequest();
    request.open("GET", apiUrl, true);
    request.setRequestHeader("Accept", "application/vnd.github.v3.html+json");
    request.onload = buildCommentSection;
    request.send();

    function buildCommentSection() {
        let commentArea = document.getElementById("gh-comments");
        if (request.status === 200) {
            let comments = JSON.parse(request.responseText);
            commentArea.insertAdjacentHTML("beforeEnd",
                `<header>
                    ${comments.length} comment${pluralize(comments.length)} <small>(via GitHub) <a href="${webUrl}" class="leave-comment">Leave a comment</a></small>
                </header>`
            );
            comments.forEach(c => {
                let edited = c.created_at !== c.updated_at ? "• edited" : "";
                commentArea.insertAdjacentHTML("beforeEnd",
                    `<div class="gh-c">
                    <img src="${c.user.avatar_url}">
                    <article>
                        <header>
                            <a href="${c.user.html_url}">${c.user.login}</a> commented ${timeSince(c.created_at)}
                            ${edited}
                        </header>
                        <main>${c.body_html}</main>
                    </article>
                </div>`
                );
            });
        } else {
            commentArea.insertAdjacentHTML("beforeEnd", "Failed to load comments");
        }

        function timeSince(dateString) {
            let secondsSincePost = Math.floor((new Date() - new Date(dateString)) / 1000);
            let intervalSeconds = [31536000, 2592000, 86400, 3600, 60, 1];
            let intervalName = ["year", "month", "day", "hour", "minute", "second"];
            for (let i = 0; i < 6; i++) {
                let interval = Math.round(secondsSincePost / intervalSeconds[i]);
                if (interval > 0) {
                    return `${interval} ${intervalName[i] + pluralize(interval)} ago`;
                }
            }
        }
    }
}
