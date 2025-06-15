import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import ActionMenu from "./action-menu";
import { User } from "../types/user";
import { formatRupiah } from "../utils/formatter";

export default function UserTable({ users, onSuccessAction }: { users: User[], onSuccessAction?: () => void }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nama</TableCell>
          <TableCell>Bank</TableCell>
          <TableCell>Saldo</TableCell>
          <TableCell>Aksi</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar
                  src={`/${user.bankImg}.png`}
                  sx={{ width: 24, height: 24 }}
                />
                <Typography>{user.bank}</Typography>
              </Box>
            </TableCell>
            <TableCell>{formatRupiah(user?.balance)}</TableCell>
            <TableCell>
              <ActionMenu user={user} onSuccessAction={onSuccessAction}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
