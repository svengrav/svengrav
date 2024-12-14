import { useState } from 'react'
import { Logo } from '../assets/icons'
import Scalable from '@components/base/Scalable'

interface LayerPath {
  dimension: string
  fill: string
}

interface ThreeLayerData {
  id: number
  stroke: LayerPath
  area: LayerPath
}

const Layers = [
  {
    id: 0,
    area: {
      dimension: 'M15 15h770v1070H15z',
      fill: '#1e3f9b'
    },
    stroke: {
      dimension: 'M770 30v1040H30V30h740m30-30H0v1100h800V0Z',
      fill: '#355da7'
    }
  },
  {
    id: 1,
    area: {
      dimension: 'M21.42 1085 410.51 15H785v1070H21.42z',
      fill: '#229373'
    },
    stroke: {
      dimension: 'M770 30v1040H42.83L421.01 30H770m30-30H400L0 1100h800V0Z',
      fill: '#3aad6b'
    }
  },
  {
    id: 2,
    area: {
      dimension: 'M24.55 12.5h366.69l366.7 1008.42L24.55 12.5z',
      fill: '#13649b'
    },
    stroke: {
      dimension: 'm382.49 25 333.4 916.84L49.09 25h333.4M400 0H0l800 1100L400 0Z',
      fill: '#48bbc7'
    }
  },
  {
    id: 3,
    area: {
      dimension: 'M17.85 1087.5 387.5 70.95V1087.5H17.85z',
      fill: '#bf436a'
    },
    stroke: {
      dimension: 'M375 141.9V1075H35.69L375 141.9M400 0 0 1100h400V0Z',
      fill: '#bd1622'
    }
  },
  {
    id: 4,
    area: {
      dimension: 'M414.28 10H790v1033.24L414.28 10z',
      fill: '#eda515'
    },
    stroke: {
      dimension: 'M780 20v966.48L428.55 20H780m20-20H400l400 1100V0Z',
      fill: '#c4d341'
    }
  },
  {
    id: 5,
    area: {
      dimension: 'M269.27 1087.5 147.22 741.08 387.5 573.92v513.58H269.27z',
      fill: '#e9e9ea'
    },
    stroke: {
      dimension: 'M375 597.85V1075h-96.88L162.18 745.9 375 597.85M400 550 132.27 736.25 260.42 1100H400V550Z',
      fill: '#c6c6c5'
    }
  }
]

interface ThreeLayerProps {
  index: number
}

const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16)

export const ThreeLayer = ({ index }: ThreeLayerProps) => {
  const [state, setState] = useState<ThreeLayerData[]>(Layers.filter(layer => layer.id <= index))

  const onHover = (layerIndex: number) => {
    const tmpState = state.map(x => {
      return x.id === layerIndex
        ? {
            ...x,
            area: {
              ...x.area,
              fill: getRandomColor()
            }
          }
        : x
    })

    setState(tmpState)
  }

  return (
    <>
      <Scalable width={800} height={1100}>
        <div className='absolute flex justify-center items-center' style={{ left: '32%', top: '32%' }}>
          <Logo className=' fill-white h-96 ' />
        </div>
        <svg viewBox='0 0 800 1100'>
          {
        state?.map((layer, i) => (
          <g key={i}>
            <path d={layer.area.dimension} style={{ fill: layer.area.fill }} onMouseOver={() => onHover(i)} />
            <path d={layer.stroke.dimension} style={{ fill: layer.stroke.fill }} />
          </g>
        ))
      }
        </svg>
      </Scalable>
    </>
  )
}
