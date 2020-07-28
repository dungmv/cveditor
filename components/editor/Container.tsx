import React, { useState, useCallback } from 'react'
import JsxParser from 'react-jsx-parser'
import { Section } from './Section'

interface ISub {
    id: number
    jsx: string
}

interface ISection {
    id: number
    jsx: string
    subs: ISub[]
}

interface IProps {
    header: string,
    footer: string,
    sections: ISection[][],
    jsx: string,
}

export const Container: React.FC<{ template: IProps }> = ({ template }) => {
    const [sections, setSections] = useState<ISection[][]>(template.sections);
    const moveSection = useCallback(
        (dragCol, hoverCol, dragIndex, hoverIndex) => {
            const dragCard = sections[dragCol][dragIndex];
            sections[dragCol][dragIndex] = sections[hoverCol][hoverIndex];
            sections[hoverCol][hoverIndex] = dragCard;
            setSections([...sections]);
        }, [sections]
    )

    const header = () => {
        return (<JsxParser jsx={template.header} />)
    }

    const footer = () => {
        return (<JsxParser jsx={template.footer} />)
    }

    const section = (col: number, el: ISection, index: number) => {
        return (
            <Section
                id={el.id}
                col={col}
                key={index}
                jsx={el.jsx}
                index={index}
                subs={el.subs}
                moveSection={moveSection}
            />
        )
    }
    const column = (col: number) => {
        return sections[col].map((el, i) => section(col, el, i));
    }
    return (
        <JsxParser
            bindings={{ column, header, footer }}
            jsx={template.jsx}
        />
    )
}
