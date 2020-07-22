import React, { useState, useCallback } from 'react'
import JsxParser from 'react-jsx-parser'
import { Section } from './Section';

interface SectionProps {
    id?: number,
    jsx: string,
    subs?: string[]
}

const rebuildSection = (sections: SectionProps[][]) => {
    let counter = 1;
    sections.forEach((col) => {
        col.forEach((sec) => {
            sec.id = counter;
            counter++;
        }) 
    });
    return sections;
}

export interface IProps {
    header: string,
    footer: string,
    sections: SectionProps[][],
    jsx: string
}

export const Container: React.FC<IProps> = (props) => {
    const [elements, setElements] = useState<SectionProps[][]>(rebuildSection(props.sections));
    const moveSection = useCallback(
        (dragCol, hoverCol, dragIndex, hoverIndex) => {
            const dragCard = elements[dragCol][dragIndex];
            elements[dragCol][dragIndex] = elements[hoverCol][hoverIndex];
            elements[hoverCol][hoverIndex] = dragCard;
            setElements([...elements]);
        },
        [elements],
    )

    const header = () => {
        return (<JsxParser jsx={props.header}/>)
    }

    const footer = () => {
        return (<JsxParser jsx={props.footer}/>)
    }

    const section = (col: number, el: SectionProps, index: number) => {
        return (
            <Section
                id={el.id}
                col={col}
                key={el.id}
                jsx={el.jsx}
                index={index}
                subs={el.subs}
                moveSection={moveSection}
            />
        )
    }
    const column = (col: number) => {
        return elements[col].map((el, i) => section(col, el, i));
    }
    return (
        <JsxParser
            bindings={{column, header, footer}}
            jsx={props.jsx}
        />
    )
}
