const inputField = document.querySelector(".json__input");
const jsonOutput = document.querySelector(".json__output");
const button = document.querySelector(".json__button");

button.addEventListener("click", () => {
    const jsonString = inputField.value;
    if (isJsonString(jsonString)) {
        const jsonObj = JSON.parse(jsonString);
        jsonOutput.innerHTML = "";
        for (const [key, value] of Object.entries(jsonObj)) {
            jsonOutput.appendChild(renderStroke(key, value));
        }
    } else {
        jsonOutput.innerHTML = "Not Valid json string";
    }

});

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function renderStroke(key, value) {
    const objStroke = document.createElement("div");
    objStroke.className = "obj__stroke" + (typeof (value) === "object" ? " accordion" : "");
    objStroke.addEventListener("click", function () {
        event.stopPropagation();
        this.classList.toggle("open");
    });
    objStroke.appendChild(renderObjKey(key));
    objStroke.appendChild(renderColon());
    objStroke.appendChild(renderObjValue(value, objStroke));
    return objStroke;
}

function renderObjKey(value) {
    const objKey = document.createElement("span");
    objKey.className = "obj__key";
    objKey.textContent = value;
    return objKey;
}

function renderColon() {
    const colon = document.createElement("span");
    colon.className = "obj__colon";
    colon.textContent = " : ";
    return colon;
}

function renderBracket(value) {
    const bracket = document.createElement("span");
    bracket.className = "obj__bracket";
    bracket.textContent = value;
    return bracket;
}

function renderCount(value) {
    const count = document.createElement("span");
    count.className = "obj__count";
    let name = "";
    let length;
    if (Array.isArray(value)) {
        name = "item";
        length = value.length;
    } else {
        name = "prop";
        length = Object.keys(value).length;
    }
    count.textContent = length + " " + name + (length > 1 ? "s" : "");
    return count;
}

function renderObjValue(value, parentNode) {
    switch (typeof (value)) {
        case "string" :
            return renderString(value);
            break;
        case "number":
            return renderNumber(value);
            break;
        case "boolean":
            return renderBoolean(value);
            break;
        case "object":
            return renderObject(value, parentNode);
            break;
    }
}


function renderString(value) {
    const valueString = document.createElement("span");
    valueString.className = "obj__string";
    valueString.textContent = value;
    return valueString;
}

function renderNumber(value) {
    const valueNumber = document.createElement("span");
    valueNumber.className = "obj__number";
    valueNumber.textContent = value;
    return valueNumber;
}

function renderBoolean(value) {
    const valueBoolean = document.createElement("span");
    valueBoolean.className = "obj__boolean";
    valueBoolean.textContent = value;
    return valueBoolean;
}


//isArray() check
function renderObject(obj, parentNode) {
    //objStroke.appendChild(renderBracket('['));
    const object = document.createElement("div");
    parentNode.appendChild(renderBracket(Array.isArray(obj) ? "[" : "{"));
    parentNode.appendChild(renderCount(obj));
    for (const [key, value] of Object.entries(obj)) {
        parentNode.appendChild(renderStroke(key, value));
    }
    return parentNode.appendChild(renderBracket(Array.isArray(obj) ? "]" : "}"));
}