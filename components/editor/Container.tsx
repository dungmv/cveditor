import React, { useState, useCallback } from 'react'
import update from 'immutability-helper'
import JsxParser from 'react-jsx-parser'
import { SubSection } from './SubSection';
import { Section } from './Section';

interface SectionProps {
    jsx: string,
    subs?: string[]
}

export interface IProps {
    header: string,
    footer: string,
    sections: SectionProps[][],
    jsx: string
}

export const Container: React.FC<IProps> = ({jsx, sections, header, footer}) => {
    const [elements, setElements] = useState(sections.map((el, i) => ({id: i, item: el})));
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

    const renderHeader = () => {
        return (<JsxParser jsx={header}/>)
    }

    const renderFooter = () => {
        return (<JsxParser jsx={footer}/>)
    }

    const renderSection = (el, index: number) => {
        return (
            <Section
                key={index}
                jsx={el.jsx}
                index={index}
                subs={el.subs}
                // moveSection={moveItem}
            />
        )
    }
    const renderColumn = (col: number) => {
        return sections[col].map(renderSection);
    }
    return (
        <JsxParser
            components={{ SubSection, Section }}
            bindings={{subs: elements, renderColumn, renderHeader, renderFooter, renderSection}}
            jsx={jsx}
        />
    )
}
