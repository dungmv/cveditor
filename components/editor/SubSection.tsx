import React, {useRef} from 'react'
import JsxParser from 'react-jsx-parser'
import ToolBox from './ToolBox'
import { useDrag, useDrop, DropTargetMonitor, DragObjectWithType } from 'react-dnd'
import { XYCoord } from 'dnd-core'
import { ItemTypes } from './ItemTypes'

interface DragItem extends DragObjectWithType {
    id: number
    index: number
}

export interface IProps {
    id: number
    index: number
    jsx: string
    moveItem: (dragIndex: number, hoverIndex: number) => void
}

export const SubSection: React.FC<IProps> = ({id, index, jsx, moveItem}) => {
    const [isMouseHover, setMouseHover] = React.useState<boolean>(false);
    const onMouseEnter = () => {
        setMouseHover(true);
    }

    const onMouseLeave = () => {
        setMouseHover(false);
    }

    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop({
        accept: ItemTypes.SUBSECTION,
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
            moveItem(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: ItemTypes.SUBSECTION, id, index },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    drop(ref);
    return (
        <div ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="sub-section">
            {isMouseHover && !isDragging ? <ToolBox drag={drag}/> : null}
            <div ref={preview}>
                <JsxParser jsx={jsx}/>
            </div>
        </div>
    )
}
