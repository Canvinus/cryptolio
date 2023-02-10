export const Welcome = () => {
    return (
        <div className='container content is-large'>
            <h1>Welcome to Cryptolio App</h1>
            <p>You can use it to display your ERC-20 tokens. The app was created using Moralis API. Back-end is node.js, front-end is React JS.</p>
            <h2>User interface</h2>
            <p>
                <ul>
                    <li>Switch is switching between metamask and other EOA accounts</li>
                    <li>You can use the search bar to search for any EOA on the ethereum network</li>
                    <li>Visual representation of your ERC-20 tokens as the canvas</li>
                    <li>Table representation of your ERC-20 tokens</li>
                </ul>
            </p>
        </div>
    );
}