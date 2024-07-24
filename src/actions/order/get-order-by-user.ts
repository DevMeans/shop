'use server';

import { auth } from "@/auth.config";
import orders from '../../app/(shop)/orders/page';
import prisma from '@/lib/prisma';

export const getOrdersByUser = async ()=>{
    const session = await auth()
    if(!session?.user){ //TODO: PARA QUE SE NO SEA REPETITIVA ESTA RESPUESTA
        return{
            ok:false,
            message:'Debe estar autenticado'
        }
    }
    const orders = await prisma.order.findMany({
        where:{
            userId:session!.user.id
        },include:{
            OrderAddress:{
                select:{
                    firstName:true,
                    lastName:true
                }
            }
        }
    })
    return {
        ok:true,
        orders:orders
    }
}