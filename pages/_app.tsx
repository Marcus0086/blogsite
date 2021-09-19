import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import ApolloCLientProvider from '@db/components/apolloClientProvider';
import createEmotionCache from 'src/createEmotionCache';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from 'next-themes';
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}


const MyApp = ({ Component, emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps } }: MyAppProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Blog.it</title>
      </Head>
      <ThemeProvider attribute="class">
        <CssBaseline />
        <Provider session={session}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </CacheProvider>)
}
export default ApolloCLientProvider()(MyApp)
