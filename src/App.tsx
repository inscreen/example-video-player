import { useEffect, useState } from 'react';
import './App.css';
import Video from './Video';

const tenantId = process.env.REACT_APP_INSCREEN_TENANT_ID!;
const apiKey = process.env.REACT_APP_INSCREEN_API_KEY!;

async function waitForInScreen() {
    return new Promise(wait);
    function wait(resolve: (v: null) => void) {
        if (window.inScreen) resolve(null);
        else {
            setTimeout(() => wait.bind(resolve), 1);
        }
    }
}

async function initializeInScreen() {
    await waitForInScreen();
    const response = await fetch('https://us.inscreen.com/api/self-service/auth', {
        method: 'POST',
        headers: {
            'inScreen-Tenant-ID': tenantId,
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tenantUserId: 'luke', tenantTeamId: 'starwars' }),
    });
    const { token } = await response.json();
    window.inScreen.initialize({
        endpoint: 'https://us.inscreen.com/graphql',
        tenantId,
        token,
    });
    window.inScreen.addClientEventsListener((e) => {
        console.log('inScreen event:', e.detail.name);
    });
}

function App() {
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        initializeInScreen().then(() => {
            setInitialized(true);
        });
    }, []);

    return <div className="App">{initialized && <Video />}</div>;
}

export default App;
