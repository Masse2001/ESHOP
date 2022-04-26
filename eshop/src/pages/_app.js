import '../styles/global.css'
import MainLayout from '../layout/Mainlayout';

function MyApp({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}

export default MyApp