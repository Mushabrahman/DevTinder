import { useState } from 'react'

function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-neutral text-neutral-content p-4 shadow-md px-12 z-0">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                
                <aside className="flex items-center gap-2 text-center sm:text-left">
                    <span className="text-4xl font-bold">#</span>
                    <p className="text-sm sm:text-base">
                        © {new Date().getFullYear()} - All rights reserved
                    </p>
                </aside>

                <nav className="flex gap-4">
                    <a href="#" aria-label="Twitter">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" viewBox="0 0 24 24"
                            className="fill-current hover:scale-110 transition-transform">
                            <path d="M23 3a10.9 10.9 0 01-3.14 
                            1.53A4.48 4.48 0 0022.4.36a9.06 
                            9.06 0 01-2.86 1.1A4.52 4.52 0 0016.5 
                            0c-2.5 0-4.5 2.1-4.5 4.67 0 .36.04.72.12 
                            1.06A12.94 12.94 0 013 1.1a4.66 4.66 0 00-.61 
                            2.35c0 1.62.8 3.05 2.02 3.89A4.41 4.41 0 012 
                            6.7v.06c0 2.27 1.58 4.17 3.67 4.6-.39.11-.8.17-1.23.17-.3 
                            0-.59-.03-.87-.08.59 1.92 2.3 3.32 4.33 
                            3.36A9.06 9.06 0 012 19.54a12.8 12.8 0 006.95 2.1c8.34 
                            0 12.9-7.29 12.9-13.62 0-.21 0-.42-.02-.63A9.4 
                            9.4 0 0023 3z"/>
                        </svg>
                    </a>

                    <a href="#" aria-label="YouTube">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" viewBox="0 0 24 24"
                            className="fill-current hover:scale-110 transition-transform">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.236 
                            0-3.897.266-4.356 2.62-4.379 
                            8.816.023 6.185.479 8.55 4.379 
                            8.816 3.605.246 11.632.246 15.236 
                            0 3.898-.266 4.356-2.62 4.379-8.816-.023-6.185-.48-8.55-4.379-8.816zM9.75 
                            15.568v-7.136l6.545 3.568-6.545 3.568z"/>
                        </svg>
                    </a>

                    <a href="#" aria-label="Facebook">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" viewBox="0 0 24 24"
                            className="fill-current hover:scale-110 transition-transform">
                            <path d="M22.675 0h-21.35C.597 
                            0 0 .597 0 1.326v21.348C0 23.403.597 
                            24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 
                            1.894-4.788 4.659-4.788 1.325 0 
                            2.464.099 2.795.143v3.24l-1.918.001c-1.504 
                            0-1.796.715-1.796 1.763v2.313h3.587l-.467 
                            3.622h-3.12V24h6.116C23.403 24 24 
                            23.403 24 22.674V1.326C24 
                            .597 23.403 0 22.675 0z"/>
                        </svg>
                    </a>
                </nav>
            </div>
        </footer>
    )
}

export default Footer;



