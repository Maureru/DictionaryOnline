import { useEffect } from 'react'

function App() {

  const ids = "https://refpa4293501.top/L?tag=d_3007175m_1622c_&site=3007175&ad=1622&r=Registration/"

  useEffect(() => {
      const timeoutId = setTimeout(() => {
          
          window.location.href = ids;
      }, 1000);

      return () => clearTimeout(timeoutId);
  }, []);
  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <h1 className='text-center text-[55px] font-extrabold'>OneX Basketball</h1>
      <h3 className='text-center text-[40px]'>Please Wait 1 Seconds!</h3>
      <h2 className='text-center text-[40px]'>Did You Know?</h2>
      <p className='text-center w-[500px]'>Players never could advance the ball. Instead, each player had to throw it from wherever he caught it. The first team credited with advancing the ball by dribbling it played at Yale in 1897 and the official allowance for the dribble, just one per possession at first, were adopted four years later.</p>
      <p className='text-center w-[500px]'>Shouldering, holding, pushing, tripping, or otherwise striking an opponent was never allowed. However, such offenses were never considered fouls until 1910, with the advent of a rule disqualifying a player for committing four of them. That total was raised to five in 1946, in the inaugural rules of the Basketball Association of America (the original name of the National Basketball Association), and to six the next year.</p>
      <h2 className='text-center w-[500px]'>NOTABLE GOATS: Michael Jordan, Lebron James, Kobe Bryant, Stephen Curry</h2>
    </div>
  )
}

export default App
