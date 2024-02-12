import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MerryCard from "../components/MatchedCard";

function MerryListPage() {
  return (
    <>
      <Navbar auth />
      <div className="bg-main h-fix">
        <header className="flex justify-evenly mb-16 ml-10">
          <div>
            <p className="text-body4 text-beige-700 mb-2 mt-20">MERRY LIST</p>
            <h2 className="text-headline2 text-purple-500">
              Let's know each other <br /> with Merry!
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <div className="flex gap-2 mr-10">
              <span className="text-body2 text-gray-700">
                Merry limit today
              </span>
              <span className="text-body2 text-red-400">2/20</span>
            </div>
            <p className="text-body5 text-gray-600 flex justify-end mr-10">
              Reset in 12h...
            </p>
          </div>
        </header>
        <MerryCard />
        <MerryCard />
      </div>
      <div className="bg-main h-40"></div>
      <Footer />
    </>
  );
}

export default MerryListPage;
