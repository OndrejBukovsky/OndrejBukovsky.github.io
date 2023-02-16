/* Version V0.5 (29.1.2023) */

const _rootPath = "file:///D:/0_Projects/WikiPage/dist";
const isRunningLocally = !(window && window.origin == "http://localhost:8080");
console.log("DEBUG: isRunningLocally: ", isRunningLocally);


/** 
 * Dispatch to function loadFromServer (In case of wiki application) (No dependencies!!)
 * @param path {string} 
 */
// function loadContent(path){
//     console.log("DEBUG: loadContent(), isRunningLocally:",isRunningLocally);
//     console.log("DEBUG: loadContent(), path:",path);
//     // if the loadFromServer function is undefined the HTML file was probably opened locally
//     if(isRunningLocally){
//         // redirect to the file
//         window.location.href = _rootPath + path;
//     }else{
//         //window.location.href = path;
//         //window.frameElement.src = path;
//         //window.location.assign(path);
//         //location.assign(path);
//         console.log(window.location.href);
//         console.log(window.frameElement.src);
//         //window.location.reload();
//     }
// }


/** path: string */
function renderLinks() {
    console.log("DEBUG: renderLinks()");

    const elements = document.querySelectorAll(".wikiAppLink");
    //console.log("DEBUG: renderLinks/elements: ", elements);
    if (elements && elements.length > 0) {
        elements.forEach(element => {
            if (isRunningLocally) {
                element.href = _rootPath + element.name;
            }else{
                element.href = element.name;
            }
        });
    }
}

function generateContentTable() {
    console.log("generateContentTable");
    const articleBody = document.getElementById("articleBody");
    if (articleBody) {
        const contentTable = _bla(articleBody, 0);// get return value and check null
        if (contentTable) {
            const contentTableDiv = document.getElementById("contentTableDiv");
            if (contentTableDiv) {
                contentTableDiv.style.display = "block";

                const tableDiv = document.createElement("div");
                tableDiv.className = "nestedOrderedList";
                tableDiv.appendChild(contentTable);
                contentTableDiv.appendChild(tableDiv);
            }
        }
    } else {
        console.log("DEBUG: No articleBody!!");
    }
}

const _sections = [".articleSection", ".articleSubsection", ".articleSubSubsection"];
const _sectionsHeaders = [".articleBody h2", ".articleBody h3", ".articleBody h4"];

/** should return ol element */
function _bla(articleBody, elementIndex) {
    const outputElement = document.createElement("ol");
    const elements = articleBody.querySelectorAll(_sections[elementIndex]);
    //console.log(elements);
    if (elements && elements.length > 0) {
        elements.forEach(element => {
            // map all the headers except the header of the content table itself!
            if (element.id != "ContentTableHeader") {
                const li = document.createElement("li");
                const a = document.createElement("a");
                li.appendChild(a);

                const headerElement = element.querySelector(_sectionsHeaders[elementIndex]);
                a.innerText = headerElement ? headerElement.innerText : "Unknown";
                a.className = "wikiContentLink";
                //a.href = (headerElement && headerElement.id != "") ? ("#" + headerElement.id) : "";
                a.onclick = function myFunction() {
                    const element = document.getElementById(headerElement.id);
                    element.scrollIntoView();
                  }

                const rv = _bla(element, elementIndex + 1);
                if (rv) {
                    li.appendChild(rv);
                }

                outputElement.appendChild(li);
            }
        });
        return outputElement;
    } else {
        return null;
    }
}

/** 
 * Some characters have to be replaced!!
 * '<'  -> &lt; 
 * '>'  -> &gt;
 * '\n' -> \\n
 */
function loadSourceFile(code, elementID){
    const codeElement = document.getElementById(elementID);
    if (codeElement) {
        code = code.replace(/</gi, "&lt;");
        code = code.replace(/>/gi, "&gt;");
        codeElement.innerHTML = code;
    }
}

// Run default functions
renderLinks();
