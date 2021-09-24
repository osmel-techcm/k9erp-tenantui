import { Comparison } from "./comparison"

export class FiltersReport {
    name?: string
    listComparisonData?: Comparison[]
    inputType?: string
    dataSourceField?: string
    dataSourceName?: string
    dataSource?: any[]
    valueComparison?: number
    primaryValue?: string
    secondaryValue?: string
    primaryValueId?: number
  }