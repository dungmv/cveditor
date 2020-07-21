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

export const Container: React.FC<IProps> = (props) => {
    const [elements, setElements] = useState(props.sections.map((el, i) => ({id: i, item: el})));
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

    const header = () => {
        return (<JsxParser jsx={props.header}/>)
    }

    const footer = () => {
        return (<JsxParser jsx={props.footer}/>)
    }

    const section = (el, index: number) => {
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
    const column = (col: number) => {
        return props.sections[col].map(section);
    }
    return (
        <JsxParser
            components={{ SubSection, Section }}
            bindings={{column, header, footer, section}}
            jsx={props.jsx}
        />
    )
}
