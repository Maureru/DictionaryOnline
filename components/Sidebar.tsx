import React from 'react'
import { FaTrash } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { MdDarkMode } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { BiSun } from 'react-icons/bi';
import { BsTwitter } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import { BsGithub } from 'react-icons/bs';
import { motion } from 'framer-motion';
import Link from 'next/link';

function Sidebar({state, control, mounted, fetchDefinition, fetchFavorite, word, setWord, dispatch}) {
    const { systemTheme, theme, setTheme } = useTheme();

    const showSide = () => {
        control.start('show');
      };
      const hideSide = () => {
        control.start('hide');
      };

    const renderThemeButton = () => {
        if (!mounted) return null;
    
        const currentTheme = theme === 'system' ? systemTheme : theme;
    
        if (currentTheme === 'dark') {
          return (
            <div
              onClick={() => setTheme('light')}
              className="hover:bg-slate-700 cursor-pointer rounded flex justify-center items-center p-2"
            >
              <BiSun />
            </div>
          );
        } else {
          return (
            <div
              onClick={() => setTheme('dark')}
              className="hover:bg-slate-200 cursor-pointer rounded flex justify-center items-center p-2"
            >
              <MdDarkMode />
            </div>
          );
        }
      };

      const easing = [0.6, -0.05, 0.01, 0.99]

      const anim = {
        hide: {
            x: -700,
            transition: {
                ease: easing,
                duration: 0.5
            },
        },
        show: {
            x: 0,
            transition: {
                ease: easing,
                duration: 0.5
            },
        }
      }
  
    return (
        <>

        {/* =================> FOR MOBILE <=================== */}
        <div onClick={showSide} className='fixed block lg:hidden rounded-full cursor-pointer right-2 bottom-2 p-2 bg-gray-800 dark:bg-slate-200'>
            <FiSearch className='text-white text-2xl dark:text-black'/>
        </div>
        <motion.div variants={anim} initial="hide" animate={control} className='fixed block lg:hidden overflow-y-auto top-0 left-0 w-[100%] h-screen bg-gray-100 dark:bg-gray-800'>
            <div className="flex items-center justify-between px-4 pt-2">
              {renderThemeButton()}
              <AiOutlineClose onClick={hideSide} className='text-2xl cursor-pointer'/>
            </div>
            <div className="mt-2 px-2">
              <form onSubmit={fetchDefinition} className="">
                <input
                  value={word}
                  onChange={(e) => {
                    setWord(e.target.value);
                  }}
                  type="text"
                  className="outline-none bg-white rounded-sm w-[100%] p-2 text-black"
                  placeholder="Search word"
                />
              </form>
              {state.favorites.length > 0 ? (
                <>
                  <p className="mt-2 font-semibold">Favourites</p>
                  {state.favorites.map((favorite, i) => (
                    <div key={i}>
                      <div className="flex flex-col gap-2">
                        <div
                          onClick={async () => {
                            fetchFavorite(favorite);
                          }}
                          className="group relative cursor-pointer p-2 hover:bg-slate-300 dark:hover:bg-gray-900 rounded-md"
                        >
                          {favorite}
                          <div className="absolute hidden group-hover:block top-[50%] translate-y-[-50%] cursor-pointer hover:text-red-700 right-2">
                            <FaTrash
                              onClick={() => {
                                dispatch({
                                  type: 'REMOVE',
                                  payload: { word: favorite },
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex items-center justify-center p-4">
                  <p>You have no favorite : (</p>
                </div>
              )}
              <div className='absolute bottom-2 left-[50%] translate-x-[-50%]'>
                <div className='flex gap-3 justify-center'>
                    <Link href="https://twitter.com/mauuxxix">
                        <BsTwitter className='text-2xl'/>
                    </Link>
                    <Link href="https://github.com/xMauu">
                        <BsGithub className='text-2xl'/>
                    </Link>
                    <Link href="https://www.instagram.com/mauxxix_/">
                        <BsInstagram className='text-2xl'/>
                    </Link>
                </div>
                <p className='text-center mt-2'>All Rights Reserve • xMau 2022</p>
              </div>
            </div>
        </motion.div>

        {/* ================== FOR LARGE SCREEN ================= */}
        <div className=" hidden lg:block h-screen sticky top-0 w-[20rem]">
          <div
            style={{
              boxShadow: '0px 0px 11px 10px rgba(0,0,0,0.1)',
            }}
            className="bg-white mt-8 py-2 px-2 relative dark:bg-gray-800 h-auto w-[95%] rounded-lg"
          >
            <div className="flex justify-end pr-2 pt-2">
              {renderThemeButton()}
            </div>
            <div className="mt-2">
              <form onSubmit={fetchDefinition} className="">
                <input
                  value={word}
                  onChange={(e) => {
                    setWord(e.target.value);
                  }}
                  type="text"
                  className="outline-none bg-slate-200 rounded-sm w-[100%] p-2 text-black"
                  placeholder="Search word"
                />
              </form>
              {state.favorites.length > 0 ? (
                <>
                  <p className="mt-2 font-semibold">Favourites</p>
                  {state.favorites.map((favorite, i) => (
                    <div key={i}>
                      <div className="flex flex-col gap-2">
                        <div
                          onClick={async () => {
                            fetchFavorite(favorite);
                          }}
                          className="group relative cursor-pointer p-2 hover:bg-slate-300 dark:hover:bg-gray-900 rounded-md"
                        >
                          {favorite}
                          <div className="absolute hidden group-hover:block top-[50%] translate-y-[-50%] cursor-pointer hover:text-red-700 right-2">
                            <FaTrash
                              onClick={() => {
                                dispatch({
                                  type: 'REMOVE',
                                  payload: { word: favorite },
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex items-center justify-center p-4">
                  <p>You have no favorite : (</p>
                </div>
              )}
              <div className='flex gap-3 justify-center'>
                <Link href="https://twitter.com/mauuxxix">
                    <BsTwitter className='text-2xl'/>
                </Link>
                <Link href="https://github.com/xMauu">
                    <BsGithub className='text-2xl'/>
                </Link>
                <Link href="https://www.instagram.com/mauxxix_/">
                    <BsInstagram className='text-2xl'/>
                </Link>
              </div>
              <p className='text-center mt-2'>All Rights Reserve • xMau 2022</p>
            </div>
          </div>
    </div>
        </>
  )
}

export default Sidebar