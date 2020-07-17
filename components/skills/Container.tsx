import React, { useState, useCallback } from 'react'
import { Item } from './Item'
import update from 'immutability-helper'

export interface ContainerProps {
    items: string[]
}

export const Container: React.FC<ContainerProps> = ({items}) => {
    const [elements, setElements] = useState(items.map((el, i) => ({id: i, text: el})));
    const moveItem = useCallback(
        (dragIndex, hoverIndex) => {
            const dragCard = elements[dragIndex]
            setElements(
                update(elements, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard],
                    ],
                }),
            )
        },
        [elements],
    )
    const renderElement = (el, index) => {
        return (
            <Item
                key={el.id}
                index={index}
                id={el.id}
                text={el.text}
                moveItem={moveItem}
            />
        )
    }
    return (
        <ul className="list-unstyled resume-skills-list">
            {elements.map(renderElement)}
        </ul>
    )
}
