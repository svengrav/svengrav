/**
 * Grid is used as a helper to align elements 
 * on the page to the specific grid.
 * @param param0 
 * @returns 
 */
const Grid = ({ columns = 10, rows = 10, visible = false  }: { columns?: number, rows?: number, visible?: boolean}) => {
  if(!visible) 
    return <></>

  return (
    <div className="h-full w-full absolute bg-red-500 grid gap-4" style={{
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
    }}>
      {
        Array.from(Array(10 * 10).keys()).map(element => {
          return <div className=" border">1</div>
        })
      }
    </div>
  )
}

export default Grid;