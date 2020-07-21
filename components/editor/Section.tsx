import React, { useState, useCallback, useRef } from 'react'
import update from 'immutability-helper'
import JsxParser from 'react-jsx-parser'
import { SubSection } from './SubSection';
import ToolBox from '../ToolBox'

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
                key={index}
                jsx={el.item}
                index={index}
                // moveSection={moveItem}
            />
        )
    }
    const subSections = () => {
        return elements.map(renderSubSection);
    }

    const drag = useRef<HTMLDivElement>(null);
    const [isMouseHover, setMouseHover] = React.useState<boolean>(false);
    const onMouseEnter = () => {
        setMouseHover(true);
    }

    const onMouseLeave = () => {
        setMouseHover(false);
    }

    return (
        <div className="section editable section-dnd" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {isMouseHover ? <ToolBox drag={drag}/> : null}
            <JsxParser
                components={{ SubSection }}
                bindings={{subSections}}
                jsx={jsx}
            />
        </div>
    )
}
