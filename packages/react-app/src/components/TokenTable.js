export const TokenTable = ({data}) => {
    return (
        <table className='table container is-bordered is-narrow is-hoverable'>
            <thead>
                <tr>
                  <th>#</th>
                  <th>Symbol</th>
                  <th>Logo</th>
                  <th>Balance</th>
                  <th>USD Price</th>
                  <th>Total Value</th>
                  <th>%</th>
                </tr>
              </thead>
              <tbody>
              {data.tokens.map((token, i) => 
                <tr key={token.symbol}>
                    <th>{i + 1}</th>
                    <td><a 
                        className='has-text-link-dark'
                        href={`https://etherscan.io/address/${token.address}`}
                        target='_blank' 
                        rel='noreferrer'>{token.symbol}</a></td>
                    <td>
                        <figure className='image is-32x32'>
                            <img className='is-rounded' src={token.logo} alt='token logo' />
                        </figure>
                    </td>
                    <td>{token.balance.toLocaleString()}</td>
                    <td>{token.usdPrice}</td>
                    <td>{token.totalValue.toLocaleString()} $</td>
                    <td>{(token.pct * 100).toLocaleString()}</td>
                </tr>)}
              </tbody>
        </table>
    );
}