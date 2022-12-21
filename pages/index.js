import Head from 'next/head';

import { useTheme } from 'next-themes';

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Store } from '../store';
import Sidebar from '../components/Sidebar';
import { useAnimation } from 'framer-motion';
import Definition from '../components/Definition';

export default function Home() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [word, setWord] = useState('');
  const [prompt, setPrompt] = useState('Search for a word');
  const [definition, setDefinition] = useState([]);

  const control = useAnimation();

  const showSide = () => {
    control.start('show');
  };
  const hideSide = () => {
    control.start('hide');
  };

  const { state, dispatch } = useContext(Store);

  const fetchDefinition = async (e) => {
    e.preventDefault();
    await axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => {
        if (res.data.message) {
        } else {
          setPrompt('Search for a word');
          hideSide();
          setDefinition(res.data);
        }
      })
      .catch((err) => {
        setPrompt(err.response.data.message);
        console.log(err.response.data.message);
        setDefinition([]);
      });
  };

  const fetchFavorite = async (favorite) => {
    await axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${favorite}`)
      .then((res) => {
        hideSide();
        setDefinition(res.data);
      });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }

  return (
    <div>
      <Head>
        <title>{word ? word : 'Dictionary Online'}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex mx-2 lg:mx-10 xl:mx-32 gap-4 justify-center">
        <Sidebar
          state={state}
          control={control}
          dispatch={dispatch}
          word={word}
          setWord={setWord}
          mounted={mounted}
          fetchDefinition={fetchDefinition}
          fetchFavorite={fetchFavorite}
        />
        <Definition
          state={state}
          definition={definition}
          dispatch={dispatch}
          prompt={prompt}
        />
      </main>
    </div>
  );
}
