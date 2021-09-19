import { GetServerSideProps } from "next"
import { getSession } from 'next-auth/client';
import Body from "./components/body";
const Main = () => {
  return (
    <>
      {/* Start of the body */}
      <Body />
    </>
  )
}

export default Main

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}