const ol = document.getElementById("ol");
const submit = document.getElementById("button");
const form = document.getElementById("form");
const inputValue = document.getElementById("input");

class Cacher {
    static cache = {};

    constructor(value) {
        this.value = value;
        return Cacher.withCache(value);
    }

    static withCache(value) {
        function saveCache(i) {
            if (Cacher.cache.hasOwnProperty(i)) {
                return Cacher.cache[i];
            }
            Cacher.cache[i] = value(i);
            return Cacher.cache[i];
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
function clickButton() {
    if (inputValue.value && inputValue.value <= 7000000) {
        const listItem = document.createElement("li");
        let result = Cacher.withCache(factorial);
        listItem.innerHTML = result(inputValue.value);
        ol.appendChild(listItem);
    }
}
