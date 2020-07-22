import React, { useState, useCallback } from 'react'
import JsxParser from 'react-jsx-parser'
import { Section } from './Section';

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

const rebuild = (template: any): IProps => {
    let counter: number = 0;
    template.sections.forEach((col: any) => {
        col.forEach((sec: any) => {
            counter++;
            sec.id = counter;
            sec.subs = sec.subs.map((el: string) => {
                counter++;
                return { id: counter, jsx: el };
            });
        })
    });
    return template;
}

export const Container: React.FC<{ template: any }> = ({ template }) => {
    const cvTemplate: IProps = rebuild(template);
    console.log(JSON.stringify(cvTemplate));
    const [elements, setElements] = useState<ISection[][]>(cvTemplate.sections);
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
        return (<JsxParser jsx={cvTemplate.header} />)
    }

    const footer = () => {
        return (<JsxParser jsx={cvTemplate.footer} />)
    }

    const section = (col: number, el: ISection, index: number) => {
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
            bindings={{ column, header, footer }}
            jsx={template.jsx}
        />
    )
}
