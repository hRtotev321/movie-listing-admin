import { useMemo, useState } from "react";
import { CommentType } from "../../app/types";

type Order = "asc" | "desc";

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

type Props = {
  comments: CommentType[] | undefined;
};
const useTableComments = ({ comments }: Props) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof CommentType>("author");

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof CommentType
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  function stableSort<T>(
    array: T[] | undefined,
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array?.map(
      (el, index) => [el, index] as [T, number]
    );
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
  }

  const visibleRows = useMemo(
    () => stableSort(comments as any, getComparator(order, orderBy)),
    [order, orderBy]
  );
  const headCells: readonly HeadCell[] = [
    {
      id: "author",
      numeric: false,
      disablePadding: true,
      label: "Author",
    },
    {
      id: "date",
      numeric: false,
      disablePadding: true,
      label: "Date",
    },
    {
      id: "comment",
      numeric: false,
      disablePadding: true,
      label: "Comment",
    },
    {
      id: "rating",
      numeric: false,
      disablePadding: true,
      label: "Rating",
    },
  ];

  return {
    order,
    orderBy,
    headCells,
    visibleRows,
    setOrder,
    setOrderBy,
    getComparator,
    handleRequestSort,
  };
};

export default useTableComments;
