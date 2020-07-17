import React, { useState, useCallback, useRef } from 'react'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { XYCoord } from 'dnd-core'
import { ItemTypes } from '../ItemTypes'
import { Item } from './Item'
import update from 'immutability-helper'
import ToolBox from '../ToolBox'

export interface IProps {
    id: number,
    index: number,
    title: string,
    items: string[],
    moveSection: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
    index: number
    id: string
    type: string
}

export const SubSection: React.FC<IProps> = ({id, title, index, items, moveSection}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop({
        accept: ItemTypes.SECTION,
        hover(item: DragItem, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            // Time to actually perform the action
            moveSection(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: ItemTypes.SECTION, id, index },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [isMouseHover, setMouseHover] = React.useState<boolean>(false);
    const onMouseEnter = () => {
        setMouseHover(true);
    }

    const onMouseLeave = () => {
        setMouseHover(false);
    }

    drop(ref);



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
        <div ref={ref} className="sub-section item" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {isMouseHover && !isDragging ? <ToolBox drag={drag}/> : null}
            <div ref={preview}>
                <h4 className="item-title">{title}</h4>
                <ul className="list-unstyled resume-skills-list">
                    {elements.map(renderElement)}
                </ul>
            </div>
        </div>
    )
}
