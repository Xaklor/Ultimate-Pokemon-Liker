import dex from "./natdex.js";

const categories = Object.freeze({
    GENERATION: 0,
    TYPE: 1,
    EGG_GROUP: 2,
    SHAPE: 3,
    STAGE: 4,
    COLOR: 5
});

// these are [sum, count] pairs
let types = new Map([
    ["fighting", [0, 0]], ["normal", [0, 0]], ["ghost", [0, 0]], ["grass",  [0, 0]], ["fire", [0, 0]], ["ice",   [0, 0]],
    ["electric", [0, 0]], ["flying", [0, 0]], ["steel", [0, 0]], ["ground", [0, 0]], ["rock", [0, 0]], ["bug",   [0, 0]],
    ["psychic",  [0, 0]], ["poison", [0, 0]], ["water", [0, 0]], ["dragon", [0, 0]], ["dark", [0, 0]], ["fairy", [0, 0]] 
]);

let eggs = new Map([
    ["human-like", [0, 0]], ["water 1", [0, 0]], ["dragon",  [0, 0]], ["field", [0, 0]], ["bug",  [0, 0]], 
    ["amorphous",  [0, 0]], ["water 2", [0, 0]], ["monster", [0, 0]], ["grass", [0, 0]], ["none", [0, 0]],   
    ["mineral",    [0, 0]], ["water 3", [0, 0]], ["flying",  [0, 0]], ["fairy", [0, 0]]
]);

let shapes = new Map([
    ["serpentine", [0, 0]], ["butterfly", [0, 0]], ["head", [0, 0]], ["legs", [0, 0]], ["wings", [0, 0]], 
    ["tentacles",  [0, 0]], ["insectoid", [0, 0]], ["arms", [0, 0]], ["fins", [0, 0]], ["biped", [0, 0]],   
    ["quadruped",  [0, 0]], ["multibody", [0, 0]], ["dino", [0, 0]], ["body", [0, 0]]
]);

let colors = new Map([
    ["yellow", [0, 0]], ["black", [0, 0]], ["brown", [0, 0]], ["gray", [0, 0]], ["red",  [0, 0]],
    ["purple", [0, 0]], ["white", [0, 0]], ["green", [0, 0]], ["pink", [0, 0]], ["blue", [0, 0]]
])

// this feels like heresy since these could be an array but for display purposes I need index tracked separately
let gens = new Map([
    [1, [0, 0]], [2, [0, 0]], [3, [0, 0]], [4, [0, 0]], [5, [0, 0]], [6, [0, 0]], [7, [0, 0]], [8, [0, 0]], [9, [0, 0]]
]);

let stages = new Map([
    [0, [0, 0]], [1, [0, 0]], [2, [0, 0]], [3, [0, 0]], [4, [0, 0]], [5, [0, 0]]
]);

let step = 0;
// checking for saved progress
if (localStorage.step) {
    step = parseInt(localStorage.step);
    let temp = JSON.parse(localStorage.ratings);
    for(let i = 0; i < dex.length; i++) {
        dex[i].rating = temp[i];
    }
    document.getElementById("bulbasaur").style = "display: none;";
    document.getElementById(dex[step].name).style = "display: inline;";
    document.getElementById("name").innerText = dex[step].name + " (" + (step + 1) + "/" + dex.length + ")";
}

document.getElementById("button1") .addEventListener("click", on_rating_button_click);
document.getElementById("button2") .addEventListener("click", on_rating_button_click);
document.getElementById("button3") .addEventListener("click", on_rating_button_click);
document.getElementById("button4") .addEventListener("click", on_rating_button_click);
document.getElementById("button5") .addEventListener("click", on_rating_button_click);
document.getElementById("button6") .addEventListener("click", on_rating_button_click);
document.getElementById("button7") .addEventListener("click", on_rating_button_click);
document.getElementById("button8") .addEventListener("click", on_rating_button_click);
document.getElementById("button9") .addEventListener("click", on_rating_button_click);
document.getElementById("button10").addEventListener("click", on_rating_button_click);
document.getElementById("button_back").addEventListener("click", on_back_button_click);
document.getElementById("button_save").addEventListener("click", on_save_button_click);
document.getElementById("button_clear").addEventListener("click", on_clear_button_click);
document.getElementById("button_random").addEventListener("click", on_random_button_click);

// FUNCTIONS

