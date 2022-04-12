import {css} from '@emotion/react'
import {useState} from 'react'
// import {greet} from 'excel-wasm'

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
  const [tableData, setTableData] = useState<string[][]>([
    new Array(26).fill(null).map((_, index) => String.fromCharCode(65 + index)),
    new Array(26).fill(null).map((_, index) => String.fromCharCode(97 + index)),
  ])

  // // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  // greet('Hello, world!')

  const rust = import('excel-wasm')
  rust
    .then(m => {
      console.warn(m)
      m.greet('World!')
    })
    .catch(console.error)

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