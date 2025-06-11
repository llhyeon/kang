import {
  AllCommunityModule,
  ModuleRegistry,
  themeAlpine,
  type ColDef,
  type ColumnResizedEvent,
  type ICellRendererParams,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Session } from '../utils/Storage';
import LucideIcon from './LucideIcon';

ModuleRegistry.registerModules([AllCommunityModule]);

const _storageKey = 'ag-grid';

export default function AGGrid() {
  const { data, isPending, error } = useFetch(
    'https://www.ag-grid.com/example-assets/space-mission-data.json',
  );

  const _loadedData = Session.load(_storageKey);
  const colWidth = _loadedData['columnWidth'] || {};

  const [colDef, setColDef] = useState<ColDef[]>([
    {
      headerName: '회사명',
      field: 'company',
      width: colWidth['company'] || 200,
    },
    {
      headerName: '지역',
      field: 'location',
      width: colWidth['location'] || 200,
    },
    {
      field: 'price',
      width: colWidth['price'] || 200,
      valueFormatter: (p) => `${(p.value / 100).toLocaleString()} 원`,
    },
    {
      field: 'rocket',
      width: colWidth['rocket'] || 200,
    },
    {
      field: 'date',
      width: colWidth['date'] || 200,
      valueFormatter: (p) =>
        new Date(p.value).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
    },
    {
      field: 'mission',
      width: _loadedData['mission_columnWidth'] || 200,
    },
    {
      field: 'successful',
      width: _loadedData['successfull_columnWidth'] || 200,
      cellRenderer: (p: ICellRendererParams) => (
        <div className='h-full flex items-center'>
          {p.value ? <LucideIcon name='Check' /> : <LucideIcon name='X' />}
        </div>
      ),
    },
  ]);

  const defaultColDef = {
    filter: true,
    minWidth: 150,
    editable: true,
  };

  // 컬럼 넓이 변경 시 이벤트
  const onColumnResized = (e: ColumnResizedEvent) => {
    const columnWidth = e.column?.getActualWidth();
    const id = e.column?.getColId() as string;

    if (e.finished) {
      Session.save(_storageKey, `columnWidth`, {
        ..._loadedData['columnWidth'],
        [id]: columnWidth,
      });
    }
  };

  if (isPending) <h1>...로딩 중</h1>;

  if (error) {
    console.error('데이터 패칭 실패 :', error.message);
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div style={{ height: '500px' }}>
        <AgGridReact
          onColumnResized={onColumnResized}
          pagination
          paginationPageSize={20}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          theme={themeAlpine}
          columnDefs={colDef}
          rowData={data}
          defaultColDef={defaultColDef}
        />
      </div>
    </>
  );
}