function standard_deviation(avg, category, set, dex) {
    let variance = 0;
    let count = 0;
    switch(category) {
        case categories.GENERATION:
            for(let i = 0; i < dex.length; i++) {
                if(dex[i].gen == set) {
                    variance += (avg - dex[i].rating) ** 2;
                    count++;
                }
            }
            return Math.sqrt(variance / count);
        case categories.TYPE:
            for(let i = 0; i < dex.length; i++) {
                if(dex[i].type1 == set || dex[i].type2 == set) {
                    variance += (avg - dex[i].rating) ** 2;
                    count++;
                }
            }
            return Math.sqrt(variance / count);
        case categories.EGG_GROUP:
            for(let i = 0; i < dex.length; i++) {
                if(dex[i].egg1 == set || dex[i].egg2 == set) {
                    variance += (avg - dex[i].rating) ** 2;
                    count++;
                }
            }
            return Math.sqrt(variance / count);
        case categories.SHAPE:
            for(let i = 0; i < dex.length; i++) {
                if(dex[i].shape == set) {
                    variance += (avg - dex[i].rating) ** 2;
                    count++;
                }
            }
            return Math.sqrt(variance / count);
        case categories.STAGE:
            for(let i = 0; i < dex.length; i++) {
                if(dex[i].stage == set) {
                    variance += (avg - dex[i].rating) ** 2;
                    count++;
                }
            }
            return Math.sqrt(variance / count);
        case categories.COLOR:
            for(let i = 0; i < dex.length; i++) {
                if(dex[i].color == set) {
                    variance += (avg - dex[i].rating) ** 2;
                    count++;
                }
            }
            return Math.sqrt(variance / count);
    }
}

function on_rating_button_click() {
    // "this" is the button that prompted the callback
    switch(this.id) {
        case "button1":  dex[step].rating = 1;  break;
        case "button2":  dex[step].rating = 2;  break;
        case "button3":  dex[step].rating = 3;  break;
        case "button4":  dex[step].rating = 4;  break;
        case "button5":  dex[step].rating = 5;  break;
        case "button6":  dex[step].rating = 6;  break;
        case "button7":  dex[step].rating = 7;  break;
        case "button8":  dex[step].rating = 8;  break;
        case "button9":  dex[step].rating = 9;  break;
        case "button10": dex[step].rating = 10; break;
    }
    console.log(dex[step].name + ": " + dex[step].rating);
    step = (step + 1);
    document.getElementById(dex[step - 1].name).style = "display: none;";
    if(step >= dex.length) {
        evaluate();
    } else {
        document.getElementById("name").innerText = dex[step].name + " (" + (step + 1) + "/" + dex.length + ")";
        document.getElementById(dex[step].name).style = "display: inline;";
    }
}

function on_back_button_click() {
    if(step > 0) {
        step--;
        document.getElementById("name").innerText = dex[step].name + " (" + (step + 1) + "/" + dex.length + ")";
        document.getElementById(dex[step].name).style = "display: inline;";
        document.getElementById(dex[step + 1].name).style = "display: none;";
    }
}

function on_save_button_click() {
    const ratings = Array(dex.length);
    for(let i = 0; i < dex.length; i++) {
        ratings[i] = dex[i].rating;
    }
    localStorage.step = step;
    // local storage only accepts strings
    localStorage.ratings = JSON.stringify(ratings);
}

function on_clear_button_click() {
    localStorage.clear();
}

function on_random_button_click() {
    document.getElementById(dex[step].name).style = "display: none;";
    for(let i = step; i < dex.length; i++) {
        dex[i].rating = Math.floor(Math.random() * 10) + 1;
    }
    step = dex.length;
    evaluate();
}

function on_download_button_click() {
    const output = new Array(dex.length);
    for(let i = 0; i < dex.length; i++) {
        output[i] = dex[i].name + "," + dex[i].rating + "\n";
    }
    const blob = new Blob(output, {type: "application/octet-stream"});
    const download = document.createElement("a");
    const url = URL.createObjectURL(blob);
    download.href = url;
    download.download = "ratings.csv"
    document.body.appendChild(download);
    download.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(download);
}

