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

function renderStroke(key, value) {
    const objStroke = document.createElement("div");
    objStroke.className = "obj__stroke" + (typeof (value) === "object" && value != null ? " accordion" : "");
    objStroke.addEventListener("click", function () {
        event.stopPropagation();
        this.classList.toggle("open");
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
                console.log(value == null);
                return renderPrimitiveType("span", "obj__null", "null");
            } else {
                return renderObject(value, parentNode);
            }
        default:
            return renderPrimitiveType("span", "obj__" + typeof (value), value);
    }
}

function renderObject(obj, parentNode) {
    parentNode.appendChild(renderPrimitiveType("span", "obj__bracket", Array.isArray(obj) ? "[" : "{"));
    parentNode.appendChild(renderCount(obj));
    Object.entries(obj).forEach(([key, value]) => {
        parentNode.appendChild(renderStroke(key, value));
    });
    return parentNode.appendChild(renderPrimitiveType("span", "obj__bracket", Array.isArray(obj) ? "]" : "}"));
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
