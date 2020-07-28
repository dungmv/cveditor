import React, { useState, useCallback, useRef } from 'react'
import JsxParser from 'react-jsx-parser'
import { SubSection } from './SubSection';
import ToolBox from '../ToolBox'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { XYCoord } from 'dnd-core'
import { ItemTypes } from '../ItemTypes';

interface DragItem {
    index: number
    id: string
    col: number
    type: string
}

interface ISub {
    id: number,
    jsx: string,
}

export interface IProps {
    id: number,
    col: number,
    index: number,
    subs?: ISub[],
    jsx: string,
    moveSection: (dragCol: number, hoverCol: number, dragIndex: number, hoverIndex: number) => void
}

export const Section: React.FC<IProps> = ({ col, index, id, jsx, subs, moveSection }) => {
    const [items, setItems] = useState<ISub[]>(subs);
    const moveSubSection = useCallback(
        (dragIndex, hoverIndex) => {
            const dragSub = items[dragIndex];
            items[dragIndex] = items[hoverIndex];
            items[hoverIndex] = dragSub;
            setItems([...items]);
        }, [items]
    )

    const renderSubSection = (el: ISub, idx: number) => {
        return (
            <SubSection
                id={el.id}
                key={idx}
                jsx={el.jsx}
                index={idx}
                moveItem={moveSubSection}
            />
        )
    }

    const subSections = () => {
        return subs.map(renderSubSection);
    }

    const [isMouseHover, setMouseHover] = React.useState<boolean>(false);
    const onMouseEnter = () => {
        setMouseHover(true);
    }

    const onMouseLeave = () => {
        setMouseHover(false);
    }

    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop({
        accept: ItemTypes.SECTION,
        hover(item: DragItem, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            const dragCol = item.col
            const hoverCol = col

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

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
            moveSection(dragCol, hoverCol, dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: ItemTypes.SECTION, id, index, col },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    drop(ref);
    return (
        <div ref={ref} className="section editable section-dnd" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {isMouseHover && !isDragging ? <ToolBox drag={drag} /> : null}
            <div ref={preview}>
                <JsxParser bindings={{ subSections }} jsx={jsx} />
            </div>
        </div>
    )
}
