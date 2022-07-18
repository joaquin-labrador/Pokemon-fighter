const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));
    import { floor, max, random } from 'mathjs';
//Pokemon object
class POKEMON {
    constructor(name, type, hp, attack, defense, speed) {
        this.name = name;
        this.types = [{ type: { name: type } }];
        this.stats = [{ base_stat: hp }, { base_stat: attack }, { base_stat: defense }, { base_stat: speed }];
    }
}


//Peticion pokeApi


async function getPokemonsFirstGenearation(id) {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + id;
    const res = await fetch(url);
    return await res.json();
}

const generateZoo = async () => {
    let pokemons = [];
    console.log(`Generando zoologico`);
    for (let i = 1; i <= 151; i++) {
        let pokemon = await getPokemonsFirstGenearation(i);
        pokemons.push(new POKEMON(pokemon.name, pokemon.types[0].type.name,
            pokemon.stats[0].base_stat, pokemon.stats[1].base_stat, pokemon.stats[2].base_stat, pokemon.stats[3].base_stat));
    }
    console.log(`Zoologico generado`);
    return pokemons;
}

//Show POKEMON_ZOO in console estic format
const showZoo = async (pokemons) => {
    console.log(`Zoologico:`);
    pokemons.forEach(pokemon => {
        console.log(`${pokemon.name} - ${pokemon.types[0].type.name}
         - ${pokemon.stats[0].base_stat} - ${pokemon.stats[1].base_stat} 
         - ${pokemon.stats[2].base_stat} - ${pokemon.stats[3].base_stat}`);
    }
    );
}


async function startFight() {

    let pokemons = await generateZoo();
    let pokeRandom1 = floor(random() * 151);
    let pokeRandom2 = floor(random() * 151);
    let pokemon1 = pokemons[pokeRandom1];
    let pokemon2 = pokemons[pokeRandom2];
    console.log( pokemon1.name , " VS " ,  pokemon2.name);
    //First attack the pokemon with the higher speed
    if (pokemon1.stats[3].base_stat > pokemon2.stats[3].base_stat) {
        console.log(`${pokemon1.name} goes first \n\n`);
        fight(pokemon1, pokemon2);
    }
    else {
        console.log(`${pokemon2.name} goes first\n\n`);
        fight(pokemon2, pokemon1);
    }
}
const howWasTheSkill = (number, bool) => {
    let skill;
    (bool === true) ? skill = "attack" : skill = "defense";
    if (number === 0)
        console.log("Worst  ", skill.toString());
    else if ( number <= 25)
        console.log("The ", skill.toString(), " was very bad");
    else if ( number <= 50)
        console.log("The ", skill.toString(), " was bad");
    else if ( number <= 75)
        console.log("The ", skill.toString(), " was good");
    else if ( number <= 99)
        console.log("The ", skill.toString(), " was very good");
    else
        console.log("The ", skill.toString(), " was perfect");

}


const fight = async (pokemon1, pokemon2) => {
    let i = 1;
    let turn = 1;
    let attack = 0.0;
    let areDead = false;

    do {
        console.log(`Turno ${i}`);
        if (turn === 1) {
            //Genere a porcentaje of attack ==> 0% - 100%  (0 % WORST ATACK - 100 % BEST ATACK)
            attack = floor(random() * 101);
            console.log(pokemon1.name);
            howWasTheSkill(attack, true);
            attack = (attack * pokemon1.stats[1].base_stat) / 101;
            console.log("Attack of " + pokemon1.name + ": " + attack);
            //Genere a porcentaje of defense ==> 0% - 100%  (0 % WORST DEFENSE - 100 % BEST DEFENSE)
            let defense = floor(random() * 101);
            console.log(pokemon2.name);
            howWasTheSkill(defense, false);
            defense = (defense * pokemon2.stats[2].base_stat) / 101;
            console.log("Defense of " + pokemon2.name + ": " + defense);
            //Calculate the damage
            let damage = attack - defense;
            if (damage < 0) {
                damage = 0;
            }
            console.log("Damage of " + pokemon1.name + ": " + damage);

            //Apply the damage
            pokemon2.stats[0].base_stat -= damage;
            turn = 0;

        } else {
            attack = floor(random() * 101);
            console.log(pokemon2.name);
            howWasTheSkill(attack, true);
            attack = (attack * pokemon2.stats[1].base_stat) / 101;
            console.log("Attack of " + pokemon2.name + ": " + attack);
            let defense = floor(random() * 101);
            console.log(pokemon1.name)
            howWasTheSkill(defense, false);
            defense = (defense * pokemon1.stats[2].base_stat) / 101;
            console.log("Defense of " + pokemon1.name + ": " + defense);
            let damage = attack - defense;
            if (damage < 0) {
                damage = 0;
            }
            console.log("Damage of " + pokemon2.name + ": " + damage);
            pokemon1.stats[0].base_stat -= damage;
            turn = 1;
        }
        i++;
        if (pokemon1.stats[0].base_stat <= 0) {
            console.log(pokemon1.name + " is dead");
            areDead = true;
        }
        else if(pokemon2.stats[0].base_stat <= 0) {
            console.log(pokemon2.name + " is dead");
            areDead = true;
        }else{
        console.log("HP of " + pokemon1.name + ": " + pokemon1.stats[0].base_stat);
        console.log("HP of " + pokemon2.name + ": " + pokemon2.stats[0].base_stat);
        console.log("----------------------------------------------------- \n");
        }

    } while (!areDead);
    (pokemon1.stats[0].base_stat > pokemon2.stats[0].base_stat) ? console.log(`${pokemon1.name} wins`) : console.log(`${pokemon2.name} wins`);

}


startFight();