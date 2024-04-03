import React from "react";
import { CommentType } from "../../app/types";
import {
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import moment from "moment";
import useTableComments, { EnhancedTableProps } from "./TableComments.logic";
import { StyledTableSorter } from "./Components";

type TableCommentsType = {
  comments?: CommentType[];
};

const TableComments: React.FC<TableCommentsType> = ({ comments }) => {
  const { headCells, order, orderBy, visibleRows, handleRequestSort } =
    useTableComments({ comments });

  function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler =
      (property: keyof any) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={"center"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                <StyledTableSorter>{headCell.label}</StyledTableSorter>
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  return (
    <>
      <Typography fontSize={20} fontWeight={700} align="center" p={1}>
        Movie Comments
      </Typography>
      <TableContainer
        sx={{ maxHeight: 300, overflow: "auto" }}
        component={Paper}
      >
        <Table size="small">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={comments?.length || 0}
          />
          <TableBody>
            {visibleRows?.map((comment) => (
              <TableRow hover key={comment?.comment}>
                <TableCell align="center" component="th" scope="row">
                  {comment?.author}
                </TableCell>
                <TableCell width={200} align="center">
                  {moment(comment.date).format("YYYY MMM DD [at] HH:mm")}
                </TableCell>
                <TableCell align="center">{comment?.comment}</TableCell>

                <TableCell align="center">
                  <Typography>{`(${comment?.rating}/5)`}</Typography>
                  <Rating
                    name="read-only"
                    value={comment?.rating as number}
                    readOnly
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableComments;
