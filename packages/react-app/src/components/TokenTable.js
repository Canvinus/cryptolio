export const TokenTable = ({data}) => {
    return (
        <table className='table container is-hoverable is-fullwidth'>
            <thead>
                <tr>
                  <th>#</th>
                  <th>Symbol</th>
                  <th>Logo</th>
                  <th>Balance</th>
                  <th>USD Price</th>
                  <th>Total Value</th>
                </tr>
              </thead>
              <tbody>
              {data.map((token, i) => 
                <tr key={token.symbol}>
                    <th>{i}</th>
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
                    <td>{token.balance}</td>
                    <td>{token.usdPrice}</td>
                    <td>{token.totalValue} $</td>
                </tr>)}
              </tbody>
        </table>
    );
}