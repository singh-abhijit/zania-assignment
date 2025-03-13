import { Key } from "react";

export interface IntfColumn<T> {
  header: string;
  accessor: Key;
  render?: (row: T) => React.ReactNode;
}

export interface IntfTableProps<T> {
  data: T[];
  columns: IntfColumn<T>[];
  tableActions: (selectedRows: T[]) => React.ReactNode;
}

export interface IntfDeviceDetails {
  name: string;
  device: string;
  path: string;
  status: string;
}
