"use client"

import { DeviceList } from "../constants";
import { IntfDeviceDetails, IntfColumn } from "../types";
import Table from "./Table";

const DataGrid = () => {

    const deviceDetailsColumns: IntfColumn<IntfDeviceDetails>[] = [
        { header: "Name", accessor: "name" },
        { header: "Device", accessor: "device" },
        { header: "Path", accessor: "path" },
        {
            header: "Status",
            accessor: "status",
            render: (row) => (
                <>
                    {row.status === "available" && <span className="text-green-400">●</span>} <span className="capitalize">
                        {row.status}
                    </span>
                </>
            )
        }
    ];

    const handleDownload = (selectedRows: IntfDeviceDetails[]) => {
        const formattedData = selectedRows.map(item =>
            `Name: ${item.name}\nDevice: ${item.device}\nPath: ${item.path}`
        ).join("\n\n");

        alert(`Downloaded Items\n${formattedData}`);
    };

    const donwloadTableActions = (selected: IntfDeviceDetails[]) => {
        const allAvailable = selected.length && selected.every((row) => row.status === "available");
        return (
            <button
                disabled={!allAvailable}
                onClick={() => handleDownload(selected)}
                className="p-2 bg-blue-500 text-white text-xs rounded disabled:bg-gray-300"
            >
                Download Selected
            </button>
        );
    };

    return <div>
        <Table<IntfDeviceDetails> data={DeviceList} columns={deviceDetailsColumns} tableActions={donwloadTableActions} />
    </div>
}

export default DataGrid