'use server';

import type { Address } from "@/interfaces/address.interface";



export const setUserAdress = async (address: Address, userId: string) => {

    try {
        const newAddress=await createdOrReplaceAddress(address,userId)
        return {
            ok:true,
            address:newAddress
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo grabar la direccion'
        }
    }

}
const createdOrReplaceAddress = async (address: Address, userId: string) => {
    try {
        const storedAddress = await prisma?.userAddress.findUnique({
            where: { userId }
        })
        const addressToSave = {
            userId,
            address: address.address,
            address2: address.address2,
            country: address.country,
            countryId: address.country, // Corrected property name
            firtName: address.firtName,
            lastName: address.lastName,
            phone: address.phone,
            postalCode: address.postalCode, // Add this property
            city: address.city, // Add this property
        }
        if (!storedAddress) {
            const newAddress = await prisma?.userAddress.create({
                data: addressToSave
            })
            return newAddress
        }
        const updateAddress = await prisma?.userAddress.update({
            where:{userId},
            data:addressToSave
        })
        return updateAddress

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo grabar la direccion'
        }
    }

}