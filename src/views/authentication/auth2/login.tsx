'use client';
import Link from 'next/link';
import Image from 'next/image';

// material-ui
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import AuthLogin from 'components/authentication/auth-forms/AuthLogin';
import AuthFooter from 'ui-component/cards/AuthFooter';
import AuthWrapper2 from 'components/authentication/AuthWrapper2';
import AuthCardWrapper from 'components/authentication/AuthCardWrapper';
import Logo from 'ui-component/Logo';
import BackgroundPattern2 from 'ui-component/cards/BackgroundPattern2';
import AuthSlider from 'ui-component/cards/AuthSlider';

// types
import { AuthSliderProps } from 'types';

// assets
const imgMain = '/assets/images/auth/img-a2-login.svg';

// carousel items
const items: AuthSliderProps[] = [
  {
    title: 'Components Based Design System',
    description: 'Powerful and easy to use multipurpose theme'
  },
  {
    title: 'Ready to use components',
    description: 'Ready made component to apply directly'
  },
  {
    title: 'Multiple dashboard and widgets',
    description: '100+ widgets and customize controls'
  }
];

// ================================|| AUTH2 - LOGIN ||================================ //

const Login = () => {
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  return (
    <AuthWrapper2>
      <Grid container justifyContent={{ xs: 'center', md: 'space-between' }} alignItems="center">
        <Grid item md={6} lg={7} xs={12} sx={{ minHeight: '100vh' }}>
          <Grid
            sx={{ minHeight: '100vh' }}
            container
            alignItems={{ xs: 'center', md: 'flex-start' }}
            justifyContent={{ xs: 'center', md: 'space-between' }}
          >
            <Grid item sx={{ display: { xs: 'none', md: 'block' }, m: 3 }}>
              <Link href="#" aria-label="theme logo">
                <Logo />
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              container
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: { xs: 'calc(100vh - 68px)', md: 'calc(100vh - 152px)' } }}
            >
              <Stack justifyContent="center" alignItems="center" spacing={5} m={2}>
                <Box component={Link} href="#" sx={{ display: { xs: 'block', md: 'none' } }}>
                  <Logo />
                </Box>
                <AuthCardWrapper border={downLG}>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <Stack alignItems="center" justifyContent="center" spacing={1}>
                        <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                          Hi, Welcome Back
                        </Typography>
                        <Typography variant="caption" fontSize="16px" textAlign={downMD ? 'center' : 'inherit'}>
                          Enter your credentials to continue
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <AuthLogin loginProp={2} />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item container direction="column" alignItems="center" xs={12}>
                        <Typography
                          component={Link}
                          href="/pages/authentication/auth2/register"
                          variant="subtitle1"
                          sx={{ textDecoration: 'none' }}
                        >
                          Don&apos;t have an account?
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Stack>
            </Grid>
            <Grid item xs={12} sx={{ m: 3 }}>
              <AuthFooter />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} lg={5} sx={{ position: 'relative', alignSelf: 'stretch', display: { xs: 'none', md: 'block' } }}>
          <BackgroundPattern2>
            <Grid item container justifyContent="center">
              <Grid item xs={12}>
                <Grid item container justifyContent="center" sx={{ pb: 8 }}>
                  <Grid item xs={10} lg={8} sx={{ '& .slick-list': { pb: 2 } }}>
                    <AuthSlider items={items} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ position: 'relative' }}>
                <div style={{ maxWidth: '100%', margin: '0 auto', display: 'block', position: 'relative', zIndex: 5, textAlign: 'center' }}>
                  <Image alt="Auth method" src={imgMain} width={300} height={300} style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
              </Grid>
            </Grid>
          </BackgroundPattern2>
        </Grid>
      </Grid>
    </AuthWrapper2>
  );
};

export default Login;
