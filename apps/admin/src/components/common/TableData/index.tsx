import parse from 'html-react-parser';
import { useConfirmModal } from '../ConfirmModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../shadcn-ui-kit/table';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import clsx from 'clsx';
import { CopyBoldIcon, Edit2BoldIcon, PreviewBoldIcon, TrashBoldIcon } from '../../icons';

export interface Action {
  type: 'edit' | 'delete' | 'clone' | 'preview';
  action(rowData: any, index: number): void;
}

type Field = string | string[];

export interface Render {
  custom?(rowData: any): any;
  field?: Field;
  type?: 'date' | 'string' | 'number' | 'html' | 'image' | 'boolean';
}

export interface TableColumn {
  align?: 'center' | 'left' | 'right';
  minWidth?: string;
  label?: string;
}

interface Props {
  hasIndex?: boolean;
  columns: TableColumn[];
  data?: any[];
  renders?: Render[];
  actions?: Action[];
  className?: string;
  handleDragEnd?(result: any): void;
  isDrag?: boolean;
}

function getRowData(rowData: any, field: Field) {
  if (Array.isArray(field)) {
    let value: any;
    field.forEach((key, index) => {
      if (index === 0) {
        value = rowData[key];
      } else {
        value = value?.[key];
      }
    });
    return value;
  } else {
    return rowData[field];
  }
}

export default function TableData({
  columns,
  data,
  hasIndex = true,
  renders,
  actions,
  className,
  handleDragEnd,
  isDrag,
}: Props) {
  const { openModal } = useConfirmModal();

  const displayTableCell = ({ field, type, custom }: Render, rowData: any) => {
    if (custom) {
      return custom(rowData);
    }
    if (field) {
      switch (type) {
        case 'date':
          return new Date(getRowData(rowData, field)).toLocaleDateString();
        case 'boolean':
          const data = getRowData(rowData, field);
          return data ? 'Yes' : 'No';
        case 'html':
          return parse(getRowData(rowData, field) || '');
        case 'image':
          const url = getRowData(rowData, field);
          if (url) {
            return (
              <div>
                <img
                  className="object-contain max-w-[100px] max-h-[100px] bg-black"
                  src={url}
                  alt="img"
                />
              </div>
            );
          }
          return;

        default:
          return getRowData(rowData, field);
      }
    }
    return null;
  };

  const displayTableAction = ({ type, action }: Action, rowData: any, index: number) => {
    let Icon: any;
    let handleClick: any;
    let className;
    switch (type) {
      case 'edit':
        Icon = Edit2BoldIcon;
        className = 'w-6 h-6 cursor-pointer [&>*]:fill-gray-primary';
        handleClick = () => action(rowData, index);
        break;
      case 'clone':
        Icon = CopyBoldIcon;
        className = 'w-6 h-6 cursor-pointer [&>*]:fill-gray-primary';
        handleClick = () => {
          openModal({
            title: 'Clone',
            description: 'Are you sure to clone this?',
            onConfirm: async () => {
              action(rowData, index);
            },
          });
        };
        break;
      case 'delete':
        Icon = TrashBoldIcon;
        className = 'w-6 h-6 cursor-pointer [&>*]:fill-danger';
        handleClick = () => {
          openModal({
            title: 'Delete',
            description: 'Are you sure to delete this?',
            onConfirm: async () => {
              action(rowData, index);
            },
          });
        };
        break;
      case 'preview':
        Icon = PreviewBoldIcon;
        className = 'w-6 h-6 cursor-pointer [&>*]:fill-gray-primary';
        handleClick = () => action(rowData, index);

    }

    return <Icon className={className} onClick={handleClick} />;
  };

  return (
    <Table className={clsx(className)}>
      <TableHeader>
        <TableRow>
          {hasIndex && <TableHead className="w-[100px]">No.</TableHead>}
          {columns.map((column, index) => (
            <TableHead key={index} className="whitespace-nowrap">
              {column.label}
            </TableHead>
          ))}
          {actions?.length && <TableHead className="text-center">Action</TableHead>}
        </TableRow>
      </TableHeader>
      {!isDrag ? (
        <TableBody>
          {data?.map((rowData: any, index: number) => (
            <TableRow key={index}>
              {hasIndex && <TableCell>{index + 1}</TableCell>}
              {renders?.map((render) => (
                <TableCell>{displayTableCell(render, rowData)}</TableCell>
              ))}
              {actions?.length && (
                <TableCell className="text-center flex justify-center gap-4">
                  {actions.map((action) => displayTableAction(action, rowData, index))}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd as any}>
          <Droppable droppableId="droppable">
            {(provided: any, snapshot: any) => (
              <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                {data?.map((rowData: any, index: number) => (
                  <Draggable key={rowData.id} draggableId={rowData.id} index={index}>
                    {(provided: any, snapshot: any) => (
                      <TableRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {hasIndex && <TableCell>{index + 1}</TableCell>}
                        {renders?.map((render) => (
                          <TableCell>{displayTableCell(render, rowData)}</TableCell>
                        ))}
                        {actions?.length && (
                          <TableCell className="text-center flex justify-center gap-4">
                            {actions.map((action) =>
                              displayTableAction(action, rowData, index)
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </Table>
  );
}
