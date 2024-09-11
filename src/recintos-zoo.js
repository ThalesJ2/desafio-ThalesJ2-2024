import Animal from "./entities/Animal.js"
import Recinto from "./entities/Recinto.js";

let  recintos = [new Recinto(1,"savana",10,"3 macacos"),
    new Recinto(2,"floresta",5,""),
    new Recinto(3,"savana e rio",7,"1 gazela"),
    new Recinto(4,"rio",8,""),
    new Recinto(5,"savana",9,"1 leão")
];

let animais = [new Animal("LEAO",3,"savana","carnivoro e mamifero"),
               new Animal("LEOPARDO",2,"savana","carnivoro e mamifero"),
               new Animal("CROCODILO",3,"rio","reptil e carnivoro"),
               new Animal("MACACO",1,"savana ou floresta","mamifero"),
               new Animal("GAZELA",2,"savana","mamifero e herbivoro"),
               new Animal("HIPOPOTAMO",4,"savana ou rio","mamifero e herbivoro")
];
class RecintosZoo {
    analisaRecintos(animal, quantidade) {
        if(!this.animalValido(animais,animal))
          return {erro:"Animal inválido"};
          
        if(quantidade <= 0)
            return {erro:"Quantidade inválida"};

        if(this.procuraRecinto(animal,quantidade).length > 0 )
            return {
                erro:false,
                recintosViaveis:this.procuraRecinto(animal,quantidade)
            };
        else
          return {erro:"Não há recinto viável"}

      
        
    }
    procuraRecinto(animal,quantidade){
        let recintosDisponiveis = [];
        let bioma = this.getBioma(animal);
        let animalAux;
        let carnivoro = false;
        let aux;
        let tamOcupado =  Number(this.getTamanhoAnimal(animal)) * quantidade;
        let tamRecinto;

        if(this.getTipo(animal).includes("carnivoro"))
            carnivoro = true;

        recintos.forEach(recinto =>{
            if(this.verificaBioma(bioma,recinto.bioma)){
                aux = recinto.animalExistente.split(" ");
                if(carnivoro && recinto.animalExistente != undefined && this.getAnimalExistente(aux[1]) == animal){
                    animalAux = this.getAnimalExistente(aux[1]);
                    tamRecinto = (recinto.tamanhoTotal - this.getTamanhoAnimal(animalAux)*recinto.animalExistente[0])
                    if(tamRecinto >= tamOcupado)
                        recintosDisponiveis.push(`Recinto ${recinto.numero} (espaço livre: ${tamRecinto - tamOcupado} total: ${recinto.tamanhoTotal})`);
                }
                
                
                if(recinto.animalExistente != undefined  && !carnivoro){
                    aux = recinto.animalExistente.split(" ");
                    animalAux = this.getAnimalExistente(aux[1]);
                    if(animalAux != animal)
                         tamRecinto = (recinto.tamanhoTotal - (this.getTamanhoAnimal(animalAux)*recinto.animalExistente[0]))-1;
                    else
                         tamRecinto = (recinto.tamanhoTotal - this.getTamanhoAnimal(animalAux)*recinto.animalExistente[0]);
                    if(tamRecinto >= tamOcupado && !(this.getTipo(animalAux).includes("carnivoro")))
                        recintosDisponiveis.push(`Recinto ${recinto.numero} (espaço livre: ${tamRecinto-tamOcupado} total: ${recinto.tamanhoTotal})`);

                }

                if(recinto.animalExistente == "" && carnivoro){

                    if(recinto.tamanhoTotal >= tamOcupado)
                        recintosDisponiveis.push(`Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - tamOcupado} total: ${recinto.tamanhoTotal})`);
                }

                if(recinto.animalExistente == "" && !carnivoro){
                    if(recinto.tamanhoTotal >= tamOcupado){
                        recintosDisponiveis.push(`Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - tamOcupado} total: ${recinto.tamanhoTotal})`)
                    }
                }
            }
                
        });
        return recintosDisponiveis;
    }

    animalValido(animais,nome){
        let flag = false;
        animais.forEach(animal =>{
            if(animal.especie == nome)
                flag = true;
        });

        return flag;
    }

    getTamanhoAnimal(nome){
        let tam;
        animais.forEach(animal =>{    
            if(animal.especie == nome){
                tam = animal.tamanho;
               
            }
                
        });
        return tam;
    }

     verificaBioma(bioma, nomeRecinto) {
        let biomasAnimal = bioma.split(/ e | ou /).map(b => b.trim());
        let biomasRecinto = nomeRecinto.split(/ e | ou /).map(b => b.trim());
        return biomasAnimal.some(biomaAnimal => biomasRecinto.includes(biomaAnimal));
    }

    getBioma(nome){
        let bioma;
        animais.forEach(animal =>{    
            if(animal.especie == nome)
                bioma = animal.bioma;
        });

        return bioma;
    }

    getAnimalExistente(nome){

        if(nome == "macacos" || nome == "macaco")
            return "MACACO";
        if(nome == "leão" || nome == "leões")
            return "LEAO";
        if(nome == "gazela" || nome == "gazelas")
            return "GAZELA";
        if(nome == "crocodilo" || nome == "crocodilos")
            return "CROCODILO";
        if(nome == "leopardo" || nome == "leopardos")
            return "LEOPARDO";
        if(nome == "hipopotamo" || nome == "hipopotamos")
            return "HIPOPOTAMO";       

    }

    getTipo(nome){
        let tipo;
        animais.forEach(animal =>{
            if(animal.especie == nome)
                tipo = animal.tipo;
        });

        return tipo;
    }
}
export { RecintosZoo as RecintosZoo };
