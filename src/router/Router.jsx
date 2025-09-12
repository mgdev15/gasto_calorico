import { lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "../wrapper/PageWrapper";
import { createContext, useState } from "react";

const Home = lazy(() => import('../pages/Home'));
const Gasto = lazy(() => import('../pages/Gasto'));
export const GenderContext = createContext();

export default function Router(){

    const location = useLocation();
    const [gender, setGender] = useState(null);

    return(

        <AnimatePresence mode="wait">

            <GenderContext.Provider value={{ gender, setGender }}>

                <Routes location={location} key={location.pathname}>

                    <Route path="/" 
                        element={
                            <PageWrapper>
                                <Home />
                            </PageWrapper>
                        } 
                    />

                    <Route path="/gasto-calorico" 
                        element={
                            <PageWrapper>
                                <Gasto />
                            </PageWrapper>
                        } 
                    />

                </Routes>

            </GenderContext.Provider>

        </AnimatePresence>

    );

}