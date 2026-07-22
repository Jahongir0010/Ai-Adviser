import PolygonLayer from './PolygonLayer.jsx'
import { REGION_FILL_COLOR } from '../../constants.js'

export default function RegionsLayer({ data, selectedRegionId, interactive, onSelect, onHover }) {
  return (
    <PolygonLayer
      id="regions"
      data={data}
      idProperty="regionId"
      selectedId={selectedRegionId}
      interactive={interactive}
      fillColor={REGION_FILL_COLOR}
      lineColor={REGION_FILL_COLOR}
      onSelect={onSelect}
      onHover={onHover}
    />
  )
}
