import PolygonLayer from './PolygonLayer.jsx'
import { DISTRICT_FILL_COLOR } from '../../constants.js'

export default function DistrictsLayer({ data, selectedDistrictId, interactive, onSelect, onHover }) {
  return (
    <PolygonLayer
      id="districts"
      data={data}
      idProperty="districtId"
      selectedId={selectedDistrictId}
      interactive={interactive}
      fillColor={DISTRICT_FILL_COLOR}
      lineColor={DISTRICT_FILL_COLOR}
      onSelect={onSelect}
      onHover={onHover}
    />
  )
}
