'use server'
import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';

export const registerForm = async (name: string, email: string, passowrd: string) => {
    try {

        const userexist = await prisma.user.findFirst({where:{email:email}})
        if(userexist){
            return {
                ok:false,
                message:'usuario ya existe'

            }
        }
        const user = await prisma.user.create({
            data:{
                name:name,
                email:email.toLowerCase(),
                password:bcryptjs.hashSync(passowrd)
            },
            select:{
                id:true,
                name:true,
                email:true
            }
        })
        return {
            ok:true,
            user
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo crear el usuario'
        }
    }
}