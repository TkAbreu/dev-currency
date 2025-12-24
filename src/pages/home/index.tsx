import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import styles from './home.module.css';
import { BsSearch } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from "@/components/shadui/ai-loader";

export interface CoinProps {
  changePercent24Hr: string;
  explorer: string;
  id: string;
  marketCapUsd: string;
  maxSupply: string;
  name: string;
  priceUsd: string;
  rank: string;
  supply: string;
  symbol: string;
  volumeUsd24Hr: string;
  vwap24Hr: string;
  formatedPrice?: string;
  formatedMarket?: string;
  formatedSupply?: string;
  formatedVolume?: string;
}

interface DataProps {
  data: CoinProps[]
}

export function Home() {

  const [input, setInput] = useState("");
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [limit]);

  async function getData() {
    setLoading(true);

    try {
      const response = await fetch(`https://rest.coincap.io/v3/assets?limit=${limit}&offset=0`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_COINCAP_API_KEY}`
        }
      });

      const data: DataProps = await response.json();

      const price = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        })

        const priceCompact = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact"
        })

        const formatedResult = data.data.map((item) => ({
            ...item,
            formatedPrice: price.format(Number(item.priceUsd)),
            formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
            formatedSupply: priceCompact.format(Number(item.supply)),
            formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr))
          
        }));

        setCoins(formatedResult);
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
            
  }

  function handleCripto(e: FormEvent) {
    e.preventDefault();

    if (input === "") return;

    navigate(`/details/${input}`);
  }

  function handleGetMore() {
    setLimit(prev => prev + 10);
  }

  function handleLess() {
    setLimit(prev => Math.max(0, prev - 10));
  }

  if (loading) {
    return (
      <div>
        <Loader text='Loading...' />
      </div>
    )
  }


  return (
    <main className={styles.container}>

      <form className={styles.form} onSubmit={handleCripto}>
        <input
          className={styles.input}
          type="text"
          placeholder='Digite o nome da Moeda...Ex.: Bitcoin'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type='submit'><BsSearch size={30} /></button>
      </form>

      <table className={styles.tabela}>
        <thead className={styles.thead}>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor de Mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança 24h</th>
          </tr>
        </thead>

        <tbody id='tbody'>
          {coins.length > 0 && coins.map((item) => (
            <tr className={styles.tr} key={item.id}>


              <td className={styles.tdLabel} data-label="Moeda">
                <div className={styles.name}>
                  <img className={styles.logo}
                    src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}2@2x.png`}
                    onError={(e) => {
                      const img = e.currentTarget;

                      if (img.src.includes('2@2x')) {
                        // 2ª tentativa: symbol@2x
                        img.src = `https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`;
                      }
                      else if (img.src.includes(`${item.symbol.toLowerCase()}@2x`)) {
                        // 3ª tentativa: id2@2x
                        img.src = `https://assets.coincap.io/assets/icons/${item.id.toLowerCase()}2@2x.png`;
                      }
                    }}
                    alt="Logo Cripto" />
                  <Link to={`/details/${item.id}`}><span>{item.name} | {item.symbol}</span></Link>
                </div>
              </td>


              <td className={styles.tdLabel} data-label="Valor Mercado">{item.formatedMarket}</td>
              <td className={styles.tdLabel} data-label="Preço">{item.formatedPrice}</td>
              <td className={styles.tdLabel} data-label="Volume">{item.formatedVolume}</td>
              <td className={Number(item.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss} data-label="Mudança 24h">{Number(item.changePercent24Hr).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.divButtons}>
        <button className={styles.buttonMore} onClick={handleGetMore}>
          Carregar mais
        </button>

        {limit > 10 && !loading && (
          <button className={styles.buttonLess} onClick={handleLess}>
            Carregar menos
          </button>
        )}
      </div>
    </main>
  )
}