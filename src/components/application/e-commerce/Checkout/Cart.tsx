'use client';

import Link from 'next/link';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// third-party
import currency from 'currency.js';

// project imports
import OrderSummary from './OrderSummary';
import Avatar from 'ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';

// types

// assets
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Products as Product } from 'types/e-commerce';
import { ArtWork } from '../../../../../package/api/Art/GetArtInfo';
import { formatNumber } from '../../../../../package/util';
import { GetCurrentUserResponse } from '../../../../../package/api/User/GetAllInfoAboutUser';
import OrderSummary2 from './OrderSummary2';
import OrderComplete from './OrderComplete';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { apiClientFetch } from '../../../../../package/api/api-fetch';
import { enqueueSnackbar } from 'notistack';
const prodImage = '/assets/images/e-commerce';

// ==============================|| CART - INCREMENT QUANTITY ||============================== //

// ==============================|| CART - MAIN ||============================== //

interface CartProps {
  product: ArtWork;
  user: GetCurrentUserResponse;
}

const Cart = ({ product, user }: CartProps) => {
  const handleClick = async () => {
    try {
      setIsLoading(true);
      const data = await apiClientFetch('purchase', 'user', { artId: product.artId });
      if (data.error) {
        throw new Error('Giao dịch thất bại');
      }
      setOpen(true);
    } catch (error) {
      enqueueSnackbar('Giao dịch thất bại', {
        variant: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle1">Item</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Avatar
                        size="md"
                        alt="product images"
                        variant="rounded"
                        src={`https://projectswd392.azurewebsites.net/api/Art/Preview?artId=${product.artId}`}
                      />
                    </Grid>
                    <Grid item>
                      <Stack spacing={0}>
                        <Typography variant="subtitle1">{product.artName}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="right">
                  <Stack>{product.price && <Typography variant="subtitle1">{formatNumber(product.price)}đ</Typography>}</Stack>
                </TableCell>

                <TableCell align="right">
                  {product.price && <Typography variant="subtitle1">{formatNumber(product.price)}đ</Typography>}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={8}></Grid>
      <Grid item xs={12}>
        <OrderSummary2 current={user.balance} order={product.price} />
      </Grid>
      <Grid item xs={12}>
        <Grid container direction={{ xs: 'column-reverse', lg: 'row' }} spacing={3} alignItems={{ xs: 'flex-start', lg: 'center' }}>
          <Grid item xs={12} md={7} lg={8}>
            <Button component={Link} href="/" variant="text" startIcon={<KeyboardBackspaceIcon />}>
              Continue Shopping
            </Button>
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <Stack spacing={gridSpacing}>
              {user.balance - product.price > 0 ? (
                <LoadingButton variant="contained" fullWidth onClick={handleClick} loading={isLoading}>
                  Check Out
                </LoadingButton>
              ) : (
                <Link href={'/user/profile?target=balance'}>
                  <Button variant="contained" fullWidth onClick={() => {}}>
                    Add Balance
                  </Button>
                </Link>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <OrderComplete open={open} setOpen={setOpen} href="/user/profile" />
    </Grid>
  );
};

export default Cart;
