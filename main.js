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
const types = new Map([
    ["fighting", [0, 0]], ["normal", [0, 0]], ["ghost", [0, 0]], ["grass",  [0, 0]], ["fire", [0, 0]], ["ice",   [0, 0]],
    ["electric", [0, 0]], ["flying", [0, 0]], ["steel", [0, 0]], ["ground", [0, 0]], ["rock", [0, 0]], ["bug",   [0, 0]],
    ["psychic",  [0, 0]], ["poison", [0, 0]], ["water", [0, 0]], ["dragon", [0, 0]], ["dark", [0, 0]], ["fairy", [0, 0]] 
]);

const eggs = new Map([
    ["human-like", [0, 0]], ["water 1", [0, 0]], ["dragon",  [0, 0]], ["field", [0, 0]], ["bug",  [0, 0]], 
    ["amorphous",  [0, 0]], ["water 2", [0, 0]], ["monster", [0, 0]], ["grass", [0, 0]], ["none", [0, 0]],   
    ["mineral",    [0, 0]], ["water 3", [0, 0]], ["flying",  [0, 0]], ["fairy", [0, 0]]
]);

const shapes = new Map([
    ["serpentine", [0, 0]], ["butterfly", [0, 0]], ["head", [0, 0]], ["legs", [0, 0]], ["wings", [0, 0]], 
    ["tentacles",  [0, 0]], ["insectoid", [0, 0]], ["arms", [0, 0]], ["fins", [0, 0]], ["biped", [0, 0]],   
    ["quadruped",  [0, 0]], ["multibody", [0, 0]], ["dino", [0, 0]], ["body", [0, 0]]
]);

const gens = Array(9).fill([0, 0]); 
const stages = Array(6).fill([0, 0]);

// npx http-server -p [port number] -e html
let step = 0;
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
        case categories.color:
            for(let i = 0; i < dex.length; i++) {
                if(dex[i].gen == set) {
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
    if(step >= dex.length) {
        evaluate();
    } else {
        document.getElementById("name").innerText = dex[step].name;
        document.getElementById(dex[step].name).style = "display: inline;";
        document.getElementById(dex[step - 1].name).style = "display: none;";
    }
}

function on_back_button_click() {
    if(step > 0) {
        step--;
        document.getElementById("name").innerText = dex[step].name;
        document.getElementById(dex[step].name).style = "display: inline;";
        document.getElementById(dex[step + 1].name).style = "display: none;";
    }
}

function evaluate() {
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
        gens[mon.gen - 1][0] += mon.rating;
        gens[mon.gen - 1][1]++;
        stages[mon.stage][0] += mon.rating;
        stages[mon.stage][1]++;
    }

    console.log("RESULTS:");
    for(let [type, data] of types.entries()) {
        console.log(type + ": " + data[0] / data[1] + ", std: " + standard_deviation(data[0] / data[1], categories.TYPE, type, dex));
    }
    for(let [egg, data] of eggs.entries()) {
        console.log(egg + ": " + data[0] / data[1] + ", std: " + standard_deviation(data[0] / data[1], categories.EGG_GROUP, egg, dex));
    }
    for(let [shape, data] of shapes.entries()) {
        console.log(shape + ": " + data[0] / data[1] + ", std: " + standard_deviation(data[0] / data[1], categories.SHAPE, shape, dex));
    }
    for(let i = 0; i < gens.length; i++) {
        console.log("generation " + (i + 1) + ": " + gens[i][0] / gens[i][1] + ", std: " + standard_deviation(gens[i][0] / gens[i][1], categories.GENERATION, i + 1, dex));
    }
    for(let i = 0; i < stages.length; i++) {
        console.log("evolution stage " + (i + 1) + ": " + stages[i][0] / stages[i][1] + ", std: " + standard_deviation(stages[i][0] / stages[i][1], categories.STAGE, i, dex));
    }
}