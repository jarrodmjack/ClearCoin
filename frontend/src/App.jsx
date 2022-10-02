import Header from "./components/Header"
import Footer from "./components/Footer"
import Table from "./components/Table"
import TripleSectionContent from "./components/TripleSectionContent"

function App() {


  return (
    <div>
      <Header />
      <div className="container mx-auto">
        <TripleSectionContent />
        <Table />
      </div>
      <Footer />
    </div>
  )
}

export default App
