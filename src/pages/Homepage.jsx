import Header from "../components/Header";
import Hero from "../components/Hero";
import RecommendedPlaces from "../components/RecommendedPlaces";
import RecommendedStays from "../components/RecommendedStays";

export default function HomePage() {
    return (
        <>
            <Header />
            <Hero   />
            <RecommendedPlaces />
            <RecommendedStays />
        </>
    );
}