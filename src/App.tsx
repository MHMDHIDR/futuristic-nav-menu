import { useLayoutEffect, useRef } from 'react'

function App() {
  const menuRef = useRef<HTMLDivElement>(null)
  const hoverDevRef = useRef<HTMLDivElement>(null)
  const ListRef = useRef<HTMLLIElement[]>([])
  const randomLetters = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('')

  useLayoutEffect(() => {
    const initMenu = () => {
      const menuRefCurrent = menuRef.current!

      menuRef.current?.querySelectorAll('li').forEach(link => {
        const hoverDevElement = hoverDevRef.current

        link.addEventListener('mouseenter', () => {
          // get link width
          if (hoverDevElement) {
            const linkWidth = link.clientWidth
            // Set the hoverDevRef width
            hoverDevElement.style.opacity = '.5'
            hoverDevElement.style.width = `${linkWidth}px`
          }
        })

        menuRefCurrent.addEventListener('mouseleave', () => {
          if (hoverDevElement) {
            hoverDevElement.style.opacity = '0'
          }
        })
      })

      const animateLink = (link: HTMLLIElement) => {
        const originalText = link && link.innerText
        let randomString = originalText && originalText!.split('')
        let frame = 0

        const animate = () => {
          if (frame < 30) {
            if (frame % 3 === 0) {
              randomString = (randomString as string[]).map(
                () => randomLetters[Math.floor(Math.random() * randomLetters.length)]
              )
              link.innerText = randomString.join('')
            }
            frame++
            requestAnimationFrame(animate)
          } else {
            link.innerText = originalText
          }
        }

        const handleMouseEnter = () => {
          hoverDevRef.current!.style.transform = `translateX(${link.offsetLeft}px)`
          animate()
        }

        const handleMouseLeave = () => {
          frame = 0
          setTimeout(() => {
            frame = 0
          }, 1000)
        }

        if (link) {
          link.addEventListener('mouseenter', handleMouseEnter)
          link.addEventListener('mouseleave', handleMouseLeave)
        }

        return () => {
          link.removeEventListener('mouseenter', handleMouseEnter)
          link.removeEventListener('mouseleave', handleMouseLeave)
        }
      }

      ListRef.current!.forEach(link => {
        const cleanup = animateLink(link)
        return cleanup
      })

      // Cleanup event listeners when the component unmounts
      return () => {
        menuRefCurrent.removeEventListener('mouseenter', () => {})
        menuRefCurrent.removeEventListener('mouseleave', () => {})
      }
    }

    initMenu()
  })

  return (
    <main className='flex justify-center items-center h-screen'>
      <div className='relative' ref={menuRef}>
        <div
          className={`absolute opacity-0 h-full transition duration-500 pointer-events-none will-change-transform`}
          ref={hoverDevRef}
        >
          <div className='absolute top-0 left-0 w-1/5 h-1/5 border-t-2 border-l-2 border-gray-100'></div>
          <div className='absolute top-0 right-0 w-1/5 h-1/5 border-t-2 border-r-2 border-gray-100'></div>
          <div className='absolute bottom-0 right-0 w-1/5 h-1/5 border-b-2 border-r-2 border-gray-100'></div>
          <div className='absolute bottom-0 left-0 w-1/5 h-1/5 border-b-2 border-l-2 border-gray-100'></div>
        </div>
        <ul className='flex gap-16 justify-between text-lg text-gray-100 uppercase'>
          <li
            ref={el => ListRef.current.push(el!)}
            className='hover:cursor-pointer px-3 py-2'
          >
            <a href=''>Home</a>
          </li>
          <li
            ref={el => ListRef.current.push(el!)}
            className='hover:cursor-pointer px-3 py-2'
          >
            <a href=''>About</a>
          </li>
          <li
            ref={el => ListRef.current.push(el!)}
            className='hover:cursor-pointer px-3 py-2'
          >
            <a href=''>Projects</a>
          </li>
          <li
            ref={el => ListRef.current.push(el!)}
            className='hover:cursor-pointer px-3 py-2'
          >
            <a href=''>Blog</a>
          </li>
          <li
            ref={el => ListRef.current.push(el!)}
            className='hover:cursor-pointer px-3 py-2'
          >
            <a href=''>Contact</a>
          </li>
        </ul>
      </div>
    </main>
  )
}

export default App
