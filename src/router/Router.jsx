import { lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "../wrapper/PageWrapper";

const Home = lazy(() => import('../pages/Home'));
const Gasto = lazy(() => import('../pages/Gasto'));

export default function Router(){

    const location = useLocation();

    return(

        <AnimatePresence mode="wait">

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

        </AnimatePresence>

    );

}