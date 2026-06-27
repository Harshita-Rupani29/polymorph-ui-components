import type { Snippet } from 'svelte';

export type TableCellValue = string | number | boolean | null | Record<string, unknown> | unknown[];

export type SortDirection = 'asc' | 'desc';

export type TableProperties = OptionalTableProperties & TableEventProperties;

export type OptionalTableProperties = {
  tableTitle?: string | null;
  tableHeaders?: string[];
  tableData?: Array<TableCellValue[]>;
  sortable?: boolean;
  sortableColumns?: number[];
  stickyHeader?: boolean;
  isTableScrollable?: boolean;
  isContentScrollable?: boolean;
  testId?: string;
  caption?: string;
  sortAscIcon?: Snippet;
  sortDescIcon?: Snippet;
  sortDefaultIcon?: Snippet;
  cell?: Snippet<[TableCellValue, number, number]>;
  empty?: Snippet;
  classes?: string;
};

export type TableEventProperties = {
  onrowclick?: (rowIndex: number, rowData: TableCellValue[]) => void;
  onsort?: (columnIndex: number, direction: SortDirection) => void;
};
