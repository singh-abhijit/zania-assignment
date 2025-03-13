"use client"

import { useState } from "react";
import { IntfTableProps } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = <T extends Record<string, any>>({ data, columns, tableActions }: IntfTableProps<T>) => {
    const [selectedRows, setSelectedRows] = useState<T[]>([]);

    const isAllSelected = data.length > 0 && selectedRows.length === data.length;
    const isSomeSelected = selectedRows.length > 0 && !isAllSelected;

    const toggleSelectAll = () => {
        setSelectedRows(isAllSelected ? [] : [...data]);
    };

    const toggleRowSelection = (row: T) => {
        setSelectedRows((prev) =>
            prev.includes(row) ? prev.filter((selected) => selected !== row) : [...prev, row]
        );
    };

    return (
        <div className="overflow-x-auto w-full p-4">
            <div className="flex gap-4 items-center mb-2">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={isAllSelected}
                        ref={(el) => {
                            if (el) el.indeterminate = isSomeSelected;
                        }}
                        onChange={toggleSelectAll}
                        className="mx-2"
                    />
                    {selectedRows.length > 0 ? `${selectedRows.length} Selected` : "None Selected"}
                </label>
                {tableActions(selectedRows)}
            </div>
            <div className="overflow-auto w-full">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th />
                            {columns.map((col) => (
                                <th key={col.accessor} className="border border-gray-300 p-2 text-left min-w-[120px]">{col.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.name} className="hover:bg-gray-100">
                                <td className="p-2 border border-gray-300 text-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(row)}
                                        onChange={() => toggleRowSelection(row)}
                                    />
                                </td>
                                {columns.map((col) => (
                                    <td key={String(col.accessor)} className="p-2 border border-gray-300 min-w-[120px]">
                                        {col.render ? col.render(row) : row[col.accessor as keyof T]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
