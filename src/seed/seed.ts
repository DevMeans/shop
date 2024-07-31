// @ts-nocheck
import bcryptjs from 'bcryptjs'
interface SeedProduct {
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    gender: 'men' | 'women' | 'kid' | 'unisex'
}

interface Seeduser {
    email: string;
    password: string;
    name: string;
    role: 'admin' | 'user',
    image: string
}


type ValidSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
type ValidTypes = 'shirts' | 'pants' | 'hoodies' | 'hats';

interface SeedData {
    users: Seeduser[]
    categories: string[]
    products: SeedProduct[],
}




export const initialData: SeedData = {
    users: [
        {
            email: 'milton@gmail.com',
            name: 'Milton',
            password: bcryptjs.hashSync('123123'),
            role: 'admin',
            image: ''


        },
        {
            email: 'myriam@gmail.com',
            name: 'Myriam',
            password: bcryptjs.hashSync('123123'),
            role: 'user',
            image: ''

        }
    ],
    categories: [
        'Shirts', 'Pants', 'Hoodies', 'Hats'
    ],
    products: [
        {
            description: "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
            images: [
                '1740176-00-A_0_2000.jpg',
                '1740176-00-A_1.jpg',
            ],
            inStock: 7,
            price: 75,
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            slug: "mens_chill_crew_neck_sweatshirt",
            type: 'shirts',
            tags: ['sweatshirt'],
            title: "Men’s Chill Crew Neck Sweatshirt",
            gender: 'men'
        },
        
    ]
}