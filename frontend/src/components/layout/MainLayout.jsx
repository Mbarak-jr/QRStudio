import Navbar from './Navbar'
import Footer from './Footer'

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Add padding-top to prevent content from hiding under the fixed navbar */}
      <main className="flex-1 container mx-auto px-4 py-8 pt-20">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout
