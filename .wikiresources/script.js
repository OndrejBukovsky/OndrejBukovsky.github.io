/* Version V0.8 (6.7.2023) */

// global variables
var absoluteRootPath = "file:///D:";
var serverRoot = "";
//

const isRunningLocally = !(window && window.origin.startsWith("http"));
console.log("DEBUG: isRunningLocally: ", isRunningLocally);

/** path: string */
function renderLinks() {

    const elements = document.querySelectorAll(".wikiAppLink");

    if (elements && elements.length > 0) {
        elements.forEach(element => {
            if (isRunningLocally) {
                element.href = absoluteRootPath + element.name;
            }else{
                if(serverRoot !== "")                {
                    element.href = serverRoot + element.name; 
                }else{
                    element.href = element.name;
                }
            }

            element.addEventListener("click", () => {
                window.parent.postMessage("wikiAppLink.onclick", "*");
            });
        });
    }
}

function generateContentTable() {
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
