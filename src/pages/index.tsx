import Head from "next/head";
// import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Button, Box, Text, Input, Flex } from "@mantine/core";
// import { Avatar, Text, Button, Paper } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useState, useRef } from "react";
import { Autocomplete, Loader } from "@mantine/core";
import Store from "../store/usersStore";
import TodoStore from "../store/todo";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const handleChange = (val: string) => {
    // window.clearTimeout(timeoutRef.current);
    setValue(val);
    setData([]);

    if (val.trim().length === 0 || val.includes("@")) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData([""].map((provider) => `${val}${provider}`));
      }, 1000);
    }
  };

  const ADDList = () => {
    if(value.length){
    Store.setTitleValue(value);
    setValue("");
    }
  };
  const Remove = (val: string) => {
    Store.Remove(val);
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p>TODO List</p>
          {/* <Button>Settings</Button> */}
        </div>
        <Box style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {/* <Input
              onChange={(e) => {
                handleChange(e.target.value);
              }}
              placeholder="Your email"
            /> */}
            <Autocomplete
              value={value}
              data={data}
              onChange={handleChange}
              rightSection={loading ? <Loader size="1rem" /> : null}
              placeholder="Add List"
            />
            <Button onClick={() => ADDList()}>Add</Button>
          </div>
          <div
            style={{
              display: "Flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            {Store.TODO.map((item, id) => {
              return (
                <div
                  key={id}
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "flex-start",
                    textAlign: "center",
                  }}
                >
                  <Text style={{ fontSize: "20px" }} c="teal.4">
                    {item}
                  </Text>
                  <Button
                    color="red"
                    onClick={() => {
                      Remove(item);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
          </div>
        </Box>
      </main>
    </>
  );
}

export default observer(Home);
