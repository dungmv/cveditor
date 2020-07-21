import React, { useState, useCallback } from 'react'
import JsxParser from 'react-jsx-parser'

export interface IProps {
    index: number
    jsx: string
}

export const SubSection: React.FC<IProps> = ({index, jsx}) => {
    return (
        <JsxParser
            jsx={jsx}
        />
    )
}
