import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { CoinProps } from '../home';
import styles from './details.module.css';
import { Loader } from "@/components/shadui/ai-loader";


interface ResponseData {
    data: CoinProps;
}

export function Details() {

    const [coin, setCoin] = useState<CoinProps>();
    const { cripto } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        async function listaCripto() {
            try {
                const response = await fetch(`https://rest.coincap.io/v3/assets/${cripto}`, {
                    headers: {
                        accept: "application/json",
                        Authorization: "Bearer 8897f3625844d80211d99b5d915bd931263624255c375088b6d36e4030d618d0"
                    }
                });

                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`)
                }

                const price = Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD"
                });

                const priceCompact = Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    notation: "compact"
                });

                const result: ResponseData = await response.json();
                const objetoCoin = {
                    ...result.data,
                    formatedPrice: price.format(Number(result.data.priceUsd)),
                    formatedMarket: priceCompact.format(Number(result.data.marketCapUsd)),
                    formatedVolume: priceCompact.format(Number(result.data.volumeUsd24Hr)),
                    formatedSupply: priceCompact.format(Number(result.data.supply))
                }

                setCoin(objetoCoin)

            } catch (err) {
                console.log(err);
                navigate('/');
            }
        }

        listaCripto();

    }, [cripto, navigate]);

    if (!coin) {
        return (
            <Loader text='Loading'/>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.moeda}>
                <img className={styles.logo}
                    src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}2@2x.png`}
                    onError={(e) => {
                      const img = e.currentTarget;

                      if (img.src.includes('2@2x')) {
                        // 2ª tentativa: symbol@2x
                        img.src = `https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`;
                      }
                      else if (img.src.includes(`${coin.symbol.toLowerCase()}@2x`)) {
                        // 3ª tentativa: id2@2x
                        img.src = `https://assets.coincap.io/assets/icons/${coin.id.toLowerCase()}2@2x.png`;
                      }
                    }} alt={coin.name} />
                <h1>{coin.name} | {coin.symbol}</h1>
            </div>

            <div className={styles.div1}>
                <h2>Valor de Mercado</h2>
                <h3>{coin?.formatedMarket}</h3>
            </div>

            <div className={styles.div1}> 
                <h2>Preço</h2>
                <h3>{coin?.formatedPrice}</h3>
            </div>

            <div className={styles.div1}>
                <h2>Volume</h2>
                <h3>{coin?.formatedVolume}</h3>
            </div>

            <div className={styles.div1}>
                <h2>Mudança 24h</h2>
                <h3 className={Number(coin.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss}>{Number(coin?.changePercent24Hr).toFixed(2)}</h3>
            </div>

        </div>
    )
}