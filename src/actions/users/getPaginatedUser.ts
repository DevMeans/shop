'use server'
import { auth } from "@/auth.config"
import prisma from '@/lib/prisma';

export const getPaginatedUser = async ()=>{
    const session = await auth()
    if(session?.user.role!=='admin'){
        return {
            ok:false,
            message:'No tienes permisos de administrador'
        }
    }
    const users= await prisma.user.findMany({
        orderBy:{
            name:'desc'
        }
    })
    console.log(users)
    return {
        ok:true,
        users:users
    }
}