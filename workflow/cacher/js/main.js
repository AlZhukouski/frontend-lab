const ol = document.getElementById("ol");
const submit = document.getElementById("button");
const form = document.getElementById("form");
const inputValue = document.getElementById("input");

class Cacher {
    constructor(value) {
        this.value = value;
        return Cacher.withCache(value);
    }
    static withCache(value) {
        let cache = {};
        function saveCache(...i) {
            if (cache.hasOwnProperty(i)) {
                return cache[i];
            }
            cache[i] = value(...i);
            return cache[i];
        }
        return saveCache;
    }
}

let factorial = function (i) {
    return math.factorial(math.bignumber(i)).toString();
};

form.addEventListener("submit", handleForm);
function handleForm(event) {
    event.preventDefault();
}
submit.addEventListener("click", clickButton);
const result = Cacher.withCache(factorial);
function clickButton() {
    if (inputValue.value && inputValue.value <= 7000000) {
        const listItem = document.createElement("li");
        listItem.innerHTML = result(inputValue.value);
        ol.appendChild(listItem);
    }
}
