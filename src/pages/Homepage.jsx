import { useEffect, useState } from 'react';
import Header from "../components/Header";
import Hero from "../components/Hero";
import RecommendedPlaces from "../components/RecommendedPlaces";
import RecommendedStays from "../components/RecommendedStays";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";

export default function HomePage() {
    const [showAuth, setShowAuth] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('travelmate_user');
        const skipped = localStorage.getItem('travelmate_skipped');
        const logged = localStorage.getItem('travelmate_logged_in') === 'true';

        // Show modal only when there's no user and not skipped
        if (!user && !skipped && !logged) {
            setShowAuth(true);
        }
    }, []);

    const handleCloseAuth = () => setShowAuth(false);
    const handleSkip = () => {
        setShowAuth(false);
        window.dispatchEvent(new CustomEvent('travelmate:auth-changed', { detail: { user: null, action: 'skip' } }));
    };
    const handleLogin = (user) => {
        setShowAuth(false);
        // notify other components about login
        window.dispatchEvent(new CustomEvent('travelmate:auth-changed', { detail: { user, action: 'login' } }));
    };
    const handleRegister = (user) => {
        setShowAuth(false);
        window.dispatchEvent(new CustomEvent('travelmate:auth-changed', { detail: { user, action: 'register' } }));
    };

    return (
        <>
            <Header />
            <Hero />
            <RecommendedPlaces />
            <RecommendedStays />
            <Footer />

            <AuthModal
                show={showAuth}
                onClose={handleCloseAuth}
                onLogin={handleLogin}
                onRegister={handleRegister}
                onSkip={handleSkip}
            />
        </>
    );
}