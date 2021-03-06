import { useState, useRef } from "react";

import { Routes, Route } from "react-router-dom";

import Header from "./components/header/header";
import Landing from "./components/landing";
import Marketplace from "./components/marketplace";
import Profile from "./components/profile/profile";
import Dao from "./components/dao";
import Tokens from "./components/tokens/tokens";
import Vote from "./components/vote/vote";
import Abi from "./components/abi/abi";
import Purchase from "./components/purchase/purchase";

import { onConnect } from "./components/web3/index";

function App() {
    const [connected, setConnected] = useState(false);
    const [inMarketplace, setInMarketplace] = useState(false);
    const [inProfile, setInProfile] = useState(false);

    const [abiValue, setAbiValue] = useState();

    const login = async () => {
        await onConnect().then((data) => {
            console.log(data);
            setConnected(true);
        });
    };

    return (
        <div className="App">
            <Header
                login={login}
                connected={connected}
                inMarketplace={inMarketplace}
                inProfile={inProfile}
                setConnected={setConnected}
            />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route
                    path="/marketplace"
                    element={
                        <Marketplace
                            setInMarketplace={setInMarketplace}
                            setInProfile={setInProfile}
                        />
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <Profile
                            setInMarketplace={setInMarketplace}
                            setInProfile={setInProfile}
                        />
                    }
                />
                <Route path="/dao/:tokenid" element={<Dao />} />
                <Route
                    path="/tokens"
                    element={<Tokens setInProfile={setInProfile} />}
                />
                <Route path="/tokens/purchase" element={<Purchase />} />
                <Route
                    path="/vote"
                    element={
                        <Vote setInProfile={setInProfile} abiValue={abiValue} />
                    }
                />
                <Route
                    path="/vote/abi"
                    element={<Abi setAbiValue={setAbiValue} />}
                />
            </Routes>

            {window.location.pathname !== "/" && (
                <div style={{ marginTop: "10rem" }}></div>
            )}
        </div>
    );
}

export default App;
