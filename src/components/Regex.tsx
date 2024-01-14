import React from 'react'
import RegexType from '../types/RegexType'
import RegexTypeEnum from '../enums/RegexTypeEnum'

type props = {
regex: RegexType,
       index: number,
       handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, currentIndex: number) => void
}

export default function Regex(props: props) {
    const {regex, index, handleChange} = props

        return (

                <div>
                    <select 
                    name="type" 
                    value={regex?.type || ''} 
                    onChange={(event) => handleChange(event, index)}
                    >
                <option value='' disabled>Choose Regex Type</option>
                {
                Object.values(RegexTypeEnum).map((regexType, index) => {
                        return (
                                <option
                                value={regexType}
                                key={index}
                                >
                                    {regexType}
                                </option>
                               )
                        })
                }
    </select>
    {
        regex?.type == RegexTypeEnum.LITERAL && 
            // The input where the literal is kept
            <input
            type='text'
            name='value'
            value={regex.value || ''}
            onChange={(event) => handleChange(event, index)}
            placeholder='Enter your literal here'
            />
    }
    {
        regex?.type == RegexTypeEnum.PATTERN && <p>Pattern</p>
    }

    </div>
        )
}
