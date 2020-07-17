import React, { useRef } from 'react'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { ItemTypes } from '../ItemTypes'
import { XYCoord } from 'dnd-core'
import ToolBox from '../ToolBox'

export interface CardProps {
    id: any
    text: string
    index: number
    moveItem: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
    index: number
    id: string
    type: string
}

export const Item: React.FC<CardProps> = ({ id, text, index, moveItem }) => {
    const refDrop = useRef<HTMLLIElement>(null);
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover(item: DragItem, monitor: DropTargetMonitor) {
            if (!refDrop.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = refDrop.current?.getBoundingClientRect()

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
            moveItem(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: ItemTypes.CARD, id, index },
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

    drop(refDrop);
    return (
        <li ref={refDrop} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={`sub-section ${isDragging ? 'sub-section-active' : ''}`}>
            {isMouseHover && !isDragging ? <ToolBox drag={drag}/> : null}
            <span contentEditable={true} suppressContentEditableWarning={true} ref={preview}>{text}</span>
        </li>
    )
}
