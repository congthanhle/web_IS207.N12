import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {IMG} from '../../api';

const ListOrder = ({item}) => {
  return (
    <TableContainer component={Paper} className="table" sx={{ maxHeight: 500 }}>
      <Table sx={{ minWidth: 650}} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
          <TableCell className="tableCell">Mã sản phẩm</TableCell>
            <TableCell className="tableCell">Sản phẩm</TableCell>
            <TableCell className="tableCell">Số lượng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {item && item.map((row,idx) => (
            <TableRow key={idx}>
              <TableCell className="tableCell">{row.product_id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {
                    row.product.thumbnail &&  <img src={`${IMG}/${row.product.thumbnail}`} alt="" className="image" />
                  }
                 
                  {row.product.name}
                </div>
              </TableCell>
              <TableCell className="tableCell">{ row.quantity || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListOrder;
