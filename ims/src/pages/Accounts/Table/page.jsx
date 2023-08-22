import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import data from './data/tasks.json';

export default function DataTablePage() {
  const tasks = data;

  return (
    <>
      <div className="px-4 py-6 bg-white rounded-lg shadow-md">
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
