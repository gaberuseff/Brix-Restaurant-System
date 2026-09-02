import {Skeleton, Table} from "@heroui/react";

function TableSkeleton({rowsCount = 5, colsCount = 6, cols = []}) {
  const actualColsCount = cols.length > 0 ? cols.length : colsCount;

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Loading table..." className="min-w-[600px]">
          <Table.Header>
            {cols.length > 0
              ? cols.map((col) => (
                  <Table.Column
                    key={col.key || col.label}
                    isRowHeader={col.isRowHeader}>
                    {col.label}
                  </Table.Column>
                ))
              : Array.from({length: colsCount}).map((_, i) => (
                  <Table.Column key={i}>
                    <Skeleton className="h-4 w-20 rounded-md" />
                  </Table.Column>
                ))}
          </Table.Header>
          <Table.Body>
            {Array.from({length: rowsCount}).map((_, rowIndex) => (
              <Table.Row key={rowIndex}>
                {Array.from({length: actualColsCount}).map((_, colIndex) => (
                  <Table.Cell key={colIndex}>
                    <Skeleton className="h-5 w-full max-w-[120px] rounded-md" />
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}

export default TableSkeleton;
