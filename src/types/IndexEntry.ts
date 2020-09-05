interface Nest { type: string, key: string }
export default interface IndexEntry { type: string, key: string, nest: Nest | null }
