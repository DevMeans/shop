'use client'
import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"
interface Props {
    quatity: number
}

export const QuantitySelector = ({ quatity }: Props) => {
    const [count, setCount] = useState(quatity)
    const onQuantityChanged = (value: number) => {
        if ((count + value) < 1) return;
        setCount(count + value)
    }
    return (
        <div className="flex">
            <button onClick={() => onQuantityChanged(-1)}>
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className="w-20 mx-3 px-5 bg-gray-100 text-center">
                {count}
            </span>
            <button onClick={() => onQuantityChanged(1)}>
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    )
}
