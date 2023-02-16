"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
document.body.innerHTML = "<div class='parent'><div id='panel' class='child panel'>panel</div><div id='content' class='child content'><iframe id='iframeContent' scrolling='no'></iframe></div></div>";
const panel = document.getElementById("panel");
const content = document.getElementById("iframeContent");
panel.innerHTML = "<span class=\"wikiAppLink\" onclick='loadFromServer(\"/wiki_resources/doc/readme.html\")'><info><icon/>Readme page</info></span><br /> <span class=\"wikiAppLink\" onclick='loadFromServer(\"/wiki_resources/doc/tutorial.html\")'><info><icon/>Usage</info></span><br /> <span class=\"wikiAppLink\" onclick='loadFromServer(\"/wiki_resources/doc/template.html\")'><info><icon/>Template</info></span><br /><br />";
function loadFromServer(path) {
    console.log("fetching..." + path);
    const pathStrSplit = path.split('/');
    const fileName = pathStrSplit.pop();
    const directoryName = pathStrSplit.join('/');
    console.log(directoryName);
    fetch(directoryName + '/.resources').then(res => {
        const resources = res.text();
        console.log(resources);
        return resources;
    }).then(res => {
        fetch(path).then(x => {
            console.log(x);
            return x.text();
        }).then((html) => {
            let htmlText = String(html);
            res.split("\n").forEach(r => {
                htmlText = htmlText.replace(new RegExp('src="' + r + '"', 'g'), 'src="' + directoryName + '/' + r + '"');
            });
            content.src = path;
        });
    });
}
exports.loadFromServer = loadFromServer;
function loadAll() {
    fetch('pages.json').then(res => {
        const json = res.text();
        console.log(json);
        return json;
    }).then(json => {
        let pages = {};
        try {
            pages = JSON.parse(json);
        }
        catch (e) {
            console.log(e);
        }
        loadDirectory(pages, panel);
    });
}
exports.loadAll = loadAll;
function loadDirectory(dir, parent) {
    if (dir.Children) {
        const ul = document.createElement("ul");
        if (dir.Name !== "__root__") {
            const li = document.createElement("li");
            li.innerHTML = "<folder><icon/>" + dir.Name + "</folder>";
            parent.appendChild(li);
            li.appendChild(ul);
        }
        else {
            ul.className = "wikiTree";
            ul.id = "wikiTreeRoot";
            parent.appendChild(ul);
        }
        dir.Children.forEach((child) => {
            loadDirectory(child, ul);
        });
    }
    else {
        const li = document.createElement("li");
        li.innerHTML = "<span class=\"wikiAppLink\" onclick='loadFromServer(\"" + dir.Path + "\")'>" + dir.Name + "</span>";
        parent.appendChild(li);
    }
}
exports.loadDirectory = loadDirectory;
content.onload = () => {
    console.log("DEBUG: content.onload()");
    content.style.height = (content.contentWindow.document.body.scrollHeight + 20) + "px";
    const path = content.contentDocument.location.href.split("#");
    if (path.length == 2) {
        const element = content.contentDocument.getElementById(path[1]);
        if (element) {
            console.log("DEBUG: content.onload: scroll()");
            element.scrollIntoView();
        }
    }
    else {
        document.documentElement.scrollIntoView();
    }
};
loadFromServer('/wiki_resources/doc/readme.html');
loadAll();
//# sourceMappingURL=index.js.map