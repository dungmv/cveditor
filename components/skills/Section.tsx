import React, { useState, useCallback } from 'react'
import { SubSection } from './SubSection'
import update from 'immutability-helper'

interface SubSectionProps {
    title: string,
    items: string[]
}

export interface IProps {
    // id: number,
    // index: number,
    title: string,
    items: SubSectionProps[]
}

export const Section: React.FC<IProps> = ({title, items}) => {
    const [elements, setElements] = useState(items.map((el, i) => ({id: i, item: el})));
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
    const renderElement = (el: {id: number, item: SubSectionProps}, index: number) => {
        return (
            <SubSection
                key={el.id}
                index={index}
                id={el.id}
                items={el.item.items}
                title={el.item.title}
                moveSection={moveItem}
            />
        )
    }
    return (
        <section className="skills-section py-3">
            <h3 className="text-uppercase resume-section-heading mb-4">{title}</h3>
            <div className="item">
                {elements.map(renderElement)}
            </div>
        </section>
    )
}
