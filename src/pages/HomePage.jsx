import Layout from '../components/layouts/Layout'
import HomeBanner from '../module/home/HomeBanner'
import HomeFeature from '../module/home/HomeFeature'

const HomePage = () => {
  return (
    <>
      <Layout>
        <HomeBanner />
        <HomeFeature />
      </Layout>
    </>
  )
}

export default HomePage
