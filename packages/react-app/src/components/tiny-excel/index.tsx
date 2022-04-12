import {css} from '@emotion/react'
import {useState} from 'react'

const rowStyle = css`
  display: flex;
  flex-direction: row;
`

const cellStyle = css`
  line-height: 1.5em;
  
`

interface TinyExcelCellProps {
  value: string | number
  isHeader?: boolean
}

const TinyExcelCell = (props: TinyExcelCellProps) => {
  return <div>{props.value}</div>
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
  const [tableData, setTableData] = useState<string[][]>([['a', 'b', 'c'], ['1', '2', '3']])

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