function evaluate() {
    // switch displays
    document.getElementById("name").innerText = "";
    document.getElementById("button1").style = "display: none;";
    document.getElementById("button2").style = "display: none;";
    document.getElementById("button3").style = "display: none;";
    document.getElementById("button4").style = "display: none;";
    document.getElementById("button5").style = "display: none;";
    document.getElementById("button6").style = "display: none;";
    document.getElementById("button7").style = "display: none;";
    document.getElementById("button8").style = "display: none;";
    document.getElementById("button9").style = "display: none;";
    document.getElementById("button10").style = "display: none;";
    document.getElementById("button_back").style = "display: none;";
    document.getElementById("button_save").style = "display: none;";
    document.getElementById("button_clear").style = "display: none;";
    document.getElementById("button_random").style = "display: none;";
    document.getElementById("eggs_table").style = "display: block;";
    document.getElementById("types_table").style = "display: block;";
    document.getElementById("shapes_table").style = "display: block;";
    document.getElementById("colors_table").style = "display: block;";
    document.getElementById("stages_table").style = "display: block;";
    document.getElementById("generations_table").style = "display: block;";

    // dynamically creating the download button
    const download = document.createElement("button");
    download.setAttribute("id", "button_download");
    download.setAttribute("class", "menu_button");
    download.innerHTML = "<b>download csv &#9660;</b>";
    document.getElementsByClassName("centered")[0].appendChild(download);
    document.getElementById("button_download").addEventListener("click", on_download_button_click);

    // calculate results
    for(let i = 0; i < dex.length; i++) {
        let mon = dex[i];
        types.get(mon.type1)[0] += mon.rating;
        types.get(mon.type1)[1]++;
        if(mon.type2 != null) {
            types.get(mon.type2)[0] += mon.rating;
            types.get(mon.type2)[1]++;    
        }
        eggs.get(mon.egg1)[0] += mon.rating;
        eggs.get(mon.egg1)[1]++;
        if(mon.egg2 != null) {
            eggs.get(mon.egg2)[0] += mon.rating;
            eggs.get(mon.egg2)[1]++;    
        }
        shapes.get(mon.shape)[0] += mon.rating;
        shapes.get(mon.shape)[1]++;
        colors.get(mon.color)[0] += mon.rating;
        colors.get(mon.color)[1]++;
        stages.get(mon.stage)[0] += mon.rating;
        stages.get(mon.stage)[1]++;
        gens.get(mon.gen)[0] += mon.rating;
        gens.get(mon.gen)[1]++;
    }

    // display results
    types = new Map([...types].sort((a, b) => a[1][0] / a[1][1] < b[1][0] / b[1][1]));
    const types_frag = document.createDocumentFragment();
    for(let [type, data] of types.entries()) {
        const entry = document.getElementById("types_" + type);
        entry.childNodes[3].appendChild(document.createTextNode((data[0] / data[1]).toFixed(2)));
        entry.childNodes[5].appendChild(document.createTextNode(standard_deviation(data[0] / data[1], categories.TYPE, type, dex).toFixed(2)));
        types_frag.appendChild(entry);
    }
    document.getElementById("types_table").appendChild(types_frag);

    eggs = new Map([...eggs].sort((a, b) => a[1][0] / a[1][1] < b[1][0] / b[1][1]));
    const eggs_frag = document.createDocumentFragment();
    for(let [egg, data] of eggs.entries()) {
        const entry = document.getElementById("eggs_" + egg);
        entry.childNodes[3].appendChild(document.createTextNode((data[0] / data[1]).toFixed(2)));
        entry.childNodes[5].appendChild(document.createTextNode(standard_deviation(data[0] / data[1], categories.EGG_GROUP, egg, dex).toFixed(2)));
        eggs_frag.appendChild(entry);
    }
    document.getElementById("eggs_table").appendChild(eggs_frag);

    shapes = new Map([...shapes].sort((a, b) => a[1][0] / a[1][1] < b[1][0] / b[1][1]));
    const shapes_frag = document.createDocumentFragment();
    for(let [shape, data] of shapes.entries()) {
        const entry = document.getElementById("shapes_" + shape);
        entry.childNodes[3].appendChild(document.createTextNode((data[0] / data[1]).toFixed(2)));
        entry.childNodes[5].appendChild(document.createTextNode(standard_deviation(data[0] / data[1], categories.SHAPE, shape, dex).toFixed(2)));
        shapes_frag.appendChild(entry);
    }
    document.getElementById("shapes_table").appendChild(shapes_frag);

    colors = new Map([...colors].sort((a, b) => a[1][0] / a[1][1] < b[1][0] / b[1][1]));
    const colors_frag = document.createDocumentFragment();
    for(let [color, data] of colors.entries()) {
        const entry = document.getElementById("colors_" + color);
        entry.childNodes[3].appendChild(document.createTextNode((data[0] / data[1]).toFixed(2)));
        entry.childNodes[5].appendChild(document.createTextNode(standard_deviation(data[0] / data[1], categories.COLOR, color, dex).toFixed(2)));
        colors_frag.appendChild(entry);
    }
    document.getElementById("colors_table").appendChild(colors_frag);

    gens = new Map([...gens].sort((a, b) => a[1][0] / a[1][1] < b[1][0] / b[1][1]));
    const gens_frag = document.createDocumentFragment();
    for(let [gen, data] of gens.entries()) {
        const entry = document.getElementById("generations_" + gen);
        entry.childNodes[3].appendChild(document.createTextNode((data[0] / data[1]).toFixed(2)));
        entry.childNodes[5].appendChild(document.createTextNode(standard_deviation(data[0] / data[1], categories.GENERATION, gen, dex).toFixed(2)));
        gens_frag.appendChild(entry);
    }
    document.getElementById("generations_table").appendChild(gens_frag);

    stages = new Map([...stages].sort((a, b) => a[1][0] / a[1][1] < b[1][0] / b[1][1]));
    const stages_frag = document.createDocumentFragment();
    for(let [stage, data] of stages.entries()) {
        const entry = document.getElementById("stages_" + stage);
        entry.childNodes[3].appendChild(document.createTextNode((data[0] / data[1]).toFixed(2)));
        entry.childNodes[5].appendChild(document.createTextNode(standard_deviation(data[0] / data[1], categories.STAGE, stage, dex).toFixed(2)));
        stages_frag.appendChild(entry);
    }
    document.getElementById("stages_table").appendChild(stages_frag);
}