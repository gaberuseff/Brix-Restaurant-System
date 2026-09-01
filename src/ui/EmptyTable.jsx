import {EmptyState, Table} from "@heroui/react";
import {HugeiconsIcon} from "@hugeicons/react";

function EmptyTable({message, Icon, cols = []}) {
  return (
    <Table className="min-h-[200px]">
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Empty table"
          className="h-full min-w-[600px]">
          <Table.Header>
            {cols.map((col) => (
              <Table.Column key={col.key} isRowHeader={col.isRowHeader}>
                {col.label}
              </Table.Column>
            ))}
          </Table.Header>
          <Table.Body
            renderEmptyState={() => (
              <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                <HugeiconsIcon icon={Icon} className="size-6 text-muted" />
                <span className="text-sm text-muted">{message}</span>
              </EmptyState>
            )}>
            {[]}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}

export default EmptyTable;
