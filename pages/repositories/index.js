import Head from "next/head";
import { useEffect, useState } from "react";
import { Input,  Table, Button  } from "antd";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

const { Search } = Input;

export default function Home() {
  const [searchParam, setSearchParam] = useState("");
  const [repos, setRepos] = useState([]);
  const router= useRouter();

  useEffect(() => {
    const headers = new Headers();
    headers.append("Accept", "application/vnd.github+json");
    headers.append("Authorization", process.env.NEXT_PUBLIC_TOKEN_GITHUB);

    fetch(`https://api.github.com/search/repositories?q=${searchParam}`, {
      headers,
    })
      .then((response) => response.json())
      .then((result) => setRepos(result.items))
      .catch((error) => console.log("error", error));
  }, [searchParam]);

  const onSearch = (value) => {
    setSearchParam(value);
  };

  const columnsRepo = [
    {
      title: 'Clone',
      dataIndex: 'clone_url',
      key: 'clone_url',
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
    },
  ];
  return (
    <div>
      <Head>
        <title>GitHub App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Search for Repo &rarr;</h2>
          </div>

          <div className={styles.card}>
            <Search placeholder="search repo" onSearch={onSearch} enterButton />
          </div>
        </div>
        <div>
          <Table columns={columnsRepo} dataSource={repos} />
        </div>
        <div>
          <Button onClick={() => router.back()} type="primary">
            Go Back
          </Button>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          By {"Mar"}
        </a>
      </footer>
    </div>
  );
}
