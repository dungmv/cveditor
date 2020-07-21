import React, {useRef} from 'react'
import JsxParser from 'react-jsx-parser'
import ToolBox from '../ToolBox'

export interface IProps {
    index: number
    jsx: string
}

export const SubSection: React.FC<IProps> = ({index, jsx}) => {
    const drag = useRef<HTMLDivElement>(null);
    const [isMouseHover, setMouseHover] = React.useState<boolean>(false);
    const onMouseEnter = () => {
        setMouseHover(true);
    }

    const onMouseLeave = () => {
        setMouseHover(false);
    }

    return (
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="sub-section">
            {isMouseHover ? <ToolBox drag={drag}/> : null}
            <JsxParser
                jsx={jsx}
            />
        </div>
    )
}
