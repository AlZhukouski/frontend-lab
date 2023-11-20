const inputField = document.querySelector(".json__input");
const jsonOutput = document.querySelector(".json__output");
const button = document.querySelector(".json__button");
button.addEventListener("click", () => {
    const jsonString = inputField.value;
    if (isJsonString(jsonString)) {
        const jsonObj = JSON.parse(jsonString);
        jsonOutput.innerHTML = "";
        Object.entries(jsonObj).forEach(([key, value]) => {
            jsonOutput.appendChild(renderStroke(key, value));
        });
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

function addAccordionClass(value) {
    if (typeof (value) === "object") {
        return value != null ? " accordion" : "";
    }
    return ""
}

function renderStroke(key, value) {
    const objStroke = document.createElement("div");
    objStroke.className = "obj__stroke" + addAccordionClass(value);
    objStroke.addEventListener("click", {
        handleEvent: function (event) {
            this.classList.toggle("open");
            event.stopPropagation();
        }.bind(objStroke)
    });

    objStroke.appendChild(renderPrimitiveType("span", "obj__key", key));
    objStroke.appendChild(renderPrimitiveType("span", "obj__colon", " : "));
    objStroke.appendChild(renderObjValue(value, objStroke));
    return objStroke;
}

function renderPrimitiveType(tagName, className, textContent) {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = textContent;
    return element;
}

function renderObjValue(value, parentNode) {
    switch (typeof (value)) {
        case "object":
            if (value == null) {
                return renderPrimitiveType("span", "obj__null", "null");
            } else {
                return renderObject(value, parentNode);
            }
        default:
            return renderPrimitiveType("span", "obj__" + typeof (value), value);
    }
}

function renderObject(objectToRender, parentNode) {
    let firstBracket = Array.isArray(objectToRender) ? "[" : "{";
    let lastBracket = Array.isArray(objectToRender) ? "]" : "}";
    parentNode.appendChild(renderPrimitiveType("span", "obj__bracket", firstBracket));
    parentNode.appendChild(renderObjectLength(objectToRender));
    Object.entries(objectToRender).forEach(([key, value]) => {
        parentNode.appendChild(renderStroke(key, value));
    });
    return parentNode.appendChild(renderPrimitiveType("span", "obj__bracket", lastBracket));
}

function renderObjectLength(value) {
    const element = document.createElement("span");
    element.className = "obj__count";
    let propertyName = "";
    let objectLength;
    if (Array.isArray(value)) {
        propertyName = "item";
        objectLength = value.length;
    } else {
        propertyName = "prop";
        objectLength = Object.keys(value).length;
    }
    element.textContent = objectLength + " " + propertyName + (objectLength > 1 ? "s" : "");
    return element;
}
