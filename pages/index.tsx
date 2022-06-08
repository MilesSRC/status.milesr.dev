import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import Styles from '../styles/Home.module.scss';
import Server from "./components/Server";
import * as Types from './types';

const Home: NextPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [headerText, setHeaderText] = useState("...");

  useEffect(() => {
    let OK = true;

    if(data.length === 0) 
      OK = false; setHeaderText("No machines are currently online");

    if(!data) {
      OK = false;
      setHeaderText("Status offline or no machines are available");
    }

    data.forEach((machine: Types.IMachine) => {
      if(machine.online != true){
        OK = false;
        setHeaderText("Some services are offline.");
      }
    })

    if(OK)
      setHeaderText("Everything is working as it should.");
  }, []);
  
  return (
    <div className={Styles.Container}>
      <Head>
        <title>milesr.dev - Status</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="https://milesr.dev/res/img/logo.png" />
      </Head>
      
      <main>
        <div className="absolute left-2 top-2">
          <a href="https://milesr.dev/">
            <div>
              <img src="https://milesr.dev/res/img/logo.png" alt="milesr.dev logo" width="50px" height="50px"/>
            </div>
          </a>
        </div>

        <div className="p-3 lg:p-6 items-start rounded-md">
          <div className="top text-left">
            <h1 className="lg:text-3xl font-bold">{ headerText }</h1>
          </div>

          <div className="servers my-10">
            { data && data.map((machine: Types.IMachine) => (
              <Server data={machine} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const resu = await fetch(process.env.API + "/api/services").catch(()=>{})
  const data: Types.IServerResponse = await resu?.json() || [];

  return {
    props: {
      data
    }
  }
}

export default Home;