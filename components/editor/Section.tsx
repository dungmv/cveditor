import React, { useState, useCallback } from 'react'
import update from 'immutability-helper'
import JsxParser from 'react-jsx-parser'
import { SubSection } from './SubSection';

export interface IProps {
    index: number,
    subs?: string[],
    jsx: string
}

export const Section: React.FC<IProps> = ({index, jsx, subs}) => {
    const [elements, setElements] = useState(subs.map((el, i) => ({id: i, item: el})));
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
    const renderSubSection = (el, index: number) => {
        return (
            <SubSection
                jsx={el.item}
                index={index}
                // moveSection={moveItem}
            />
        )
    }
    return (
        <JsxParser
            components={{ SubSection }}
            bindings={{subs: elements, renderSubSection}}
            jsx={jsx}
        />
    )
}
