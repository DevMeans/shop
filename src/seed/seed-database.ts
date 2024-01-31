import { initialData } from "./seed"


async function main(){
    console.log('Seed ejecutado correctamente');

    console.log(initialData);
}

(()=>{
    if(process.env.NODE_ENV==='production') return;
    main()
})()