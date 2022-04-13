import {css} from '@emotion/react'
import {useEffect, useState} from 'react'
import {greet} from '@/utils/wasm'

const rowStyle = css`
  display: flex;
  flex-direction: row;
`

const cellStyle = css`
  flex-grow: 0;
  flex-shrink: 0;
  line-height: 1.5em;
  width: 50px;
  border: 1px solid #ddd;
  padding: 0 3px;
`

interface TinyExcelCellProps {
  value: string | number
  isHeader?: boolean
}

const TinyExcelCell = (props: TinyExcelCellProps) => {
  return <div css={cellStyle}>{props.value}</div>
}

interface TinyExcelRowProps {
  rowData: string[]
}

const TinyExcelRow = (props: TinyExcelRowProps) => {
  return (
    <div css={rowStyle}>
      {props.rowData.map((cellData, index) => {
        return <TinyExcelCell key={index} value={cellData} />
      })}
    </div>
  )
}

const TinyExcel = () => {
  const [tableData,] = useState<string[][]>([
    new Array(26).fill(null).map((_, index) => String.fromCharCode(65 + index)),
    new Array(26).fill(null).map((_, index) => String.fromCharCode(97 + index)),
  ])

  useEffect(() => {
    void greet('world')
  }, [])

  return (
    <div>
      {
        tableData.map((rowData, rowIndex) => (
          <TinyExcelRow key={rowIndex} rowData={rowData} />
        ))
      }
    </div>
  )
}

export default TinyExcel
