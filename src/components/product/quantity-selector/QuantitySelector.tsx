'use client'
import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"
interface Props {
    quatity: number,
    QuantityChanged: (quantity: number) => void
}

export const QuantitySelector = ({ quatity, QuantityChanged }: Props) => {


    const onQuantityChangedValue = (value: number) => {
        if ((quatity + value) < 1) return;
        QuantityChanged(quatity + value)
    }
    return (
        <div className="flex">
            <button onClick={() => onQuantityChangedValue(-1)}>
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className="w-20 mx-3 px-5 bg-gray-100 text-center">
                {quatity}
            </span>
            <button onClick={() => onQuantityChangedValue(1)}>
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    )
}
