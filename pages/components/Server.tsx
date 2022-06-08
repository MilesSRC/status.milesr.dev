import { IMachine } from "../types";
import Services from "./Services";

export default function Server({ data }: { data: IMachine }) {
    return (
        <div className={"server bg-slate-800 px-3 rounded-md p-2 my-10" + (!data.online ? ' offline' : data.services.find(service => service.online === false) ? ' troubles' : '')}>
            <div className="top text-left flex align-middle">
                <div className={(data.online ? data.services.find(service => service.online === false) ? 'bg-orange-300' : 'bg-green-400' : 'bg-red-600') + " rounded-full inline-block w-3 h-3"}></div>
                <h1 className="mx-2 first-letter:capitalize font-bold">{ data.name } (<a className="text-slate-400" href={data.url}>{new URL(data.url).hostname}</a>)</h1>
            </div>

            <div className="stats">
                { data.services.length === 0 ? "Not hosting any services" : (<>Services: { data.services.filter(service => service.online).length } online / { data.services.filter(service => service.online === false).length } offline</>) } <br />
                RAM: { (data.capabilities.ram / 1000 / 1000 / 1000).toFixed() }GB
                <Services machine={data} data={data.services} />
            </div>
        </div>
    )
}